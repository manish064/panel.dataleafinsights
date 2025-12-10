import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Eye, Edit, Trash2, Copy, Play, Pause, BarChart3, Users, Calendar, Filter } from 'lucide-react';

import { PageLoading, SectionLoading, ErrorState, LoadingButton } from '../components/StandardizedLoading';
import { ErrorHandler, SuccessHandler, createAsyncHandler } from '../utils/errorHandler';
import {
  getSurveys,
  createSurvey as apiCreateSurvey,
  activateSurvey,
  pauseSurvey,
  completeSurvey,
  duplicateSurvey,
  deleteSurvey as apiDeleteSurvey,
  getSurveyById
} from '../services/api';

const SurveyManagement = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(null);

  const surveysPerPage = 10;

  useEffect(() => {
    fetchSurveys();
  }, [currentPage, searchTerm, filterStatus]);

  const mapStatus = (isActive, isPublished) => {
    if (isActive && isPublished) return 'active';
    if (!isPublished && isActive) return 'draft';
    if (!isActive && isPublished) return 'paused';
    return 'completed';
  };

  const mapSurveyFromApi = (s) => ({
    id: s.id,
    title: s.title,
    description: s.description || '',
    status: mapStatus(Boolean(s.isActive), Boolean(s.isPublished)),
    createdDate: s.createdAt,
    responses: s.responseCount || 0,
    targetResponses: s.maxResponses || 0,
    reward: s.pointsReward || 0,
    category: s.category || 'General',
    duration: s.estimatedDuration ? `${s.estimatedDuration} minutes` : 'N/A',
    // questions count will be loaded in detail view
  });

  const fetchSurveys = createAsyncHandler(
    async () => {
      const serverStatus = filterStatus === 'active' ? 'active' : filterStatus === 'draft' ? 'draft' : '';
      const params = {
        page: currentPage,
        limit: surveysPerPage,
        search: searchTerm,
        ...(serverStatus && { status: serverStatus })
      };
      const result = await getSurveys(params);
      const list = (result?.data?.surveys || []).map(mapSurveyFromApi);
      setSurveys(list);
      setTotalPages(result?.data?.pagination?.totalPages || 1);
    },
    {
      loadingState: setLoading,
      errorContext: 'fetching surveys',
      showErrorToast: true
    }
  );

  const handleViewDetails = async (surveyId) => {
    try {
      setLoading(true);
      const result = await getSurveyById(surveyId);
      const s = result?.data?.survey;
      if (!s) throw new Error('Survey not found');
      const mapped = {
        id: s.id,
        title: s.title,
        description: s.description || '',
        status: mapStatus(Boolean(s.isActive), Boolean(s.isPublished)),
        createdDate: s.createdAt,
        responses: Array.isArray(s.SurveyResponses) ? s.SurveyResponses.length : 0,
        targetResponses: s.maxResponses || 0,
        reward: s.pointsReward || 0,
        category: s.category || 'General',
        duration: s.estimatedDuration ? `${s.estimatedDuration} minutes` : 'N/A',
        questions: Array.isArray(s.questions) ? s.questions.length : 0,
      };
      setSelectedSurvey(mapped);
      setShowSurveyModal(true);
    } catch (err) {
      console.error('Error loading survey details:', err);
      ErrorHandler.show(err.message || 'Failed to load survey details');
    } finally {
      setLoading(false);
    }
  };

  const handleSurveyAction = createAsyncHandler(
    async (action, surveyId) => {
      switch (action) {
        case 'activate':
          await activateSurvey(surveyId);
          SuccessHandler.show('Survey activated successfully');
          break;
        case 'pause':
          await pauseSurvey(surveyId);
          SuccessHandler.show('Survey paused successfully');
          break;
        case 'complete':
          await completeSurvey(surveyId);
          SuccessHandler.show('Survey completed successfully');
          break;
        case 'duplicate':
          await duplicateSurvey(surveyId);
          SuccessHandler.show('Survey duplicated successfully');
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this survey?')) {
            await apiDeleteSurvey(surveyId);
            SuccessHandler.show('Survey deleted successfully');
          }
          break;
        default:
          break;
      }
      await fetchSurveys();
      setActionDropdown(null);
    },
    {
      errorContext: 'updating survey',
      showErrorToast: true
    }
  );

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      paused: 'bg-orange-100 text-orange-800',
      completed: 'bg-blue-100 text-blue-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses[status] || 'bg-gray-100 text-gray-800'
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getProgressBar = (responses, target) => {
    const percentage = target > 0 ? Math.min((responses / target) * 100, 100) : 0;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  const SurveyModal = ({ survey, onClose }) => {
    if (!survey) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative top-4 sm:top-20 mx-auto p-4 sm:p-6 border border-gray-200 w-full max-w-2xl shadow-lg rounded-lg bg-white admin-modal">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-3 gap-4">
              <h3 className="text-base font-medium text-gray-900 min-w-0 truncate">Survey Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1 text-lg"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="admin-spacing-xs">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Title</label>
                  <p className="text-xs text-gray-900 break-words">{survey.title}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Description</label>
                  <p className="text-xs text-gray-900 break-words">{survey.description}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Category</label>
                  <p className="text-xs text-gray-900">{survey.category}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Status</label>
                  {getStatusBadge(survey.status)}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Duration</label>
                  <p className="text-xs text-gray-900">{survey.duration}</p>
                </div>
              </div>
              
              <div className="admin-spacing-xs">
                <div>
                  <label className="block text-xs font-medium text-gray-700">Questions</label>
                  <p className="text-xs text-gray-900">{survey.questions ?? 0} questions</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Reward</label>
                  <p className="text-xs text-gray-900">${survey.reward}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Created Date</label>
                  <p className="text-xs text-gray-900">{new Date(survey.createdDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">Progress</label>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{survey.responses} responses</span>
                      <span>{survey.targetResponses} target</span>
                    </div>
                    {getProgressBar(survey.responses, survey.targetResponses)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-2 mt-4">
              <button
                onClick={() => {
                  // Navigate to survey analytics
                  onClose();
                }}
                className="px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-xs w-full sm:w-auto"
              >
                View Analytics
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-xs w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CreateSurveyModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: '',
      reward: '',
      targetResponses: '',
      duration: ''
    });
    const [questions, setQuestions] = useState([]);
    const [enterAnim, setEnterAnim] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setEnterAnim(true), 10);
      return () => clearTimeout(t);
    }, []);

    const QUESTION_TYPES = [
      { key: 'mcq_single', label: 'MCQ Single' },
      { key: 'mcq_multi', label: 'MCQ Multi' },
      { key: 'short_text', label: 'Short Text' },
      { key: 'number', label: 'Number Input' },
      { key: 'rating', label: 'Rating Scale' },
      { key: 'dropdown', label: 'Dropdown' },
      { key: 'date', label: 'Date' },
      { key: 'matrix', label: 'Matrix Grid' }
    ];

    const createDefaultQuestion = (type) => {
      switch (type) {
        case 'mcq_single':
          return { id: Date.now(), type, question: '', options: ['Option 1'], required: true };
        case 'mcq_multi':
          return { id: Date.now(), type, question: '', options: ['Option 1', 'Option 2'], required: true, maxSelect: null };
        case 'short_text':
          return { id: Date.now(), type, question: '', placeholder: '', required: false, maxLength: 200 };
        case 'number':
          return { id: Date.now(), type, question: '', min: null, max: null, step: 1, required: false };
        case 'rating':
          return { id: Date.now(), type, question: '', scale: 5, labels: { low: 'Poor', high: 'Excellent' }, required: false };
        case 'dropdown':
          return { id: Date.now(), type, question: '', options: ['Option 1'], required: true };
        case 'date':
          return { id: Date.now(), type, question: '', format: 'yyyy-MM-dd', required: false };
        case 'matrix':
          return { id: Date.now(), type, question: '', rows: ['Row 1'], columns: ['Col 1', 'Col 2'], required: false };
        default:
          return { id: Date.now(), type: 'short_text', question: '', required: false };
      }
    };

    const addQuestion = (type) => {
      setQuestions(prev => [...prev, createDefaultQuestion(type)]);
    };

    const updateQuestion = (id, patch) => {
      setQuestions(prev => prev.map(q => (q.id === id ? { ...q, ...patch } : q)));
    };

    const removeQuestion = (id) => {
      setQuestions(prev => prev.filter(q => q.id !== id));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const estimatedDuration = parseInt(String(formData.duration).replace(/[^0-9]/g, ''), 10) || 5;
        const payload = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          questions: questions.map(({ id, ...rest }) => rest),
          pointsReward: Number(formData.reward) || 0,
          estimatedDuration,
          maxResponses: Number(formData.targetResponses) || 0,
          isActive: true,
          isPublished: false
        };
        await apiCreateSurvey(payload);
        SuccessHandler.show('Survey created successfully');
        fetchSurveys();
        onClose();
      } catch (error) {
        console.error('Error creating survey:', error);
        ErrorHandler.show(error.message || 'Failed to create survey');
      }
    };

    return (
      <div className={`fixed inset-0 bg-gray-600 overflow-y-auto h-full w-full z-50 p-4 transition-opacity duration-200 ${enterAnim ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
        <div className={`relative top-4 sm:top-20 mx-auto admin-padding-responsive border border-gray-200 w-full max-w-2xl shadow-lg rounded-lg bg-white admin-modal transform transition-all duration-200 ${enterAnim ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[0.99]'}`}>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-3 gap-4">
              <h3 className="text-base font-medium text-gray-900 min-w-0 truncate">Create New Survey</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0 p-1 text-lg"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-spacing-xs">
              <div className="admin-card p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="admin-input" />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="admin-input resize-y" />
                <p className="text-[10px] text-gray-500 mt-1">Briefly describe the survey and its purpose.</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="admin-input">
                  <option value="">Select Category</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Product Development">Product Development</option>
                  <option value="Market Research">Market Research</option>
                  <option value="User Experience">User Experience</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Reward ($)</label>
                  <input type="number" required min="0" value={formData.reward} onChange={(e) => setFormData({...formData, reward: e.target.value})} className="admin-input" />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Target Responses</label>
                  <input type="number" required min="1" value={formData.targetResponses} onChange={(e) => setFormData({...formData, targetResponses: e.target.value})} className="admin-input" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Estimated Duration</label>
                <select required value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="admin-input">
                  <option value="">Select Duration</option>
                  <option value="1-5 minutes">1-5 minutes</option>
                  <option value="5-10 minutes">5-10 minutes</option>
                  <option value="10-15 minutes">10-15 minutes</option>
                  <option value="15-20 minutes">15-20 minutes</option>
                  <option value="20+ minutes">20+ minutes</option>
                </select>
              </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">Questions</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {QUESTION_TYPES.map(t => (
                    <button type="button" key={t.key} onClick={() => addQuestion(t.key)} className="px-2.5 py-1.5 text-xs bg-gray-50 text-gray-700 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all">
                      {t.label}
                    </button>
                  ))}
                </div>
                {questions.length === 0 ? (
                  <p className="text-[11px] text-gray-500">Add questions to build your survey.</p>
                ) : (
                  <div className="space-y-3">
                    {questions.map(q => (
                      <div key={q.id} className="border border-gray-200 rounded-md p-3 transition-transform hover:shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] text-gray-600">{QUESTION_TYPES.find(t => t.key === q.type)?.label || q.type}</span>
                          <button type="button" onClick={() => removeQuestion(q.id)} className="text-gray-400 hover:text-gray-600 text-xs">Remove</button>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[11px] font-medium text-gray-700 mb-1">Question</label>
                            <input type="text" value={q.question} onChange={(e) => updateQuestion(q.id, { question: e.target.value })} className="admin-input" />
                          </div>
                          {['mcq_single','mcq_multi','dropdown'].includes(q.type) && (
                            <div>
                              <label className="block text-[11px] font-medium text-gray-700 mb-1">Options</label>
                              <div className="space-y-1">
                                {q.options.map((opt, idx) => (
                                  <div key={idx} className="flex gap-2">
                                    <input type="text" value={opt} onChange={(e) => {
                                      const options = [...q.options]; options[idx] = e.target.value; updateQuestion(q.id, { options });
                                    }} className="admin-input flex-1" />
                                    <button type="button" onClick={() => {
                                      const options = q.options.filter((_, i) => i !== idx); updateQuestion(q.id, { options });
                                    }} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Del</button>
                                  </div>
                                ))}
                                <button type="button" onClick={() => updateQuestion(q.id, { options: [...q.options, `Option ${q.options.length+1}`] })} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Add Option</button>
                              </div>
                            </div>
                          )}
                          {q.type === 'short_text' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">Placeholder</label>
                                <input type="text" value={q.placeholder} onChange={(e) => updateQuestion(q.id, { placeholder: e.target.value })} className="admin-input" />
                              </div>
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">Max Length</label>
                                <input type="number" min="1" value={q.maxLength} onChange={(e) => updateQuestion(q.id, { maxLength: Number(e.target.value) })} className="admin-input" />
                              </div>
                            </div>
                          )}
                          {q.type === 'number' && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">Min</label>
                                <input type="number" value={q.min ?? ''} onChange={(e) => updateQuestion(q.id, { min: e.target.value === '' ? null : Number(e.target.value) })} className="admin-input" />
                              </div>
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">Max</label>
                                <input type="number" value={q.max ?? ''} onChange={(e) => updateQuestion(q.id, { max: e.target.value === '' ? null : Number(e.target.value) })} className="admin-input" />
                              </div>
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">Step</label>
                                <input type="number" value={q.step} onChange={(e) => updateQuestion(q.id, { step: Number(e.target.value) })} className="admin-input" />
                              </div>
                            </div>
                          )}
                          {q.type === 'rating' && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">Scale</label>
                                <select value={q.scale} onChange={(e) => updateQuestion(q.id, { scale: Number(e.target.value) })} className="admin-input">
                                  {[3,5,7,10].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                              </div>
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">Low Label</label>
                                <input type="text" value={q.labels?.low || ''} onChange={(e) => updateQuestion(q.id, { labels: { ...q.labels, low: e.target.value } })} className="admin-input" />
                              </div>
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">High Label</label>
                                <input type="text" value={q.labels?.high || ''} onChange={(e) => updateQuestion(q.id, { labels: { ...q.labels, high: e.target.value } })} className="admin-input" />
                              </div>
                            </div>
                          )}
                          {q.type === 'date' && (
                            <div>
                              <label className="block text-[11px] font-medium text-gray-700 mb-1">Format</label>
                              <input type="text" value={q.format} onChange={(e) => updateQuestion(q.id, { format: e.target.value })} className="admin-input" />
                            </div>
                          )}
                          {q.type === 'matrix' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">Rows</label>
                                <div className="space-y-1">
                                  {q.rows.map((r, idx) => (
                                    <div key={idx} className="flex gap-2">
                                      <input type="text" value={r} onChange={(e) => {
                                        const rows = [...q.rows]; rows[idx] = e.target.value; updateQuestion(q.id, { rows });
                                      }} className="admin-input flex-1" />
                                      <button type="button" onClick={() => updateQuestion(q.id, { rows: q.rows.filter((_, i) => i !== idx) })} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Del</button>
                                    </div>
                                  ))}
                                  <button type="button" onClick={() => updateQuestion(q.id, { rows: [...q.rows, `Row ${q.rows.length+1}`] })} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Add Row</button>
                                </div>
                              </div>
                              <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1">Columns</label>
                                <div className="space-y-1">
                                  {q.columns.map((c, idx) => (
                                    <div key={idx} className="flex gap-2">
                                      <input type="text" value={c} onChange={(e) => {
                                        const columns = [...q.columns]; columns[idx] = e.target.value; updateQuestion(q.id, { columns });
                                      }} className="admin-input flex-1" />
                                      <button type="button" onClick={() => updateQuestion(q.id, { columns: q.columns.filter((_, i) => i !== idx) })} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Del</button>
                                    </div>
                                  ))}
                                  <button type="button" onClick={() => updateQuestion(q.id, { columns: [...q.columns, `Col ${q.columns.length+1}`] })} className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Add Column</button>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <label className="text-[11px] text-gray-700">Required</label>
                            <input type="checkbox" checked={q.required || false} onChange={(e) => updateQuestion(q.id, { required: e.target.checked })} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-xs w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-xs w-full sm:w-auto"
                >
                  Create Survey
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || survey.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-container withdrawal-compact">
      {/* Page Header */}
      <div className="admin-section">
        <div className="admin-page-header">
          <div className="admin-header-content">
            <h1 className="text-base sm:text-lg font-bold text-gray-900">Survey Management</h1>
            <p className="text-xs text-gray-600">Create and manage surveys</p>
          </div>
          <div className="admin-header-actions">
            <button
              onClick={() => setShowCreateModal(true)}
              className="admin-button-primary w-full sm:w-auto justify-center sm:justify-start"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Survey
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search surveys by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input search-input"
              />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-input"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Surveys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {loading ? (
          <div className="col-span-full">
            <SectionLoading message="Loading surveys..." />
          </div>
        ) : (
          filteredSurveys.map((survey) => (
            <div key={survey.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{survey.title}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{survey.description}</p>
                    {getStatusBadge(survey.status)}
                  </div>
                  <div className="relative ml-2">
                    <button
                      onClick={() => setActionDropdown(actionDropdown === survey.id ? null : survey.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    
                    {actionDropdown === survey.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                        <button
                          onClick={() => {
                            handleViewDetails(survey.id);
                            setActionDropdown(null);
                          }}
                          className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="mr-2 h-3 w-3" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleSurveyAction('duplicate', survey.id)}
                          className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                        >
                          <Copy className="mr-2 h-3 w-3" />
                          Duplicate
                        </button>
                        {survey.status === 'draft' && (
                          <button
                            onClick={() => handleSurveyAction('activate', survey.id)}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                          >
                            <Play className="mr-2 h-3 w-3" />
                            Activate
                          </button>
                        )}
                        {survey.status === 'active' && (
                          <button
                            onClick={() => handleSurveyAction('pause', survey.id)}
                            className="flex items-center w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                          >
                            <Pause className="mr-2 h-3 w-3" />
                            Pause
                          </button>
                        )}
                        <button
                          onClick={() => handleSurveyAction('delete', survey.id)}
                          className="flex items-center w-full px-3 py-1.5 text-xs text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="mr-2 h-3 w-3" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{survey.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Reward:</span>
                    <span className="font-medium text-green-600">${survey.reward}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{survey.duration}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium">{survey.responses}/{survey.targetResponses}</span>
                    </div>
                    {getProgressBar(survey.responses, survey.targetResponses)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(survey.createdDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewDetails(survey.id)}
                      className="text-primary-600 hover:text-primary-800 text-xs font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Survey Details Modal */}
      {showSurveyModal && (
        <SurveyModal
          survey={selectedSurvey}
          onClose={() => {
            setShowSurveyModal(false);
            setSelectedSurvey(null);
          }}
        />
      )}

      {/* Create Survey Modal */}
      {showCreateModal && (
        <CreateSurveyModal
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default SurveyManagement;

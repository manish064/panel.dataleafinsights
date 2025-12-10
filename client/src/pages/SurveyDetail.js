import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Clock, Users, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import styled from 'styled-components';

const SurveyContainer = styled.div`
  max-width: 1000px; // Reduced from 1200px
  margin: 0 auto;
  padding: 0.25rem; // Reduced from 0.3rem
  min-height: calc(100vh - 120px);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #0fc179;
  font-size: 0.55rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.3rem;
  padding: 0.25rem 0;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0fc179;
  }
  
  svg {
    font-size: 0.55rem;
    flex-shrink: 0;
  }
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  gap: 0.75rem;
  
  button {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &.previous {
      background: white;
      color: #0fc179;
      border: 1px solid #e2e8f0;
      
      &:hover:not(:disabled) {
        background: #f8fafc;
        border-color: #0fc179;
        transform: translateY(-1px);
      }
    }
    
    &.next {
      background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
      color: white;
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(15, 193, 121, 0.3);
      }
    }
    
    &.submit {
      background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
      color: white;
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
      }
    }
    
    svg {
      font-size: 0.8rem;
      flex-shrink: 0;
    }
  }
`;

const SurveyHeader = styled.div`
  background: linear-gradient(to bottom, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 0.3rem; // Reduced from 0.4rem
  border-radius: 2px;
  margin-bottom: 0.6rem; // Reduced from 0.8rem
  
  h1 {
    color: white;
    margin: 0 0 0.25rem 0;
    font-size: 0.9rem; // Reduced from 1rem
  }
  
  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    opacity: 0.9;
    font-size: 0.65rem; // Reduced from 0.7rem
  }
`;

const SurveyMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); // Reduced from 200px
  gap: 0.4rem; // Reduced from 0.5rem
  margin-bottom: 0.6rem; // Reduced from 0.8rem
`;

const MetaItem = styled.div`
  background: white;
  padding: 0.4rem; // Reduced from 0.5rem
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 0.4rem; // Reduced from 0.5rem
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e2e8f0;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(15, 193, 121, 0.12);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 240px; // Reduced from 280px
  gap: 0.6rem; // Reduced from 0.75rem
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 5px; // Reduced from 6px
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid #e2e8f0;
`;

const CardHeader = styled.div`
  padding: 0.6rem; // Reduced from 0.75rem
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 0.7rem; // Reduced from 0.8rem
  }
`;

const CardContent = styled.div`
  padding: 0.6rem; // Reduced from 0.75rem
  
  .progress-track {
    width: 100%;
    height: 10px;
    background: #f1f5f9;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #0fc179 0%, #0fc179 50%, #0fc179 100%);
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 6px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
        animation: shimmer 2s infinite;
      }
    }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;



const QuestionCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideIn 0.4s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }
  
  .question-header {
    padding: 0.75rem;
    border-bottom: 1px solid #e0e0e0;
    background: #f8fafc;
    
    .question-number {
      color: #0fc179;
      font-weight: 600;
      font-size: 0.8rem;
      margin-bottom: 0.2rem;
    }
    
    .question-text {
      color: #2c3e50;
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
      line-height: 1.4;
    }
    
    .question-required {
      color: #e74c3c;
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }
  
  .question-content {
    padding: 0.75rem;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  
  &:hover {
    background: #f8fafc;
    border-color: #0fc179;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(15, 193, 121, 0.1);
  }
  
  &.selected {
    border-color: #0fc179;
    background: rgba(15, 193, 121, 0.05);
    box-shadow: 0 2px 8px rgba(15, 193, 121, 0.15);
  }
  
  input {
    margin: 0;
    margin-right: 0.75rem;
    accent-color: #0fc179;
  }
  
  span {
    color: #2c3e50;
    font-size: 0.65rem;
    font-weight: 500;
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 2px solid rgba(15, 193, 121, 0.2);
  border-radius: 6px;
  font-size: 0.65rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 2px solid rgba(15, 193, 121, 0.2);
  border-radius: 6px;
  font-size: 0.75rem;
  min-height: 40px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #0fc179;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
  
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
    
    &.previous {
      background: #f8fafc;
      color: #64748b;
      border: 1px solid #e2e8f0;
      
      &:hover:not(:disabled) {
        background: #f1f5f9;
        color: #475569;
        transform: translateX(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    &.next, &.submit {
      background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(15, 193, 121, 0.3);
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(15, 193, 121, 0.4);
      }
      
      &:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(15, 193, 121, 0.3);
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: 0 2px 8px rgba(15, 193, 121, 0.2);
      }
    }
    
    &.submit {
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
      
      &:hover:not(:disabled) {
        background: linear-gradient(135deg, #047857 0%, #059669 100%);
        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
      }
      
      &:disabled {
        box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
      }
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  
  &::after {
    content: '';
    width: 32px;
    height: 32px;
    border: 3px solid rgba(15, 193, 121, 0.1);
    border-top: 3px solid #0fc179;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #0fc179 0%, #0fc179 100%);
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(15, 193, 121, 0.2);
  
  h3 {
    margin: 1rem 0;
    color: white;
    font-size: 1rem;
  }
  
  p {
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.85rem;
  }
  
  button {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 0.4rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
  }
`;

const SurveyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  const fetchSurvey = useCallback(async () => {
    try {
      const response = await axios.get(`/surveys/${id}`);
      if (response.data.success) {
        const srv = response.data.survey;
        const normalizedQuestions = (srv.questions || []).map((q, idx) => {
          const idSafe = q.id !== undefined ? q.id : idx + 1;
          switch (q.type) {
            case 'mcq_single':
              return { ...q, id: idSafe, type: 'multiple-choice', options: q.options || [] };
            case 'mcq_multi':
              return { ...q, id: idSafe, type: 'checkbox', options: q.options || [] };
            case 'short_text':
              return { ...q, id: idSafe, type: 'text' };
            case 'number':
              return { ...q, id: idSafe, type: 'number' };
            case 'rating':
              return { ...q, id: idSafe, type: 'rating', maxRating: q.scale || q.maxRating || 5 };
            case 'dropdown':
              return { ...q, id: idSafe, type: 'dropdown', options: q.options || [] };
            case 'date':
              return { ...q, id: idSafe, type: 'date', format: q.format || 'yyyy-MM-dd' };
            case 'matrix':
              return { ...q, id: idSafe, type: 'matrix', rows: q.rows || [], columns: q.columns || [] };
            default:
              return { ...q, id: idSafe };
          }
        });
        setSurvey({ ...srv, questions: normalizedQuestions });
      } else {
        setError('Survey not found or not available');
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && 
          error.response.data.message === 'Survey already completed') {
        setCompleted(true);
        setError('You have already completed this survey. Thank you for your participation!');
      } else {
        setError('Failed to load survey. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSurvey();
  }, [fetchSurvey]);

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const isCurrentQuestionAnswered = () => {
    if (!survey || !survey.questions) return false;
    const question = survey.questions[currentQuestion];
    const response = responses[question.id];
    
    // For checkbox questions, check if at least one option is selected
    if (question.type === 'checkbox') {
      return Array.isArray(response) && response.length > 0;
    }
    // For matrix, require selection for each row if required
    if (question.type === 'matrix') {
      const rowCount = (question.rows || []).length;
      if (!response || typeof response !== 'object') return false;
      const answeredRows = Object.keys(response).length;
      return answeredRows >= rowCount;
    }
    
    // For other questions, check if response exists and is not empty
    return response !== undefined && response !== '' && response !== null;
  };

  const validateAllRequiredQuestions = () => {
    if (!survey || !survey.questions) return false;
    
    for (const question of survey.questions) {
      if (question.required) {
        const response = responses[question.id];
        
        // For checkbox questions, check if at least one option is selected
        if (question.type === 'checkbox') {
          if (!Array.isArray(response) || response.length === 0) {
            return false;
          }
        } else {
          // For other questions, check if response exists and is not empty
          if (response === undefined || response === '' || response === null) {
            return false;
          }
        }
      }
    }
    
    return true;
  };

  const getRequiredQuestionsStatus = () => {
    if (!survey || !survey.questions) return { completed: 0, total: 0 };
    
    const requiredQuestions = survey.questions.filter(q => q.required);
    const completedRequired = requiredQuestions.filter(question => {
      const response = responses[question.id];
      
      if (question.type === 'checkbox') {
        return Array.isArray(response) && response.length > 0;
      }
      
      return response !== undefined && response !== '' && response !== null;
    });
    
    return {
      completed: completedRequired.length,
      total: requiredQuestions.length
    };
  };

  const handleNext = () => {
    if (currentQuestion < survey.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate all required questions are answered
    if (!validateAllRequiredQuestions()) {
      setError('Please answer all required questions before submitting.');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      const submissionData = {
        responses,
        timeSpent
      };
      
      console.log('Submitting survey:', {
        surveyId: survey.id,
        submissionData,
        endpoint: `/surveys/${survey.id}/submit`
      });
      
      const response = await axios.post(`/surveys/${survey.id}/submit`, submissionData);
      
      console.log('Survey submission response:', response.data);
      
      if (response.data.success) {
        setCompleted(true);
        // Refresh user data to get updated points
        await refreshUser();
        // Navigate back to surveys page with completion flag to trigger data refresh
        setTimeout(() => {
          navigate('/surveys?completed=true&refresh=true');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to submit survey');
      }
    } catch (error) {
      console.error('Survey submission error:', error);
      console.error('Error response:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to submit survey. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyPress = useCallback((event) => {
    // Only handle Enter key
    if (event.key !== 'Enter') return;
    
    // Don't interfere with form inputs that are focused
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
      // For text inputs, let Enter work normally (or move to next question)
      if (activeElement.type === 'text' || activeElement.type === 'email' || activeElement.type === 'tel' || 
          activeElement.type === 'url' || activeElement.type === 'number' || activeElement.type === 'date' || 
          activeElement.tagName === 'TEXTAREA') {
        event.preventDefault();
        // Move to next question or submit
        if (currentQuestion === survey.questions.length - 1) {
          if (validateAllRequiredQuestions()) {
            handleSubmit();
          }
        } else {
          const currentQuestionData = survey.questions[currentQuestion];
          if (!currentQuestionData.required || isCurrentQuestionAnswered()) {
            handleNext();
          }
        }
        return;
      }
    }
    
    // For radio buttons and checkboxes, Enter should move to next question
    event.preventDefault();
    
    if (currentQuestion === survey.questions.length - 1) {
      // Last question - submit if all required questions are answered
      if (validateAllRequiredQuestions()) {
        handleSubmit();
      }
    } else {
      // Not last question - move to next if current question is answered (if required)
      const currentQuestionData = survey.questions[currentQuestion];
      if (!currentQuestionData.required || isCurrentQuestionAnswered()) {
        handleNext();
      }
    }
  }, [currentQuestion, survey, responses, handleNext, handleSubmit, isCurrentQuestionAnswered, validateAllRequiredQuestions]);

  // Add keyboard event listener
  useEffect(() => {
    if (survey && survey.questions && survey.questions.length > 0) {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [handleKeyPress, survey]);

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const renderQuestion = (question) => {
    const currentResponse = responses[question.id];
    
    switch (question.type) {
      case 'multiple-choice':
        return (
          <OptionsContainer>
            {question.options.map((option, index) => (
              <OptionLabel
                key={index}
                className={currentResponse === option ? 'selected' : ''}
              >
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={option}
                  checked={currentResponse === option}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                />
                <span>{option}</span>
              </OptionLabel>
            ))}
          </OptionsContainer>
        );
        
      case 'checkbox':
        return (
          <OptionsContainer>
            {question.options.map((option, index) => {
              const selectedOptions = currentResponse || [];
              return (
                <OptionLabel
                  key={index}
                  className={selectedOptions.includes(option) ? 'selected' : ''}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={(e) => {
                      const newSelection = selectedOptions.includes(option)
                        ? selectedOptions.filter(item => item !== option)
                        : [...selectedOptions, option];
                      handleResponseChange(question.id, newSelection);
                    }}
                  />
                  <span>{option}</span>
                </OptionLabel>
              );
            })}
          </OptionsContainer>
        );

      case 'dropdown':
        return (
          <select
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            style={{ padding: '0.6rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
          >
            <option value="">Select an option</option>
            {question.options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        );
        
      case 'text':
        return (
          <TextInput
            type="text"
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter your answer..."
          />
        );
        
      case 'textarea':
        return (
          <TextArea
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter your detailed response..."
          />
        );
        
      case 'rating':
        const maxRating = question.maxRating || 5;
        return (
          <OptionsContainer>
            {Array.from({ length: maxRating }, (_, i) => i + 1).map(rating => (
              <OptionLabel
                key={rating}
                className={currentResponse === rating ? 'selected' : ''}
              >
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={rating}
                  checked={currentResponse === rating}
                  onChange={(e) => handleResponseChange(question.id, parseInt(e.target.value))}
                />
                <span>{rating}</span>
              </OptionLabel>
            ))}
          </OptionsContainer>
        );
        
      case 'fill-in-the-blank':
        return (
          <TextInput
            type="text"
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Fill in the blank..."
          />
        );
        
      case 'date':
        return (
          <TextInput
            type="date"
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Select a date..."
          />
        );
        
      case 'number':
        return (
          <TextInput
            type="number"
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter a number..."
          />
        );

      case 'matrix':
        const rows = question.rows || [];
        const cols = question.columns || [];
        const resp = currentResponse || {};
        return (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px' }}></th>
                  {cols.map((c, i) => (
                    <th key={i} style={{ textAlign: 'center', padding: '8px', fontSize: '0.85rem', color: '#64748b' }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, ri) => (
                  <tr key={ri}>
                    <td style={{ padding: '8px', fontSize: '0.9rem', color: '#374151' }}>{r}</td>
                    {cols.map((c, ci) => (
                      <td key={ci} style={{ textAlign: 'center', padding: '8px' }}>
                        <input
                          type="radio"
                          name={`matrix_${question.id}_row_${ri}`}
                          checked={resp[ri] === ci}
                          onChange={() => handleResponseChange(question.id, { ...resp, [ri]: ci })}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        
      case 'email':
        return (
          <TextInput
            type="email"
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter your email..."
          />
        );
        
      case 'phone':
        return (
          <TextInput
            type="tel"
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter your phone number..."
          />
        );
        
      case 'url':
        return (
          <TextInput
            type="url"
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder="Enter a URL..."
          />
        );
        
      default:
        // Fallback to text input for any unrecognized type
        return (
          <TextInput
            type="text"
            value={currentResponse || ''}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            placeholder={`Enter your answer for ${question.type} question...`}
          />
        );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && !survey) {
    return (
      <SurveyContainer>
        <ErrorMessage>
          <FaExclamationTriangle />
          {error}
        </ErrorMessage>
        <BackButton onClick={() => navigate('/surveys')}>
          <FaArrowLeft />
          Back to Surveys
        </BackButton>
      </SurveyContainer>
    );
  }

  if (completed) {
    return (
      <SurveyContainer>
        <SuccessMessage>
          <FaCheckCircle size={48} style={{ color: '#27ae60' }} />
          <h3>Survey Already Completed!</h3>
          <p>{error || 'Thank you for your participation.'}</p>
          {survey && survey.pointsReward && (
            <p>You've earned <strong>{survey.pointsReward} points</strong> for completing this survey.</p>
          )}
          <button onClick={() => navigate('/surveys?completed=true')}>Back to Surveys</button>
        </SuccessMessage>
      </SurveyContainer>
    );
  }

  if (!survey || !survey.questions || survey.questions.length === 0) {
    return (
      <SurveyContainer>
        <ErrorMessage>
          <FaExclamationTriangle />
          This survey is not available or has no questions.
        </ErrorMessage>
        <BackButton onClick={() => navigate('/surveys')}>
          <FaArrowLeft />
          Back to Surveys
        </BackButton>
      </SurveyContainer>
    );
  }

  const currentQuestionData = survey.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / survey.questions.length) * 100;

  return (
    <SurveyContainer>
      <BackButton onClick={() => navigate('/surveys')}>
        <FaArrowLeft />
        Back to Surveys
      </BackButton>

      <SurveyHeader>
        <h1>{survey.title}</h1>
        <p>{survey.description}</p>
      </SurveyHeader>
      
      <SurveyMeta>
        <MetaItem>
          <Clock size={20} color="#0fc179" />
          <div>
            <div style={{fontWeight: '600', color: '#2c3e50'}}>{formatDuration(survey.estimatedTime)}</div>
            <div style={{fontSize: '0.85rem', color: '#64748b'}}>Estimated time</div>
          </div>
        </MetaItem>
        <MetaItem>
          <DollarSign size={20} color="#10b981" />
          <div>
            <div style={{fontWeight: '600', color: '#2c3e50'}}>{survey.pointsReward} points</div>
            <div style={{fontSize: '0.85rem', color: '#64748b'}}>Reward</div>
          </div>
        </MetaItem>
        <MetaItem>
          <Users size={20} color="#f59e0b" />
          <div>
            <div style={{fontWeight: '600', color: '#2c3e50'}}>{survey.targetAudience || 'General'}</div>
            <div style={{fontSize: '0.85rem', color: '#64748b'}}>Target audience</div>
          </div>
        </MetaItem>
      </SurveyMeta>

      {error && (
        <ErrorMessage>
          <FaExclamationTriangle />
          {error}
        </ErrorMessage>
      )}

      <ContentGrid>
        <div>
          <QuestionCard>
            <div className="question-header">
              <div className="question-number">
                Question {currentQuestion + 1}
              </div>
              <h2 className="question-text">
                {currentQuestionData.question}
              </h2>
              {currentQuestionData.required && (
                <div className="question-required">
                  * This question is required
                </div>
              )}
            </div>
            
            <div className="question-content">
              {renderQuestion(currentQuestionData)}
            </div>
            
            {/* Enter key hint */}
            <div style={{
              marginTop: '0.75rem',
              padding: '0.5rem',
              background: 'rgba(15, 193, 121, 0.05)',
              border: '1px solid rgba(15, 193, 121, 0.1)',
              borderRadius: '4px',
              fontSize: '0.8rem',
              color: '#64748b',
              textAlign: 'center'
            }}>
              💡 Press <kbd style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '3px',
                padding: '0.1rem 0.3rem',
                fontSize: '0.75rem',
                fontFamily: 'monospace'
              }}>Enter</kbd> to {currentQuestion === survey.questions.length - 1 ? 'submit survey' : 'move to next question'}
            </div>
          </QuestionCard>

          <NavigationButtons>
            <button
              className="previous"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            
            {currentQuestion === survey.questions.length - 1 ? (
              <button
                className="submit"
                onClick={handleSubmit}
                disabled={submitting || !validateAllRequiredQuestions()}
              >
                {submitting ? 'Submitting...' : 'Submit Survey'}
              </button>
            ) : (
              <button
                className="next"
                onClick={handleNext}
                disabled={currentQuestionData.required && !isCurrentQuestionAnswered()}
              >
                Next
                <ChevronRight size={16} />
              </button>
            )}
          </NavigationButtons>
        </div>
        
        <div>
          <Card>
             <CardHeader>
               <h2>Progress</h2>
               <span style={{color: '#0fc179', fontWeight: '600'}}>
                 {Math.round(progress)}%
               </span>
             </CardHeader>
             <CardContent>
               <div className="progress-track">
                 <div className="progress-fill" style={{ width: `${progress}%` }} />
               </div>
               <div style={{marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748b'}}>
                 Question {currentQuestion + 1} of {survey.questions.length}
               </div>
             </CardContent>
           </Card>
          
          <Card style={{marginTop: '1rem'}}>
             <CardHeader>
               <h2>Survey Info</h2>
             </CardHeader>
             <CardContent>
               <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                 <div style={{display: 'flex', justifyContent: 'space-between'}}>
                   <span style={{color: '#64748b'}}>Total Questions:</span>
                   <span style={{fontWeight: '500'}}>{survey.questions.length}</span>
                 </div>
                 <div style={{display: 'flex', justifyContent: 'space-between'}}>
                   <span style={{color: '#64748b'}}>Current:</span>
                   <span style={{fontWeight: '500'}}>{currentQuestion + 1}</span>
                 </div>
                 <div style={{display: 'flex', justifyContent: 'space-between'}}>
                   <span style={{color: '#64748b'}}>Answered:</span>
                   <span style={{fontWeight: '500'}}>{Object.keys(responses).length}</span>
                 </div>
                 <div style={{display: 'flex', justifyContent: 'space-between'}}>
                   <span style={{color: '#64748b'}}>Required:</span>
                   <span style={{fontWeight: '500', color: getRequiredQuestionsStatus().completed === getRequiredQuestionsStatus().total ? '#059669' : '#e74c3c'}}>
                     {getRequiredQuestionsStatus().completed}/{getRequiredQuestionsStatus().total}
                   </span>
                 </div>
                 {!validateAllRequiredQuestions() && (
                   <div style={{padding: '0.5rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', fontSize: '0.8rem', color: '#dc2626'}}>
                     Please complete all required questions to submit
                   </div>
                 )}
               </div>
             </CardContent>
           </Card>
        </div>
      </ContentGrid>
    </SurveyContainer>
  );
};

export default SurveyDetail;

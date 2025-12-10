const express = require('express');
const { Op } = require('sequelize');
const { Survey, SurveyResponse, User } = require('../models');
const { authenticateAdmin, requirePermission, logAdminAction } = require('../middleware/adminAuth');
const router = express.Router();

// Get all surveys with filtering and pagination
router.get('/', authenticateAdmin, requirePermission('surveys', 'read'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = '',
      category = '',
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      dateFrom = '',
      dateTo = ''
    } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};
    
    // Search filter
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    
    // Status filter
    if (status) {
      if (status === 'active') {
        whereClause.isActive = true;
        whereClause.isPublished = true;
      } else if (status === 'draft') {
        whereClause.isPublished = false;
      } else if (status === 'inactive') {
        whereClause.isActive = false;
      }
    }
    
    // Category filter
    if (category) {
      whereClause.category = category;
    }
    
    // Date range filter
    if (dateFrom || dateTo) {
      whereClause.createdAt = {};
      if (dateFrom) {
        whereClause.createdAt[Op.gte] = new Date(dateFrom);
      }
      if (dateTo) {
        whereClause.createdAt[Op.lte] = new Date(dateTo);
      }
    }
    
    const { count, rows: surveys } = await Survey.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: SurveyResponse,
          attributes: ['id', 'pointsEarned'],
          separate: true
        }
      ]
    });
    
    // Calculate additional stats for each survey
    const surveysWithStats = surveys.map(survey => {
      const responses = survey.SurveyResponses || [];
      const totalResponses = responses.length;
      const totalPointsAwarded = responses.reduce((sum, response) => sum + (response.pointsEarned || 0), 0);
      const avgPointsPerResponse = totalResponses > 0 ? totalPointsAwarded / totalResponses : 0;
      
      return {
        id: survey.id,
        title: survey.title,
        description: survey.description,
        category: survey.category,
        isActive: survey.isActive,
        isPublished: survey.isPublished,
        pointsReward: survey.pointsReward,
        estimatedDuration: survey.estimatedDuration,
        targetAudience: survey.targetAudience,
        maxResponses: survey.maxResponses,
        startDate: survey.startDate,
        endDate: survey.endDate,
        createdAt: survey.createdAt,
        updatedAt: survey.updatedAt,
        responseCount: totalResponses,
        totalPointsAwarded,
        avgPointsPerResponse: Math.round(avgPointsPerResponse * 100) / 100
      };
    });
    
    res.json({
      success: true,
      data: {
        surveys: surveysWithStats,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get surveys error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get survey statistics
router.get('/stats', authenticateAdmin, requirePermission('surveys', 'read'), async (req, res) => {
  try {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const [totalSurveys, activeSurveys, publishedSurveys, draftSurveys, newSurveys, totalResponses] = await Promise.all([
      Survey.count(),
      Survey.count({ where: { isActive: true } }),
      Survey.count({ where: { isPublished: true } }),
      Survey.count({ where: { isPublished: false } }),
      Survey.count({ where: { createdAt: { [Op.gte]: last30Days } } }),
      SurveyResponse.count()
    ]);
    
    res.json({
      success: true,
      data: {
        totalSurveys,
        activeSurveys,
        publishedSurveys,
        draftSurveys,
        newSurveys,
        totalResponses
      }
    });
  } catch (error) {
    console.error('Get survey stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single survey details
router.get('/:id', authenticateAdmin, requirePermission('surveys', 'read'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const survey = await Survey.findByPk(id, {
      include: [
        {
          model: SurveyResponse,
          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email']
          }],
          order: [['createdAt', 'DESC']],
          limit: 20
        }
      ]
    });
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        survey
      }
    });
  } catch (error) {
    console.error('Get survey details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new survey
router.post('/', authenticateAdmin, requirePermission('surveys', 'create'), logAdminAction('CREATE_SURVEY', 'survey'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      questions,
      pointsReward,
      estimatedDuration,
      targetAudience,
      maxResponses,
      startDate,
      endDate,
      isActive = true,
      isPublished = false
    } = req.body;
    
    if (!title || !description || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and questions are required'
      });
    }
    
    const survey = await Survey.create({
      title,
      description,
      category,
      questions,
      pointsReward: pointsReward || 10,
      estimatedDuration: estimatedDuration || 5,
      targetAudience,
      maxResponses,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      isActive,
      isPublished,
      createdBy: req.admin.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Survey created successfully',
      data: {
        survey
      }
    });
  } catch (error) {
    console.error('Create survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update survey
router.put('/:id', authenticateAdmin, requirePermission('surveys', 'update'), logAdminAction('UPDATE_SURVEY', 'survey'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      questions,
      pointsReward,
      estimatedDuration,
      targetAudience,
      maxResponses,
      startDate,
      endDate,
      isActive,
      isPublished
    } = req.body;
    
    const survey = await Survey.findByPk(id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }
    
    // Store original data for audit log
    req.originalData = {
      title: survey.title,
      description: survey.description,
      category: survey.category,
      questions: survey.questions,
      pointsReward: survey.pointsReward,
      estimatedDuration: survey.estimatedDuration,
      targetAudience: survey.targetAudience,
      maxResponses: survey.maxResponses,
      startDate: survey.startDate,
      endDate: survey.endDate,
      isActive: survey.isActive,
      isPublished: survey.isPublished
    };
    
    const updatedSurvey = await survey.update({
      title: title || survey.title,
      description: description || survey.description,
      category: category || survey.category,
      questions: questions || survey.questions,
      pointsReward: pointsReward !== undefined ? pointsReward : survey.pointsReward,
      estimatedDuration: estimatedDuration !== undefined ? estimatedDuration : survey.estimatedDuration,
      targetAudience: targetAudience || survey.targetAudience,
      maxResponses: maxResponses !== undefined ? maxResponses : survey.maxResponses,
      startDate: startDate ? new Date(startDate) : survey.startDate,
      endDate: endDate ? new Date(endDate) : survey.endDate,
      isActive: isActive !== undefined ? isActive : survey.isActive,
      isPublished: isPublished !== undefined ? isPublished : survey.isPublished
    });
    
    res.json({
      success: true,
      message: 'Survey updated successfully',
      data: {
        survey: updatedSurvey
      }
    });
  } catch (error) {
    console.error('Update survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Activate survey
router.post('/:id/activate', authenticateAdmin, requirePermission('surveys', 'update'), logAdminAction('ACTIVATE_SURVEY', 'survey'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const survey = await Survey.findByPk(id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }
    
    if (survey.isActive && survey.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'Survey is already active'
      });
    }
    
    req.originalData = { isActive: survey.isActive, isPublished: survey.isPublished };
    
    await survey.update({ isActive: true, isPublished: true });
    
    res.json({
      success: true,
      message: 'Survey activated successfully'
    });
  } catch (error) {
    console.error('Activate survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Pause survey
router.post('/:id/pause', authenticateAdmin, requirePermission('surveys', 'update'), logAdminAction('PAUSE_SURVEY', 'survey'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const survey = await Survey.findByPk(id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }
    
    req.originalData = { isActive: survey.isActive, isPublished: survey.isPublished };
    
    await survey.update({ isActive: false, isPublished: survey.isPublished });
    
    res.json({
      success: true,
      message: 'Survey paused successfully'
    });
  } catch (error) {
    console.error('Pause survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Complete survey
router.post('/:id/complete', authenticateAdmin, requirePermission('surveys', 'update'), logAdminAction('COMPLETE_SURVEY', 'survey'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const survey = await Survey.findByPk(id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }
    
    req.originalData = { isActive: survey.isActive, isPublished: survey.isPublished };
    
    await survey.update({ isActive: false, isPublished: false });
    
    res.json({
      success: true,
      message: 'Survey completed successfully'
    });
  } catch (error) {
    console.error('Complete survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Duplicate survey
router.post('/:id/duplicate', authenticateAdmin, requirePermission('surveys', 'create'), logAdminAction('DUPLICATE_SURVEY', 'survey'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const originalSurvey = await Survey.findByPk(id);
    
    if (!originalSurvey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }
    
    const duplicatedSurvey = await Survey.create({
      title: `${originalSurvey.title} (Copy)`,
      description: originalSurvey.description,
      category: originalSurvey.category,
      questions: originalSurvey.questions,
      pointsReward: originalSurvey.pointsReward,
      estimatedDuration: originalSurvey.estimatedDuration,
      targetAudience: originalSurvey.targetAudience,
      maxResponses: originalSurvey.maxResponses,
      isActive: true,
      isPublished: false,
      createdBy: req.admin.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Survey duplicated successfully',
      data: {
        survey: duplicatedSurvey
      }
    });
  } catch (error) {
    console.error('Duplicate survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete survey
router.delete('/:id', authenticateAdmin, requirePermission('surveys', 'delete'), logAdminAction('DELETE_SURVEY', 'survey'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const survey = await Survey.findByPk(id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }
    
    // Check if survey has responses
    const responseCount = await SurveyResponse.count({ where: { surveyId: id } });
    
    if (responseCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete survey with existing responses. Consider archiving instead.'
      });
    }
    
    // Store original data for audit log
    req.originalData = survey.toJSON();
    
    await survey.destroy();
    
    res.json({
      success: true,
      message: 'Survey deleted successfully'
    });
  } catch (error) {
    console.error('Delete survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get survey responses
router.get('/:id/responses', authenticateAdmin, requirePermission('surveys', 'read'), async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const survey = await Survey.findByPk(id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }
    
    const { count, rows: responses } = await SurveyResponse.findAndCountAll({
      where: { surveyId: id },
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      data: {
        survey: {
          id: survey.id,
          title: survey.title,
          description: survey.description
        },
        responses,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get survey responses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Export survey responses
router.get('/:id/export', authenticateAdmin, requirePermission('surveys', 'read'), logAdminAction('EXPORT_SURVEY_RESPONSES', 'survey'), async (req, res) => {
  try {
    const { id } = req.params;
    const { format = 'csv' } = req.query;
    
    const survey = await Survey.findByPk(id);
    
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }
    
    const responses = await SurveyResponse.findAll({
      where: { surveyId: id },
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    if (format === 'csv') {
      const csvHeader = 'Response ID,User ID,User Name,User Email,Points Earned,Completed At,Answers\n';
      const csvData = responses.map(response => [
        response.id,
        response.User.id,
        `${response.User.firstName} ${response.User.lastName}`,
        response.User.email,
        response.pointsEarned,
        response.createdAt,
        JSON.stringify(response.answers).replace(/"/g, '""')
      ].join(',')).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=survey-${id}-responses.csv`);
      res.send(csvHeader + csvData);
    } else {
      res.json({
        success: true,
        data: {
          survey,
          responses
        }
      });
    }
  } catch (error) {
    console.error('Export survey responses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
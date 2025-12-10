const express = require('express');
const { Survey, SurveyResponse, User } = require('../models');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Get available surveys for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { category, minPoints, maxPoints, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Get all surveys in creation order (progressive unlock order)
    const allSurveys = await Survey.findAll({
      where: {
        isActive: true,
        isPublished: true
      },
      order: [['id', 'ASC']] // Use ID order as creation order
    });

    // Get completed surveys for this user
    const completedSurveyIds = await SurveyResponse.findAll({
      where: {
        userId: req.user.id,
        isCompleted: true
      },
      attributes: ['surveyId']
    }).then(responses => responses.map(r => r.surveyId));

    // Progressive unlock logic: only show the next available survey
    let availableSurveys = [];
    
    if (completedSurveyIds.length === 0) {
      // No surveys completed, show only the first survey
      if (allSurveys.length > 0) {
        availableSurveys = [allSurveys[0]];
      }
    } else {
      // Find the next survey to unlock
      const nextSurveyIndex = completedSurveyIds.length;
      if (nextSurveyIndex < allSurveys.length) {
        availableSurveys = [allSurveys[nextSurveyIndex]];
      }
      // If all surveys are completed, show empty array
    }

    // Apply filters if provided
    if (category || minPoints || maxPoints) {
      availableSurveys = availableSurveys.filter(survey => {
        if (category && survey.category !== category) return false;
        if (minPoints && survey.pointsReward < parseInt(minPoints)) return false;
        if (maxPoints && survey.pointsReward > parseInt(maxPoints)) return false;
        return true;
      });
    }

    // Apply pagination
    const total = availableSurveys.length;
    const paginatedSurveys = availableSurveys.slice(offset, offset + parseInt(limit));

    res.json({
      success: true,
      surveys: paginatedSurveys,
      pagination: {
        total: total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      },
      progressInfo: {
        completedSurveys: completedSurveyIds.length,
        totalSurveys: allSurveys.length,
        nextSurveyAvailable: availableSurveys.length > 0
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

// Get user's survey history
router.get('/user/history', authenticateToken, async (req, res) => {
  try {
    const responses = await SurveyResponse.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Survey,
        attributes: ['id', 'title', 'category', 'pointsReward']
      }],
      order: [['createdAt', 'DESC']]
    });

    const history = responses.map(response => ({
      id: response.id,
      survey: response.Survey,
      completedAt: response.createdAt,
      timeSpent: response.timeSpent,
      pointsEarned: response.pointsEarned
    }));

    res.json({
      success: true,
      responses: history
    });
  } catch (error) {
    console.error('Error fetching user survey history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch survey history'
    });
  }
});

// Get survey categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Survey.findAll({
      attributes: ['category'],
      where: {
        isActive: true,
        isPublished: true
      },
      group: ['category'],
      raw: true
    });

    const categoryList = categories.map(item => item.category).filter(Boolean);
    
    res.json({
      success: true,
      data: categoryList
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

// Get all surveys (admin endpoint)
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      surveys: surveys
    });
  } catch (error) {
    console.error('Error fetching all surveys:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch surveys'
    });
  }
});

// Get public survey list (no auth required)
router.get('/public/list', async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      where: {
        isActive: true,
        isPublished: true
      },
      attributes: ['id', 'title', 'description', 'category', 'pointsReward', 'estimatedTime'],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: surveys
    });
  } catch (error) {
    console.error('Error fetching public surveys:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch public surveys'
    });
  }
});

// Get specific survey by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const survey = await Survey.findOne({
      where: {
        id: req.params.id,
        isActive: true,
        isPublished: true
      }
    });

    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }

    // Check if user already completed this survey
    const existingResponse = await SurveyResponse.findOne({
      where: {
        userId: req.user.id,
        surveyId: survey.id,
        isCompleted: true
      }
    });

    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: 'Survey already completed'
      });
    }

    res.json({
      success: true,
      survey
    });
  } catch (error) {
    console.error('Get survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Submit survey response
router.post('/:id/submit', authenticateToken, [
  body('responses').isObject(),
  body('timeSpent').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    console.log('Survey submission request:', {
      surveyId: req.params.id,
      userId: req.user.id,
      body: req.body
    });
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const survey = await Survey.findOne({
      where: {
        id: req.params.id,
        isActive: true,
        isPublished: true
      }
    });

    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }

    // Check if user already completed this survey
    const existingResponse = await SurveyResponse.findOne({
      where: {
        userId: req.user.id,
        surveyId: survey.id,
        isCompleted: true
      }
    });

    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: 'Survey already completed'
      });
    }

    const { responses, timeSpent } = req.body;

    // Create survey response
    const surveyResponse = await SurveyResponse.create({
      userId: req.user.id,
      surveyId: survey.id,
      responses,
      timeSpent,
      isCompleted: true,
      pointsEarned: survey.pointsReward,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Update user points
    await req.user.increment('points', { by: survey.pointsReward });
    
    console.log('Survey submitted successfully:', {
      userId: req.user.id,
      surveyId: survey.id,
      pointsEarned: survey.pointsReward,
      responseId: surveyResponse.id
    });

    res.json({
      success: true,
      message: 'Survey submitted successfully',
      pointsEarned: survey.pointsReward,
      response: surveyResponse
    });
  } catch (error) {
    console.error('Submit survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
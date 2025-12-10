const express = require('express');
const { Op } = require('sequelize');
const { Reward, UserReward, User, RewardVoucher, sequelize } = require('../models');
const { authenticateAdmin, requirePermission, logAdminAction } = require('../middleware/adminAuth');
const router = express.Router();

// Get all rewards with filtering and pagination
router.get('/', authenticateAdmin, requirePermission('rewards', 'read'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      type = '',
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      minPoints = '',
      maxPoints = ''
    } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};
    
    // Search filter
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    
    // Type filter
    if (type) {
      whereClause.type = type;
    }
    
    // Status filter
    if (status) {
      if (status === 'active') {
        whereClause.isActive = true;
      } else if (status === 'inactive') {
        whereClause.isActive = false;
      }
    }
    
    // Points range filter
    if (minPoints || maxPoints) {
      whereClause.pointsCost = {};
      if (minPoints) {
        whereClause.pointsCost[Op.gte] = parseInt(minPoints);
      }
      if (maxPoints) {
        whereClause.pointsCost[Op.lte] = parseInt(maxPoints);
      }
    }
    
    const { count, rows: rewards } = await Reward.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: UserReward,
          attributes: ['id', 'status'],
          separate: true
        }
      ]
    });
    
    // Calculate additional stats for each reward
    const rewardsWithStats = rewards.map(reward => {
      const userRewards = reward.UserRewards || [];
      const totalRedemptions = userRewards.length;
      const pendingRedemptions = userRewards.filter(ur => ur.status === 'pending').length;
      const completedRedemptions = userRewards.filter(ur => ur.status === 'completed').length;
      const rejectedRedemptions = userRewards.filter(ur => ur.status === 'rejected').length;
      
      return {
        id: reward.id,
        name: reward.name,
        description: reward.description,
        type: reward.type,
        pointsCost: reward.pointsCost,
        value: reward.value,
        currency: reward.currency,
        isActive: reward.isActive,
        stockQuantity: reward.stockQuantity,
        maxRedemptionsPerUser: reward.maxRedemptionsPerUser,
        validFrom: reward.validFrom,
        validUntil: reward.validUntil,
        imageUrl: reward.imageUrl,
        termsAndConditions: reward.termsAndConditions,
        createdAt: reward.createdAt,
        updatedAt: reward.updatedAt,
        totalRedemptions,
        pendingRedemptions,
        completedRedemptions,
        rejectedRedemptions
      };
    });
    
    res.json({
      success: true,
      data: {
        rewards: rewardsWithStats,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get reward statistics
router.get('/stats', authenticateAdmin, requirePermission('rewards', 'read'), async (req, res) => {
  try {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const [totalRewards, activeRewards, inactiveRewards, newRewards, totalRedemptions, pendingRedemptions] = await Promise.all([
      Reward.count(),
      Reward.count({ where: { isActive: true } }),
      Reward.count({ where: { isActive: false } }),
      Reward.count({ where: { createdAt: { [Op.gte]: last30Days } } }),
      UserReward.count(),
      UserReward.count({ where: { status: 'pending' } })
    ]);
    
    // Get top rewards by redemption count
    const topRewards = await Reward.findAll({
      include: [
        {
          model: UserReward,
          attributes: ['id'],
          separate: true
        }
      ],
      limit: 5,
      order: [['createdAt', 'DESC']]
    });
    
    const topRewardsWithStats = topRewards.map(reward => ({
      id: reward.id,
      name: reward.name,
      type: reward.type,
      pointsCost: reward.pointsCost,
      redemptionCount: reward.UserRewards ? reward.UserRewards.length : 0
    })).sort((a, b) => b.redemptionCount - a.redemptionCount);
    
    res.json({
      success: true,
      data: {
        totalRewards,
        activeRewards,
        inactiveRewards,
        newRewards,
        totalRedemptions,
        pendingRedemptions,
        topRewards: topRewardsWithStats
      }
    });
  } catch (error) {
    console.error('Get reward stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all redemptions across rewards (placed before dynamic "/:id" to avoid route conflicts)
router.get('/redemptions', authenticateAdmin, requirePermission('rewards', 'read'), async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }

    const { count, rows: redemptions } = await UserReward.findAndCountAll({
      where: whereClause,
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Reward, attributes: ['id', 'name', 'type', 'pointsCost', 'brand'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        redemptions,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all redemptions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Live available voucher count for a reward (does not rely on Reward.stockQuantity)
router.get('/:id/stock/available', authenticateAdmin, requirePermission('rewards', 'read'), async (req, res) => {
  try {
    const { id } = req.params;
    const reward = await Reward.findByPk(id);
    if (!reward) {
      return res.status(404).json({ success: false, message: 'Reward not found' });
    }

    const totalVouchers = await RewardVoucher.count({ where: { rewardId: reward.id } });
    let availableCount = 0;
    let inventoryMode = 'stock';
    if (totalVouchers > 0) {
      availableCount = await RewardVoucher.count({ where: { rewardId: reward.id, status: 'available' } });
      inventoryMode = 'voucher';
    } else {
      // Fallback to stockQuantity when no vouchers are configured for this reward
      availableCount = Number(reward.stockQuantity || 0);
    }
    return res.json({
      success: true,
      data: {
        rewardId: reward.id,
        availableCount,
        stockQuantity: reward.stockQuantity,
        inventoryMode
      }
    });
  } catch (error) {
    console.error('Get available voucher stock error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Force resync Reward.stockQuantity to live available voucher count
router.post('/:id/stock/sync', authenticateAdmin, requirePermission('rewards', 'update'), logAdminAction('SYNC_REWARD_STOCK', 'reward'), async (req, res) => {
  try {
    const { id } = req.params;
    const reward = await Reward.findByPk(id);
    if (!reward) {
      return res.status(404).json({ success: false, message: 'Reward not found' });
    }

    const totalVouchers = await RewardVoucher.count({ where: { rewardId: reward.id } });
    let availableCount = null;
    let message = '';
    if (totalVouchers > 0) {
      availableCount = await RewardVoucher.count({ where: { rewardId: reward.id, status: 'available' } });
      await reward.update({ stockQuantity: availableCount });
      message = 'Stock synced to available voucher count';
    } else {
      // No vouchers configured; respect stock-only mode. Do not override stockQuantity.
      availableCount = Number(reward.stockQuantity || 0);
      message = 'No vouchers configured; using stock-based inventory (no changes applied)';
    }
    return res.json({
      success: true,
      message,
      data: {
        rewardId: reward.id,
        availableCount,
        stockQuantity: reward.stockQuantity,
        inventoryMode: totalVouchers > 0 ? 'voucher' : 'stock'
      }
    });
  } catch (error) {
    console.error('Sync reward stock error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get single reward details
router.get('/:id', authenticateAdmin, requirePermission('rewards', 'read'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const reward = await Reward.findByPk(id, {
      include: [
        {
          model: UserReward,
          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email']
          }],
          order: [['createdAt', 'DESC']],
          limit: 20
        }
      ]
    });
    
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        reward
      }
    });
  } catch (error) {
    console.error('Get reward details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Upload vouchers CSV and sync stock
router.post('/:id/vouchers/upload', authenticateAdmin, requirePermission('rewards', 'update'), logAdminAction('UPLOAD_REWARD_VOUCHERS', 'reward'), async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { csvData } = req.body;

    if (!csvData || typeof csvData !== 'string') {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'csvData string is required' });
    }

    const reward = await Reward.findByPk(id, { transaction });
    if (!reward) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Reward not found' });
    }

    if (!['gift_card', 'voucher'].includes(reward.type)) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Vouchers can only be uploaded for gift_card or voucher rewards' });
    }

    // Parse CSV: first column per line is code
    const lines = csvData.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'CSV contains no codes' });
    }

    // Detect header by checking if first cell contains non-code words
    let startIdx = 0;
    const firstCells = lines[0].split(',');
    const firstCell = (firstCells[0] || '').toLowerCase();
    if (['code', 'voucher', 'voucher_code', 'gift_card_code'].includes(firstCell)) {
      startIdx = 1;
    }

    const incomingCodesRaw = lines.slice(startIdx).map(l => l.split(',')[0].trim());
    const incomingCodes = Array.from(new Set(incomingCodesRaw.filter(c => c.length > 0)));

    if (incomingCodes.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'No valid voucher codes found in CSV' });
    }

    // Filter out globally existing codes to respect unique constraint
    const existing = await RewardVoucher.findAll({
      where: { code: { [Op.in]: incomingCodes } },
      attributes: ['code'],
      transaction
    });
    const existingSet = new Set(existing.map(e => e.code));
    const toCreate = incomingCodes.filter(c => !existingSet.has(c));
    const duplicates = incomingCodes.filter(c => existingSet.has(c));

    // Bulk create vouchers
    if (toCreate.length > 0) {
      await RewardVoucher.bulkCreate(
        toCreate.map(code => ({ code, rewardId: reward.id, status: 'available' })),
        { transaction, ignoreDuplicates: true }
      );
    }

    // Sync stock to count of available vouchers for this reward
    const availableCount = await RewardVoucher.count({ where: { rewardId: reward.id, status: 'available' }, transaction });
    await reward.update({ stockQuantity: availableCount }, { transaction });

    await transaction.commit();
    return res.status(201).json({
      success: true,
      message: 'Vouchers uploaded and stock synced',
      data: {
        uploadedCount: toCreate.length,
        duplicateCount: duplicates.length,
        duplicates,
        availableCount
      }
    });
  } catch (error) {
    console.error('Upload vouchers error:', error);
    await transaction.rollback();
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Create new reward
router.post('/', authenticateAdmin, requirePermission('rewards', 'create'), logAdminAction('CREATE_REWARD', 'reward'), async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      pointsCost,
      cashValue,
      value,
      currency = 'USD',
      stockQuantity,
      totalAvailable,
      maxRedemptionsPerUser,
      validFrom,
      validUntil,
      expiryDate,
      image,
      imageUrl,
      brand,
      provider,
      category,
      termsAndConditions,
      isActive = true,
      voucherCodes
    } = req.body;
    
    if (!name || !description || !type || !pointsCost) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, type, and points cost are required'
      });
    }
    
    // If reward type requires vouchers, enforce manual codes and transactional creation
    if (['gift_card', 'voucher'].includes(type)) {
      const expectedStock = stockQuantity ? parseInt(stockQuantity) : (totalAvailable ? parseInt(totalAvailable) : null);

      if (!expectedStock || expectedStock <= 0) {
        return res.status(400).json({
          success: false,
          message: 'For gift_card/voucher rewards, total stock is required and must be greater than 0'
        });
      }

      if (!Array.isArray(voucherCodes)) {
        return res.status(400).json({ success: false, message: 'voucherCodes array is required for gift_card/voucher rewards' });
      }

      // Normalize and dedupe codes
      const normalized = voucherCodes
        .map(c => (typeof c === 'string' ? c.trim() : ''))
        .filter(c => c && c.length > 0);
      const uniqueCodes = Array.from(new Set(normalized));

      if (uniqueCodes.length !== expectedStock) {
        return res.status(400).json({
          success: false,
          message: `Number of unique voucher codes (${uniqueCodes.length}) must equal stock (${expectedStock})`
        });
      }

      // Check for globally existing codes to enforce uniqueness
      const existing = await RewardVoucher.findAll({
        where: { code: { [Op.in]: uniqueCodes } },
        attributes: ['code']
      });
      const existingSet = new Set(existing.map(e => e.code));
      if (existingSet.size > 0) {
        return res.status(400).json({
          success: false,
          message: `Duplicate voucher codes found in system: ${Array.from(existingSet).join(', ')}`
        });
      }

      const transaction = await sequelize.transaction();
      try {
        const reward = await Reward.create({
          name,
          description,
          type,
          pointsCost: parseInt(pointsCost),
          cashValue: cashValue !== undefined ? parseFloat(cashValue) : (value ? parseFloat(value) : null),
          currency,
          stockQuantity: expectedStock,
          maxRedemptionsPerUser: maxRedemptionsPerUser ? parseInt(maxRedemptionsPerUser) : null,
          validFrom: validFrom ? new Date(validFrom) : null,
          validUntil: validUntil ? new Date(validUntil) : (expiryDate ? new Date(expiryDate) : null),
          image: image || imageUrl || null,
          termsAndConditions,
          isActive,
          brand: brand || provider || null,
          category: category || null
        }, { transaction });

        await RewardVoucher.bulkCreate(
          uniqueCodes.map(code => ({ code, rewardId: reward.id, status: 'available' })),
          { transaction }
        );

        // Sync stock to available voucher count just in case
        const availableCount = await RewardVoucher.count({ where: { rewardId: reward.id, status: 'available' }, transaction });
        await reward.update({ stockQuantity: availableCount }, { transaction });

        await transaction.commit();
        return res.status(201).json({
          success: true,
          message: 'Reward created with vouchers successfully',
          data: {
            reward,
            voucherCounts: { created: uniqueCodes.length }
          }
        });
      } catch (txErr) {
        await transaction.rollback();
        console.error('Create voucher reward error:', txErr);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }

    // Non-voucher rewards: regular create
    const reward = await Reward.create({
      name,
      description,
      type,
      pointsCost: parseInt(pointsCost),
      cashValue: cashValue !== undefined ? parseFloat(cashValue) : (value ? parseFloat(value) : null),
      currency,
      stockQuantity: stockQuantity ? parseInt(stockQuantity) : (totalAvailable ? parseInt(totalAvailable) : null),
      maxRedemptionsPerUser: maxRedemptionsPerUser ? parseInt(maxRedemptionsPerUser) : null,
      validFrom: validFrom ? new Date(validFrom) : null,
      validUntil: validUntil ? new Date(validUntil) : (expiryDate ? new Date(expiryDate) : null),
      image: image || imageUrl || null,
      termsAndConditions,
      isActive,
      brand: brand || provider || null,
      category: category || null
    });
    
    return res.status(201).json({
      success: true,
      message: 'Reward created successfully',
      data: {
        reward
      }
    });
  } catch (error) {
    console.error('Create reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update reward
router.put('/:id', authenticateAdmin, requirePermission('rewards', 'update'), logAdminAction('UPDATE_REWARD', 'reward'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      pointsCost,
      cashValue,
      value,
      currency,
      stockQuantity,
      totalAvailable,
      maxRedemptionsPerUser,
      validFrom,
      validUntil,
      expiryDate,
      image,
      imageUrl,
      termsAndConditions,
      isActive
    } = req.body;
    
    const reward = await Reward.findByPk(id);
    
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }
    
    // Store original data for audit log
    req.originalData = {
      name: reward.name,
      description: reward.description,
      type: reward.type,
      pointsCost: reward.pointsCost,
      value: reward.value,
      currency: reward.currency,
      stockQuantity: reward.stockQuantity,
      maxRedemptionsPerUser: reward.maxRedemptionsPerUser,
      validFrom: reward.validFrom,
      validUntil: reward.validUntil,
      imageUrl: reward.imageUrl,
      termsAndConditions: reward.termsAndConditions,
      isActive: reward.isActive
    };
    
    const updatedReward = await reward.update({
      name: name || reward.name,
      description: description || reward.description,
      type: type || reward.type,
      pointsCost: pointsCost !== undefined ? parseInt(pointsCost) : reward.pointsCost,
      cashValue: cashValue !== undefined ? parseFloat(cashValue) : (value !== undefined ? parseFloat(value) : reward.cashValue),
      currency: currency || reward.currency,
      stockQuantity: stockQuantity !== undefined ? parseInt(stockQuantity) : (totalAvailable !== undefined ? parseInt(totalAvailable) : reward.stockQuantity),
      maxRedemptionsPerUser: maxRedemptionsPerUser !== undefined ? parseInt(maxRedemptionsPerUser) : reward.maxRedemptionsPerUser,
      validFrom: validFrom ? new Date(validFrom) : reward.validFrom,
      validUntil: validUntil ? new Date(validUntil) : (expiryDate ? new Date(expiryDate) : reward.validUntil),
      image: image || imageUrl || reward.image,
      termsAndConditions: termsAndConditions || reward.termsAndConditions,
      isActive: isActive !== undefined ? isActive : reward.isActive
    });
    
    res.json({
      success: true,
      message: 'Reward updated successfully',
      data: {
        reward: updatedReward
      }
    });
  } catch (error) {
    console.error('Update reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Activate reward
router.post('/:id/activate', authenticateAdmin, requirePermission('rewards', 'update'), logAdminAction('ACTIVATE_REWARD', 'reward'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const reward = await Reward.findByPk(id);
    
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }
    
    if (reward.isActive === true) {
      return res.status(400).json({
        success: false,
        message: 'Reward is already active'
      });
    }
    
    req.originalData = { isActive: reward.isActive };
    
    await reward.update({ isActive: true });
    
    res.json({
      success: true,
      message: 'Reward activated successfully'
    });
  } catch (error) {
    console.error('Activate reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Deactivate reward
router.post('/:id/deactivate', authenticateAdmin, requirePermission('rewards', 'update'), logAdminAction('DEACTIVATE_REWARD', 'reward'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const reward = await Reward.findByPk(id);
    
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }
    
    req.originalData = { isActive: reward.isActive };
    
    await reward.update({ isActive: false });
    
    res.json({
      success: true,
      message: 'Reward deactivated successfully'
    });
  } catch (error) {
    console.error('Deactivate reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete reward
router.delete('/:id', authenticateAdmin, requirePermission('rewards', 'delete'), logAdminAction('DELETE_REWARD', 'reward'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const reward = await Reward.findByPk(id);
    
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }
    
    // Only block deletion if there are pending redemptions
    const pendingCount = await UserReward.count({ where: { rewardId: id, status: 'pending' } });
    if (pendingCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete reward with pending redemptions. Deactivate instead.'
      });
    }
    
    // Store original data for audit log
    req.originalData = reward.toJSON();
    
    await reward.destroy();
    
    res.json({
      success: true,
      message: 'Reward deleted successfully'
    });
  } catch (error) {
    console.error('Delete reward error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get reward redemptions
router.get('/:id/redemptions', authenticateAdmin, requirePermission('rewards', 'read'), async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10, status = '' } = req.query;
    const offset = (page - 1) * limit;
    
    const reward = await Reward.findByPk(id);
    
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }
    
    const whereClause = { rewardId: id };
    if (status) {
      whereClause.status = status;
    }
    
    const { count, rows: redemptions } = await UserReward.findAndCountAll({
      where: whereClause,
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
        reward: {
          id: reward.id,
          name: reward.name,
          description: reward.description,
          pointsCost: reward.pointsCost
        },
        redemptions,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get reward redemptions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});


// Update redemption status
router.put('/redemptions/:redemptionId', authenticateAdmin, requirePermission('rewards', 'update'), logAdminAction('UPDATE_REDEMPTION_STATUS', 'user_reward'), async (req, res) => {
  try {
    const { redemptionId } = req.params;
    const { status, notes, voucherCode, deliveryMethod } = req.body;
    
    const allowedInputStatuses = ['pending', 'completed', 'rejected', 'processing', 'delivered', 'expired', 'cancelled'];
    if (!allowedInputStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed: pending, processing, delivered, expired, cancelled, completed, rejected'
      });
    }
    
    const modelStatusMap = {
      pending: 'pending',
      processing: 'processing',
      delivered: 'delivered',
      expired: 'expired',
      cancelled: 'cancelled',
      completed: 'delivered',
      rejected: 'cancelled'
    };
    
    const redemption = await UserReward.findByPk(redemptionId, {
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
        // Include reward type to enable voucher auto-assignment for gift cards/vouchers
        { model: Reward, attributes: ['id', 'name', 'pointsCost', 'type'] }
      ]
    });
    
    if (!redemption) {
      return res.status(404).json({
        success: false,
        message: 'Redemption not found'
      });
    }
    
    req.originalData = {
      status: redemption.status,
      notes: redemption.notes
    };
    
    // Auto-assign voucher if delivering and no voucherCode provided
    let finalVoucherCode = voucherCode;
    const targetStatus = modelStatusMap[status];

    // If delivering and a voucherCode is provided, validate and consume it
    if ((targetStatus === 'delivered') && finalVoucherCode && ['gift_card', 'voucher'].includes(redemption.Reward.type)) {
      const voucher = await RewardVoucher.findOne({ where: { code: finalVoucherCode, rewardId: redemption.rewardId } });
      if (!voucher) {
        return res.status(400).json({ success: false, message: 'Voucher code not found for this reward' });
      }
      if (voucher.status !== 'available') {
        return res.status(400).json({ success: false, message: 'Voucher code is not available or already used' });
      }
      await voucher.update({ status: 'consumed', assignedToUserId: redemption.userId, assignedUserRewardId: redemption.id });

      // Sync stock after consuming a voucher
      const reward = await Reward.findByPk(redemption.rewardId);
      const availableCount = await RewardVoucher.count({ where: { rewardId: reward.id, status: 'available' } });
      await reward.update({ stockQuantity: availableCount });
    }

    if ((targetStatus === 'delivered') && !finalVoucherCode && ['gift_card', 'voucher'].includes(redemption.Reward.type)) {
      const availableVoucher = await RewardVoucher.findOne({
        where: { rewardId: redemption.rewardId, status: 'available' },
        order: [['id', 'ASC']]
      });

      if (!availableVoucher) {
        // Fallback: if no vouchers exist for this reward at all, use stockQuantity from Reward
        const reward = await Reward.findByPk(redemption.rewardId);
        const totalVouchersForReward = await RewardVoucher.count({ where: { rewardId: reward.id } });
        if (totalVouchersForReward === 0) {
          // Use stockQuantity as inventory source of truth
          const currentStock = Number(reward.stockQuantity || 0);
          if (currentStock <= 0) {
            return res.status(400).json({ success: false, message: 'No available stock for this reward' });
          }
          // Decrement stock and deliver without a voucher code
          await reward.update({ stockQuantity: currentStock - 1 });
          // Leave finalVoucherCode as null; delivery will proceed
        } else {
          // Vouchers are configured but none available — block delivery
          return res.status(400).json({ success: false, message: 'No available vouchers for this reward' });
        }
      } else {
        // Consume the available voucher
        finalVoucherCode = availableVoucher.code;
        await availableVoucher.update({ status: 'consumed', assignedToUserId: redemption.userId, assignedUserRewardId: redemption.id });

        // Sync stock after consuming a voucher
        const reward = await Reward.findByPk(redemption.rewardId);
        const availableCount = await RewardVoucher.count({ where: { rewardId: reward.id, status: 'available' } });
        await reward.update({ stockQuantity: availableCount });
      }
    }

    // If cancelling, ensure voucher pool and stock are consistent
    if (targetStatus === 'cancelled' && ['gift_card', 'voucher'].includes(redemption.Reward.type)) {
      if (redemption.voucherCode) {
        const voucher = await RewardVoucher.findOne({ where: { code: redemption.voucherCode, rewardId: redemption.rewardId } });
        if (voucher && voucher.status !== 'consumed') {
          await voucher.update({ status: 'available', assignedToUserId: null, assignedUserRewardId: null });
        }
      }
      // Always re-sync stock to available voucher count for voucher-type rewards
      const reward = await Reward.findByPk(redemption.rewardId);
      const availableCount = await RewardVoucher.count({ where: { rewardId: reward.id, status: 'available' } });
      await reward.update({ stockQuantity: availableCount });
    }

    await redemption.update({
      status: targetStatus,
      notes: notes || redemption.notes,
      voucherCode: finalVoucherCode !== undefined ? finalVoucherCode : redemption.voucherCode,
      deliveryMethod: deliveryMethod || redemption.deliveryMethod,
      deliveredAt: targetStatus === 'delivered' ? new Date() : redemption.deliveredAt,
      processedAt: targetStatus !== 'pending' ? new Date() : null
    });
    
    res.json({
      success: true,
      message: 'Redemption status updated successfully',
      data: {
        redemption
      }
    });
  } catch (error) {
    console.error('Update redemption status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Reassign a redemption to a different reward (e.g., connect to a reward that has vouchers)
router.put('/redemptions/:redemptionId/reassign', authenticateAdmin, requirePermission('rewards', 'update'), logAdminAction('REASSIGN_REDEMPTION_REWARD', 'user_reward'), async (req, res) => {
  try {
    const { redemptionId } = req.params;
    const { newRewardId } = req.body;

    if (!newRewardId || Number.isNaN(Number(newRewardId))) {
      return res.status(400).json({ success: false, message: 'newRewardId is required and must be a number' });
    }

    const redemption = await UserReward.findByPk(redemptionId, {
      include: [{ model: Reward, attributes: ['id', 'name', 'type', 'pointsCost'] }]
    });
    if (!redemption) {
      return res.status(404).json({ success: false, message: 'Redemption not found' });
    }

    // Only allow reassigning if not delivered yet
    if (redemption.status === 'delivered') {
      return res.status(400).json({ success: false, message: 'Cannot reassign a delivered redemption' });
    }

    const newReward = await Reward.findByPk(newRewardId);
    if (!newReward) {
      return res.status(404).json({ success: false, message: 'New reward not found' });
    }

    // Optional: ensure type compatibility for voucher/gift_card workflows
    const voucherTypes = ['gift_card', 'voucher'];
    if (voucherTypes.includes(redemption.Reward.type) && !voucherTypes.includes(newReward.type)) {
      return res.status(400).json({ success: false, message: 'New reward must be a gift_card or voucher type' });
    }

    // Perform reassignment
    const oldRewardId = redemption.rewardId;
    await redemption.update({ rewardId: newReward.id, voucherCode: null });

    // Return refreshed payload
    const refreshed = await UserReward.findByPk(redemptionId, {
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Reward, attributes: ['id', 'name', 'pointsCost', 'type', 'brand'] }
      ]
    });

    return res.json({
      success: true,
      message: 'Redemption reward reassigned successfully',
      data: { redemption: refreshed, oldRewardId, newRewardId: newReward.id }
    });
  } catch (error) {
    console.error('Reassign redemption reward error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Export rewards
router.get('/export/csv', authenticateAdmin, requirePermission('rewards', 'read'), logAdminAction('EXPORT_REWARDS', 'reward'), async (req, res) => {
  try {
    const rewards = await Reward.findAll({
      include: [
        {
          model: UserReward,
          attributes: ['id', 'status'],
          separate: true
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    const csvHeader = 'ID,Name,Description,Type,Points Cost,Cash Value,Currency,Stock Quantity,Max Redemptions Per User,Active,Total Redemptions,Created At\n';
    const csvData = rewards.map(reward => {
      const totalRedemptions = reward.UserRewards ? reward.UserRewards.length : 0;
      return [
        reward.id,
        `"${reward.name.replace(/"/g, '""')}"`,
        `"${(reward.description || '').replace(/"/g, '""')}"`,
        reward.type,
        reward.pointsCost,
        reward.cashValue || '',
        reward.currency,
        reward.stockQuantity || '',
        reward.maxRedemptionsPerUser || '',
        reward.isActive ? 'active' : 'inactive',
        totalRedemptions,
        reward.createdAt
      ].join(',');
    }).join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=rewards.csv');
    res.send(csvHeader + csvData);
  } catch (error) {
    console.error('Export rewards error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;

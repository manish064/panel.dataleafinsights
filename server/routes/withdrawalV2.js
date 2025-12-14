const express = require('express');
const { User, turso } = require('../models');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// JWT authentication middleware (same as in users.js)
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Missing or invalid authorization header' });
        }

        const token = authHeader.split(' ')[1];
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Withdrawal request endpoint - uses RAW SQL for Turso compatibility
router.post('/withdrawal-request', authenticateToken, [
    body('amount')
        .isInt({ min: 100 })
        .withMessage('Withdrawal amount must be at least 100 points')
], async (req, res) => {
    const requestId = `WD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    console.log(`💰 WITHDRAWAL V2 API [${requestId}]: POST /api/users/withdrawal-request - Starting request`);
    console.log(`💰 WITHDRAWAL V2 API [${requestId}]: User ID: ${req.user.id}, Email: ${req.user.email}`);

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`💰 WITHDRAWAL V2 API [${requestId}]: Validation failed:`, errors.array());
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array(),
                requestId
            });
        }

        const { amount } = req.body;
        console.log(`💰 WITHDRAWAL V2 API [${requestId}]: Withdrawal amount: ${amount}`);

        // Fetch fresh user data
        const user = await User.findByPk(req.user.id);
        if (!user) {
            console.log(`💰 WITHDRAWAL V2 API [${requestId}]: User not found`);
            return res.status(404).json({
                success: false,
                message: 'User not found',
                requestId
            });
        }

        // Check if user has complete bank details
        if (!user.accountHolderName || !user.accountNumber || !user.ifscCode) {
            console.log(`💰 WITHDRAWAL V2 API [${requestId}]: Incomplete bank details`);
            return res.status(400).json({
                success: false,
                message: 'Please complete your bank details before making a withdrawal request',
                requestId
            });
        }

        // Check if user has sufficient points
        if (user.points < amount) {
            console.log(`💰 WITHDRAWAL V2 API [${requestId}]: Insufficient points. User has: ${user.points}, Requested: ${amount}`);
            return res.status(400).json({
                success: false,
                message: `Insufficient points. You have ${user.points} points available`,
                requestId
            });
        }

        // Create bank details snapshot
        const bankDetailsSnapshot = {
            accountHolderName: user.accountHolderName,
            accountNumber: user.accountNumber,
            ifscCode: user.ifscCode,
            capturedAt: new Date().toISOString()
        };

        console.log(`💰 WITHDRAWAL V2 API [${requestId}]: Creating withdrawal request with RAW SQL...`);

        // Use RAW SQL via Turso client for guaranteed compatibility
        const bankDetailsJson = JSON.stringify(bankDetailsSnapshot).replace(/'/g, "''");
        const requestDate = new Date().toISOString();
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();

        const insertSql = `INSERT INTO "WithdrawalRequests" 
      ("userId", "amount", "status", "bankDetails", "requestDate", "createdAt", "updatedAt")
      VALUES (${user.id}, ${amount}, 'pending', '${bankDetailsJson}', '${requestDate}', '${createdAt}', '${updatedAt}')`;

        console.log(`💰 WITHDRAWAL V2 API [${requestId}]: Executing INSERT via Turso...`);
        const result = await turso.execute(insertSql);

        const withdrawalId = result.lastInsertRowid ? Number(result.lastInsertRowid) : 0;
        console.log(`💰 WITHDRAWAL V2 API [${requestId}]: INSERT successful - ID: ${withdrawalId}`);

        // Deduct points from user account using raw SQL for consistency
        console.log(`💰 WITHDRAWAL V2 API [${requestId}]: Deducting ${amount} points from user account...`);
        const updateSql = `UPDATE "Users" SET "points" = "points" - ${amount}, "updatedAt" = '${updatedAt}' WHERE "id" = ${user.id}`;
        await turso.execute(updateSql);

        console.log(`💰 WITHDRAWAL V2 API [${requestId}]: Withdrawal request created successfully. ID: ${withdrawalId}`);

        const responseData = {
            success: true,
            message: 'Withdrawal request submitted successfully',
            withdrawalRequest: {
                id: withdrawalId,
                amount: amount,
                status: 'pending',
                requestDate: requestDate
            },
            remainingPoints: user.points - amount,
            requestId,
            timestamp: new Date().toISOString()
        };

        console.log(`💰 WITHDRAWAL V2 API [${requestId}]: Request completed successfully`);
        res.json(responseData);

    } catch (error) {
        console.error(`💰 WITHDRAWAL V2 API [${requestId}]: Request failed:`, {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            requestId,
            timestamp: new Date().toISOString(),
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;

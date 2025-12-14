const express = require('express');
const { User, turso } = require('../models');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// JWT authentication middleware
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
    console.log(`WITHDRAWAL V2 [${requestId}]: POST /users/withdrawal-request - Starting`);
    console.log(`WITHDRAWAL V2 [${requestId}]: User ID: ${req.user.id}`);

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(`WITHDRAWAL V2 [${requestId}]: Validation failed`);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array(),
                requestId
            });
        }

        const { amount } = req.body;
        console.log(`WITHDRAWAL V2 [${requestId}]: Amount: ${amount}`);

        // Fetch fresh user data
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found', requestId });
        }

        // Check bank details
        if (!user.accountHolderName || !user.accountNumber || !user.ifscCode) {
            return res.status(400).json({
                success: false,
                message: 'Please complete your bank details before making a withdrawal request',
                requestId
            });
        }

        // Check points
        if (user.points < amount) {
            return res.status(400).json({
                success: false,
                message: `Insufficient points. You have ${user.points} points available`,
                requestId
            });
        }

        // Bank details snapshot
        const bankDetails = {
            accountHolderName: user.accountHolderName,
            accountNumber: user.accountNumber,
            ifscCode: user.ifscCode,
            capturedAt: new Date().toISOString()
        };

        console.log(`WITHDRAWAL V2 [${requestId}]: Creating withdrawal with RAW SQL...`);

        // Single-line SQL for Turso
        const bankJson = JSON.stringify(bankDetails).replace(/'/g, "''");
        const now = new Date().toISOString();

        const sql = `INSERT INTO WithdrawalRequests (userId, amount, status, bankDetails, requestDate, createdAt, updatedAt) VALUES (${user.id}, ${amount}, 'pending', '${bankJson}', '${now}', '${now}', '${now}')`;

        console.log(`WITHDRAWAL V2 [${requestId}]: Executing SQL...`);
        console.log(`WITHDRAWAL V2 [${requestId}]: SQL preview: INSERT INTO WithdrawalRequests...`);

        const result = await turso.execute(sql);

        const withdrawalId = result.lastInsertRowid ? Number(result.lastInsertRowid) : 0;
        console.log(`WITHDRAWAL V2 [${requestId}]: INSERT OK - ID: ${withdrawalId}`);

        // Deduct points
        console.log(`WITHDRAWAL V2 [${requestId}]: Deducting ${amount} points...`);
        const updateSql = `UPDATE Users SET points = points - ${amount}, updatedAt = '${now}' WHERE id = ${user.id}`;
        await turso.execute(updateSql);

        console.log(`WITHDRAWAL V2 [${requestId}]: SUCCESS`);

        res.json({
            success: true,
            message: 'Withdrawal request submitted successfully',
            withdrawalRequest: {
                id: withdrawalId,
                amount: amount,
                status: 'pending',
                requestDate: now
            },
            remainingPoints: user.points - amount,
            requestId,
            timestamp: now
        });

    } catch (error) {
        console.error(`WITHDRAWAL V2 [${requestId}]: FAILED:`, error.message);
        console.error(`WITHDRAWAL V2 [${requestId}]: Error name:`, error.name);
        console.error(`WITHDRAWAL V2 [${requestId}]: Error code:`, error.code);
        console.error(`WITHDRAWAL V2 [${requestId}]: Stack:`, error.stack);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            requestId,
            timestamp: new Date().toISOString(),
            debug: error.message
        });
    }
});

module.exports = router;

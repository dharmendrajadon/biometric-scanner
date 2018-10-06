"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
/**
 * Auth Schema Validations
 */
exports.Validations = {
    // For Device Verify
    deviceVerify: [
        check_1.check('token').trim().custom((token) => {
            if (token === undefined || token === null || token.length !== 63) {
                throw new Error('Invalid Token');
            }
            return true;
        }),
        check_1.check('brandCode').trim().isLength({ min: 1, max: 30 }).withMessage('Invalid Device Brand'),
        check_1.check('serialNumber').trim().isLength({ min: 6, max: 30 }).withMessage('Invalid Serial Number'),
    ]
};
//# sourceMappingURL=Auth.js.map
import { check } from 'express-validator/check';

/**
 * Auth Schema Validations
 */
export const Validations = {
    // For Device Verify
    deviceVerify: [
        check('token').trim().custom((token: string) => {
            if (token === undefined || token === null || token.length !== 63) {
                throw new Error('Invalid Token');
            }
            return true;
        }),
        check('brandCode').trim().isLength({ min: 1, max: 30 }).withMessage('Invalid Device Brand'),
        check('serialNumber').trim().isLength({ min: 6, max: 30 }).withMessage('Invalid Serial Number'),
    ]
};

import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';

/**
 * POST /device-verify
 * Device Verify using auth token and serial number
 * @param req Request Payload
 * @param res Response Message
 * @param next Next Request Handler
 */
export const postDeviceVerify = async (req: Request, res: Response, next: NextFunction) => {

    // Check for Validation Errors
    const validationErrorList = validationResult(req);
    if (!validationErrorList.isEmpty()) {
        return res.status(422).json({ errors: validationErrorList.array() });
    }

    const token: string = req.body.token;
    const brandCode: string = req.body.brandCode;
    const serialNumber: string = req.body.serialNumber;

    try {

        // Check if token exists in vendor collection
        return admin.firestore().collection('/vendors')
            .where('token', '==', token)
            .get()
            .then((vendorSnapshot: FirebaseFirestore.QuerySnapshot) => {

                // If vendor token registered
                if (vendorSnapshot.size === 1) {

                    // Extract Vendor Name
                    const vendorId = vendorSnapshot.docs[0].id;

                    // Check if device serialNumber is registered
                    return admin.firestore().collection('/devices')
                        .where('brandCode', '==', brandCode)
                        .where('serialNumber', '==', serialNumber)
                        .where('isActive', '==', true)
                        .get()
                        .then((deviceSnapshot: FirebaseFirestore.QuerySnapshot) => {

                            // If device is registered
                            if (deviceSnapshot.size === 1) {

                                // Create Device Logs in deviceLogs collection

                                return admin.firestore().collection('/deviceLogs')
                                    .add({
                                        createdAt: admin.firestore.Timestamp.now(),
                                        deviceId: deviceSnapshot.docs[0].id,
                                        ipAddress: '',
                                        vendorId
                                    }).then(() => {

                                        // If device log created successfully
                                        // Return Device Registered Response
                                        return res.send({ message: 'Device Verification Successful!' });

                                    }).catch(() => {

                                        // If log error occurred
                                        return res.status(400).json({ message: 'Something Went Wrong!' });
                                    });

                            } else {

                                // Device not registered
                                return res.status(404).json({ message: 'Device Not Registered' });
                            }
                        }).catch(() => {
                            return res.status(400).json({ message: 'Un-Identified Device' });
                        });

                } else {

                    // Invalid Vendor Token
                    return res.status(400).json({ message: 'Invalid Token' });
                }
            }).catch(() => {
                return res.status(400).json({ message: 'Un-Identified Vendor' });
            });

    } catch (error) {
        return res.status(400).json({ message: 'Invalid Request Payload' });
    }
};

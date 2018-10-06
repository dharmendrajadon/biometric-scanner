"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AuthController = require("../controllers/Auth/Auth");
const Auth_1 = require("../schemas/Auth/Auth");
// Create router instance
const router = express.Router();
// Auth Device Verify
router.post('/device-verify', Auth_1.Validations.deviceVerify, AuthController.postDeviceVerify);
exports.default = router;
//# sourceMappingURL=Auth.js.map
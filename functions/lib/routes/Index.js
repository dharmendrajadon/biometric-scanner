"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Auth_1 = require("./Auth");
// Create router instance
const router = express.Router();
// Publish Auth Routes
router.use('/auth', Auth_1.default);
exports.default = router;
//# sourceMappingURL=Index.js.map
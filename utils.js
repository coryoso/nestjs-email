"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.many = void 0;
const many = (item) => Array.isArray(item) ? item : [item];
exports.many = many;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
//# sourceMappingURL=utils.js.map
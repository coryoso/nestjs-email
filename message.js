"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMessage = void 0;
const emailjs_1 = require("emailjs");
const utils_1 = require("./utils");
class EmailMessage extends emailjs_1.Message {
    constructor({ templateName, html, ...headers }) {
        super(headers);
        this.templateName = templateName;
        this.to = headers.to ? (0, utils_1.many)(headers.to) : [];
        this.html = html;
    }
}
exports.EmailMessage = EmailMessage;
//# sourceMappingURL=message.js.map
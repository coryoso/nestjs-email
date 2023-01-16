"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = exports.AttachmentCollector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AttachmentContext = (0, react_1.createContext)([]);
class AttachmentCollector {
    collect(children) {
        this.context = [];
        return ((0, jsx_runtime_1.jsx)(AttachmentContext.Provider, { value: this.context, children: children }));
    }
    get attachments() {
        var _a;
        return (_a = this.context) !== null && _a !== void 0 ? _a : [];
    }
}
exports.AttachmentCollector = AttachmentCollector;
const Attachment = (props) => {
    const context = (0, react_1.useContext)(AttachmentContext);
    context.push(props);
    return null;
};
exports.Attachment = Attachment;
//# sourceMappingURL=attachment.js.map
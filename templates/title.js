"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = exports.SubjectCollector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const mjml_react_1 = require("@faire/mjml-react");
const react_1 = require("react");
const SubjectContext = (0, react_1.createContext)({});
class SubjectCollector {
    collect(children) {
        this.context = {};
        return ((0, jsx_runtime_1.jsx)(SubjectContext.Provider, { value: this.context, children: children }));
    }
    get subject() {
        var _a;
        if (!((_a = this.context) === null || _a === void 0 ? void 0 : _a.subject)) {
            throw new Error('<Title> must be used to provide a subject for the email');
        }
        return this.context.subject;
    }
}
exports.SubjectCollector = SubjectCollector;
/**
 * Wrap mjml title to also make the title the email's subject
 */
const Title = ({ children }) => {
    const context = (0, react_1.useContext)(SubjectContext);
    context.subject = children;
    return (0, jsx_runtime_1.jsx)(mjml_react_1.MjmlTitle, { children: children });
};
exports.Title = Title;
//# sourceMappingURL=title.js.map
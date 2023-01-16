"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderForText = exports.InText = exports.HideInText = exports.inText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const RenderForTextContext = (0, react_1.createContext)(false);
/**
 * Hook for whether we are rendering for text.
 */
const inText = () => (0, react_1.useContext)(RenderForTextContext);
exports.inText = inText;
/**
 * Hide the children of this element when converting to text.
 */
const HideInText = ({ children }) => (0, exports.inText)() ? null : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
exports.HideInText = HideInText;
/**
 * Only show the children of this element when converting to text.
 */
const InText = ({ children }) => (0, exports.inText)() ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }) : null;
exports.InText = InText;
const RenderForText = ({ value, children, }) => ((0, jsx_runtime_1.jsx)(RenderForTextContext.Provider, { value: value !== null && value !== void 0 ? value : true, children: children }));
exports.RenderForText = RenderForText;
//# sourceMappingURL=text-rendering.js.map
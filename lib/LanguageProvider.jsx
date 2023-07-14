"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageProvider = exports.useLanguageProvider = exports.LanguageContext = void 0;
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const LanguageContext = (0, react_1.createContext)({});
exports.LanguageContext = LanguageContext;
const useLanguageProvider = () => (0, react_1.useContext)(LanguageContext);
exports.useLanguageProvider = useLanguageProvider;
/**
 * @example
 * i18next.use(initReactI18next).init({
 *   fallbackLng: Object.keys(resources),
 *   debug: true,
 *   ns: Object.keys(resources[Object.keys(resources)[0]]),
 *   defaultNS: "common",
 *   resources: resources
 * });
 * @example
 * <LanguageProvider namespaces={Object.keys(Object.keys(resources)[0])}>
 *    <App />
 * </LanguageProvider>

 */
const LanguageProvider = ({ namespaces, children }) => {
    const { t, i18n } = (0, react_i18next_1.useTranslation)(namespaces);
    const contextValue = (0, react_1.useMemo)(() => ({
        t,
        i18n,
        changeLanguage: i18n.changeLanguage,
        currentLanguage: i18n.language
    }), [t, i18n]);
    return (<LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>);
};
exports.LanguageProvider = LanguageProvider;

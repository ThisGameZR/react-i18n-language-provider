"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageProvider = exports.useLanguageProvider = exports.LanguageContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
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
    return ((0, jsx_runtime_1.jsx)(LanguageContext.Provider, { value: contextValue, children: children }));
};
exports.LanguageProvider = LanguageProvider;

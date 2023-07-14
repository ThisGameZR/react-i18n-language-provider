"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Autocomplete_1 = __importDefault(require("@mui/material/Autocomplete"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const LanguageProvider_1 = require("./LanguageProvider");
function LanguageSelector() {
    const { t, i18n } = (0, LanguageProvider_1.useLanguageProvider)();
    const [selectLanguage, setSelectLanguage] = react_1.default.useState(i18n.languages[0]);
    react_1.default.useEffect(() => {
        i18n.changeLanguage(selectLanguage);
    }, [selectLanguage]);
    return ((0, jsx_runtime_1.jsx)(Autocomplete_1.default, { disablePortal: true, disableClearable: true, size: "small", value: selectLanguage, onChange: (_, v) => setSelectLanguage(v), 
        //@ts-ignore
        options: i18n?.languages ?? [], sx: { width: 300 }, renderInput: (params) => (0, jsx_runtime_1.jsx)(TextField_1.default, { ...params, label: t("language-editor:language-selector-label") }) }));
}
exports.default = LanguageSelector;

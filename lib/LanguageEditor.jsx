"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const LanguageProvider_1 = require("./LanguageProvider");
const material_1 = require("@mui/material");
const EditableTable_1 = __importDefault(require("./EditableTable"));
/**
 *
 *
 * @var language-editor:select-language-label
 * @var language-editor:select-namespace-label
 * @var language-editor:editor-table-header
 * @var language-editor:editor-table-translation-key-column-title
 * @var language-editor:editor-table-translation-value-column-title
 * @var language-editor:editor-table-selected-items-word
 * @var language-editor:editor-table-label-rows-per-page
 * @var language-editor:editor-table-delete-dialog-content
 * @var language-editor:editor-table-delete-dialog-title
 * @var language-editor:editor-table-delete-dialog-cancel-button
 * @var language-editor:editor-table-delete-dialog-confirm-button
 *
 * @example
 * onSave={(language, namespace, key, value) => console.log(language, namespace, key,value)}
 *
 * @example
 * onDelete={(language, namespace, keys) => console.log(language, namespace, keys)}
 */
function LanguageEditor({ defaultRowPerPage = 5, onSave, onDelete }) {
    const { t, i18n } = (0, LanguageProvider_1.useLanguageProvider)();
    const allLanguagesData = i18n?.languages
        .map((lang) => {
        return { [lang]: i18n.getDataByLanguage(lang) };
    })
        .reduce((acc, obj) => {
        //@ts-ignore
        const key = Object.keys(obj)[0];
        //@ts-ignore
        acc[key] = obj[key];
        return acc;
    }, {});
    const [selectLanguage, setSelectLanguage] = (0, react_1.useState)(i18n.languages[0]);
    const [selectNamespace, setSelectNamespace] = (0, react_1.useState)("");
    const [tableData, setTableData] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const newTableData = Object.entries(allLanguagesData?.[selectLanguage]?.[selectNamespace] || [])?.map((obj) => {
            return { translationKey: obj[0], translationValue: obj[1] };
        }) || [];
        setTableData(newTableData);
    }, [selectLanguage, selectNamespace]);
    return (<material_1.Box>
      <material_1.Stack direction="row" gap={2} sx={{ py: 2, px: 1 }}>
        <material_1.Autocomplete disablePortal options={i18n?.languages ?? []} value={selectLanguage} disableClearable size="small" onChange={(_, v) => setSelectLanguage(v)} sx={{ width: 300 }} renderInput={(params) => <material_1.TextField {...params} label={t("language-editor:select-language-label")}/>}/>
        <material_1.Autocomplete disablePortal disableClearable size="small" value={selectNamespace} onChange={(_, v) => setSelectNamespace(v)} 
    //@ts-ignore
    options={Object.keys(i18n.getDataByLanguage(selectLanguage))} sx={{ width: 300 }} renderInput={(params) => <material_1.TextField {...params} label={t("language-editor:select-namespace-label")}/>}/>
      </material_1.Stack>
      <EditableTable_1.default defaultRowPerPage={defaultRowPerPage} language={selectLanguage} namespace={selectNamespace} data={tableData} onSave={(key, value) => onSave(selectLanguage, selectNamespace, key, value)} onDelete={(keys) => onDelete(selectLanguage, selectNamespace, keys)}/>
    </material_1.Box>);
}
exports.default = LanguageEditor;

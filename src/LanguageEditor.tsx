import React, { useState, useEffect } from "react";
import { useLanguageProvider } from "./LanguageProvider";
import { Box, Autocomplete, TextField, Stack } from "@mui/material";
import EditableTable from "./EditableTable";

export interface LanguageEditorProps {
  defaultRowPerPage?: 5 | 10 | 15 | 20 | 25 | 50 | 100;
  onSave: (language: string, namespace: string, key: string, value: string) => void;
  onDelete: (language: string, namespace: string, keys: string[]) => void;
}
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
export default function LanguageEditor({ defaultRowPerPage = 5, onSave, onDelete }: LanguageEditorProps) {
  const { t, i18n } = useLanguageProvider();

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

  const [selectLanguage, setSelectLanguage] = useState<string>(i18n!.languages[0]);
  const [selectNamespace, setSelectNamespace] = useState<string>("");
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    const newTableData =
      Object.entries(allLanguagesData?.[selectLanguage]?.[selectNamespace] || [])?.map((obj) => {
        return { translationKey: obj[0], translationValue: obj[1] };
      }) || [];
    setTableData(newTableData);
  }, [selectLanguage, selectNamespace]);

  return (
    <Box>
      <Stack direction="row" gap={2} sx={{ py: 2, px: 1 }}>
        <Autocomplete
          disablePortal
          options={i18n?.languages ?? []}
          value={selectLanguage}
          disableClearable
          size="small"
          onChange={(_, v) => setSelectLanguage(v!)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={t!("language-editor:select-language-label")} />}
        />
        <Autocomplete
          disablePortal
          disableClearable
          size="small"
          value={selectNamespace}
          onChange={(_, v) => setSelectNamespace(v!)}
          //@ts-ignore
          options={Object.keys(i18n!.getDataByLanguage(selectLanguage))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={t!("language-editor:select-namespace-label")} />}
        />
      </Stack>
      <EditableTable
        defaultRowPerPage={defaultRowPerPage}
        language={selectLanguage}
        namespace={selectNamespace}
        data={tableData}
        onSave={(key, value) => onSave(selectLanguage, selectNamespace, key, value)}
        onDelete={(keys) => onDelete(selectLanguage, selectNamespace, keys)}
      />
    </Box>
  );
}

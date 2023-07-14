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
export default function LanguageEditor({ defaultRowPerPage, onSave, onDelete }: LanguageEditorProps): import("react/jsx-runtime").JSX.Element;

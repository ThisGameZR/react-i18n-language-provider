import * as React from "react";
export type Translation = "translationKey" | "translationValue";
export interface EditableTableProps {
    defaultRowPerPage: number;
    language: string;
    namespace: string;
    data: any;
    onSave: (key: string, value: string) => void;
    onDelete: (keys: string[]) => void;
}
export default function EditableTable({ defaultRowPerPage, language, namespace, data, onSave, onDelete }: EditableTableProps): React.JSX.Element;

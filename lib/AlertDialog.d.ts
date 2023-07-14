import * as React from "react";
export default function AlertDialog({ open, setOpen, title, content, cancelText, confirmText, onConfirm, }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    content: string;
    cancelText: string;
    confirmText: string;
    onConfirm: () => void;
}): React.JSX.Element;

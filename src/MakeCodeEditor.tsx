import { useFetch } from "./Hooks";
import React from "react";
import BrowserSource from "./BrowserSource";

export default function MakeCodeEditor(props: { id: string; editor: string; multi?: boolean; }) {
    const {editor, id, multi } = props;
    const [editorsLoading, editors] = useFetch("https://makecode.com/editors.json")
    if (editorsLoading)
        return null;

    const editorConfig = editors[editor]
    let url = `${editorConfig.url}?editorLayout=ide&nosandbox=1`;
    if (multi)
        url += `&nestededitorsim=1`;
    return <BrowserSource id={id} url={url} />    
}
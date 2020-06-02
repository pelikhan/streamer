import React from "react";
import BrowserSource from "./BrowserSource";
import { useFetch } from "react-async";
import { EditorConfig } from "./App";

export default function MakeCodeEditor(props: { id: string; editor: string; multi?: boolean; }) {
    const { editor, id, multi } = props;
    const { data, error, isPending, run } = useFetch("https://makecode.com/editors.json", {
        headers: { accept: "application/json" },
      })
    if (!data || isPending)
        return null;

    const editorConfigs = data as { [index: string]: EditorConfig; }
    const editorConfig = editorConfigs[editor];
    if (!editorConfig)
        return null;

    let url = `${editorConfig.url}?editorLayout=ide&nosandbox=1`;
    if (multi)
        url += `&nestededitorsim=1`;
    return <BrowserSource id={id} url={url} />
}
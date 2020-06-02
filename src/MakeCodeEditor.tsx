import React, { Dispatch, FormEvent } from "react";
import BrowserSource from "./BrowserSource";
import { useFetch } from "react-async";
import {
  EditorConfig,
  AppAction,
  AppActionType,
  SetEditorAppAction,
} from "./App";
import { Dropdown, IDropdownOption } from "@fluentui/react";

function useEditorConfigs() {
  const { data, error, isPending } = useFetch(
    "https://makecode.com/editors.json",
    {
      headers: { accept: "application/json" },
    }
  );
  return {
    editorConfigs: data as { [index: string]: EditorConfig },
    error,
    isPending,
  };
}

export function SelectMakeCodeEditor(props: {
  editor: string;
  dispatch: Dispatch<AppAction>;
}) {
  const { editor, dispatch } = props;
  const { editorConfigs } = useEditorConfigs();

  const options = [];
  if (editorConfigs)
    for (const id in editorConfigs)
      options.push({ key: id, text: editorConfigs[id].name });
  const onChange = (
    select: FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ) => {
    if (item?.key)
      dispatch({
        type: AppActionType.SET_EDITOR,
        editor: item?.key,
      } as SetEditorAppAction);
  };
  return (
    <Dropdown
      label={"Choose your editor"}
      options={options}
      selectedKey={editor}
      onChange={onChange}
    />
  );
}

export default function MakeCodeEditor(props: {
  id: string;
  editor: string;
  multi?: boolean;
}) {
  const { editor, id, multi } = props;
  const { editorConfigs, error, isPending } = useEditorConfigs();
  if (!editorConfigs || isPending) return null;

  const editorConfig = editorConfigs[editor];
  if (!editorConfig) return null;

  let url = `${editorConfig.url}?editorLayout=ide&nosandbox=1`;
  if (multi) url += `&nestededitorsim=1`;
  return <BrowserSource id={id} url={url} dataKind={"makecode"} />;
}

export function initMakeCode() {
  window.onmessage = function (msg: MessageEvent) {
    const data = msg.data;
    const source = msg.source;
    if (!!data.broadcast) {
      data.outer = true;
      const frames = document.querySelectorAll("iframe[data-kind = makecode]");
      for (let i = 0; i < frames.length; ++i) {
        const ifrm = frames[i] as HTMLIFrameElement;
        if (ifrm.contentWindow && ifrm.contentWindow !== source)
          ifrm.contentWindow.postMessage(data, "*");
      }
    }
  };
}

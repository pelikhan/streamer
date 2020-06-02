import React, { useReducer, useEffect, Dispatch } from "react";
import "./index.css";
import "./theme.css";
import Scene from "./Scene";
import VideoInputSource, { listCameras } from "./VideoInputSource";
import Source from "./Source";
import Toolbox from "./Toolbox";
import Settings from "./Settings";
import { useLocalStorage } from "./Hooks";
import MakeCodeEditor, { initMakeCode } from "./MakeCodeEditor";
import Chat from "./Chat";
import Paint from "./Paint";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();
initMakeCode();

export interface AppState {
  editor: string;
  mixer?: string;
  twitch?: string;
  emojis?: string;
  scene: string;
  faceCamId?: string;
  hardwareCamId?: string;
  multi?: boolean;
  hardware?: boolean;
  settings?: boolean;
  chat?: boolean;
  paint?: boolean;
  paintTool?: string;
  emoji?: string;
}

export interface EditorConfig {
  name: string;
  url: string;
}

export enum AppActionType {
  "SET_SCENE",
  "SET_FACECAM_ID",
  "SET_HARDWARECAM_ID",
  "SET_HARDWARECAM",
  "SET_MULTI",
  "SET_SETTINGS",
  "SET_MIXER",
  "SET_TWITCH",
  "SET_EMOJIS",
  "SET_EDITOR",
  "SET_CHAT",
  "SET_PAINT",
  "SET_PAINT_TOOL",
}

export interface AppAction {
  type: AppActionType;
}

export interface SetEditorAppAction extends AppAction {
  type: AppActionType.SET_EDITOR;
  editor: string;
}

export interface SetSceneAppAction extends AppAction {
  type: AppActionType.SET_SCENE;
  scene: string;
}

export interface SetTextAppAction extends AppAction {
  type: AppActionType.SET_TWITCH | AppActionType.SET_MULTI;
  text: string;
}

export interface SetCameraDeviceIdAppAction extends AppAction {
  type: AppActionType.SET_FACECAM_ID | AppActionType.SET_HARDWARECAM_ID;
  deviceId: string;
}

export interface SetFlagAppAction extends AppAction {
  type:
    | AppActionType.SET_MULTI
    | AppActionType.SET_HARDWARECAM
    | AppActionType.SET_SETTINGS
    | AppActionType.SET_EMOJIS
    | AppActionType.SET_CHAT
    | AppActionType.SET_PAINT;
  on: boolean;
}

export interface SetPaintToolAppAction extends AppAction {
  type: AppActionType.SET_PAINT_TOOL;
  tool: string;
  emoji?: string;
}

/*
  left: false,
  chat: false,
  hardware: false,
  painttool: "arrow",
  faceCamId: "",
  hardwareCamId: ""
*/

function useConfig(): [AppState, (cfg: AppState) => void] {
  return useLocalStorage("streamer.config", {
    editor: "microbit",
    scene: "left",
  });
}

async function findCamera(dispatch: Dispatch<AppAction>) {
  console.log("looking for web cam");
  const cams = await listCameras();
  if (cams && cams[0] && cams[0].deviceId) {
    dispatch({
      type: AppActionType.SET_FACECAM_ID,
      deviceId: cams[0].deviceId,
    } as SetCameraDeviceIdAppAction);
  }
}

export default function App() {
  const [config, setConfig] = useConfig();
  const [state, dispatch] = useReducer(reducer, config);

  useEffect(() => {
    if (!state.faceCamId) findCamera(dispatch);
  });

  return (
    <Scene state={state}>
      <MakeCodeEditor id="editor" editor={config.editor} multi={state.multi} />
      {state.multi && (
        <MakeCodeEditor
          id="editor2"
          editor={config.editor}
          multi={state.multi}
        />
      )}
      <Chat mixer={config.mixer} twitch={config.twitch} />
      <VideoInputSource id="facecam" deviceId={state.faceCamId} />
      {state.hardwareCamId && (
        <VideoInputSource id="hardwarecam" deviceId={state.hardwareCamId} />
      )}
      {state.paint && <Paint state={state} />}
      <Source id="social">
        <Toolbox state={state} dispatch={dispatch} />
        <div id="banner"></div>
      </Source>
      {state.settings && <Settings state={state} dispatch={dispatch} />}
    </Scene>
  );

  function reducer(state: AppState, action: AppAction) {
    const newState = cloneState(state);
    switch (action.type) {
      case AppActionType.SET_EDITOR:
        newState.editor = (action as SetEditorAppAction).editor;
        break;
      case AppActionType.SET_SCENE:
        newState.scene = (action as SetSceneAppAction).scene;
        break;
      case AppActionType.SET_FACECAM_ID:
        newState.faceCamId = (action as SetCameraDeviceIdAppAction).deviceId;
        break;
      case AppActionType.SET_HARDWARECAM_ID:
        newState.hardwareCamId = (action as SetCameraDeviceIdAppAction).deviceId;
        break;
      case AppActionType.SET_MULTI:
        newState.multi = !!(action as SetFlagAppAction).on;
        break;
      case AppActionType.SET_HARDWARECAM:
        newState.hardware = !!(action as SetFlagAppAction).on;
        break;
      case AppActionType.SET_SETTINGS:
        newState.settings = !!(action as SetFlagAppAction).on;
        break;
      case AppActionType.SET_MIXER:
        newState.mixer = (action as SetTextAppAction).text;
        break;
      case AppActionType.SET_TWITCH:
        newState.twitch = (action as SetTextAppAction).text;
        break;
      case AppActionType.SET_EMOJIS:
        newState.emojis = (action as SetTextAppAction).text;
        break;
      case AppActionType.SET_CHAT:
        newState.chat = (action as SetFlagAppAction).on;
        break;
      case AppActionType.SET_PAINT:
        newState.paint = (action as SetFlagAppAction).on;
        break;
      case AppActionType.SET_PAINT_TOOL:
        const tool = action as SetPaintToolAppAction;
        newState.paintTool = tool.tool;
        if (tool.emoji) newState.emoji = tool.emoji;
        break;
    }
    setConfig(newState);
    return newState;
  }

  function cloneState(state: AppState): AppState {
    return JSON.parse(JSON.stringify(state));
  }
}

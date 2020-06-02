import React, { useReducer } from 'react';
import './index.css'
import './theme.css'
import Scene from './Scene';
import BrowserSource from './BrowserSource';
import VideoInputSource from './VideoInputSource';
import Source from './Source';
import Toolbox from './Toolbox';
import Settings from './Settings';

export interface AppState {
  scene: string;
  faceCamId?: string;
  hardwareCamId?: string;
  multi?: boolean;
  hardware?: boolean;
  settings?: boolean;
}

export enum AppActionType {
  "SET_SCENE",
  "SET_FACECAM_ID",
  "SET_HARDWARECAM_ID",
  "SET_HARDWARECAM",
  "SET_MULTI",
  "SET_SETTINGS"
}

export interface AppAction {
  type: AppActionType;
}

export interface SetSceneAppAction extends AppAction {
  type: AppActionType.SET_SCENE;
  scene: string;
}

export interface SetCameraDeviceIdAppAction extends AppAction {
  type: AppActionType.SET_FACECAM_ID | AppActionType.SET_HARDWARECAM_ID;
  deviceId: string;
}

export interface SetFlagAppAction extends AppAction {
  type: AppActionType.SET_MULTI | AppActionType.SET_HARDWARECAM | AppActionType.SET_SETTINGS;
  on: boolean;
}

const initialState: AppState = {
  scene: "left",
};

/*
  left: false,
  chat: false,
  hardware: false,
  painttool: "arrow",
  faceCamId: "",
  hardwareCamId: ""
*/

function cloneState(state: AppState): AppState {
  return JSON.parse(JSON.stringify(state));
}

function reducer(state: AppState, action: AppAction) {
  const newState = cloneState(state)
  switch (action.type) {
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
  }
  return newState;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Scene className={state.scene}>
    <BrowserSource id="editor" />
    {state.multi && <BrowserSource id="editor2" />}
    <BrowserSource id="chat" sandbox={true} />
    <VideoInputSource id="facecam" deviceId={state.faceCamId} />
    {state.hardware && <VideoInputSource id="hardwarecam" deviceId={state.hardwareCamId} />}
    <Source id="social">
      <Toolbox state={state} dispatch={dispatch} />
      <div id="banner"></div>
    </Source>
    {state.settings && <Settings state={state} dispatch={dispatch} />}
  </Scene>
}

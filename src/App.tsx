import React, { useReducer } from 'react';
import './index.css'
import Scene from './Scene';
import BrowserSource from './BrowserSource';
import VideoInputSource from './VideoInputSource';

interface AppState {
  scene: string;
  faceCamId?: string;
  hardwareCamId?: string;
}

enum AppActionType {
  "SET_SCENE",
  "SET_FACECAM_ID",
  "SET_HARDWARECAM_ID",
}

interface AppAction {
  type: AppActionType;
}

interface SetSceneAppAction extends AppAction {
  type: AppActionType.SET_SCENE;
  scene: string;
}

interface SetCameraDeviceIdAppAction extends AppAction {
  type: AppActionType.SET_FACECAM_ID | AppActionType.SET_HARDWARECAM_ID;
  deviceId: string;
}

const initialState: AppState = {
  scene: "leftscene",
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
  }
  return newState;
}

export default function App() {
  const [state] = useReducer(reducer, initialState)

  return <Scene className={state.scene}>
    <BrowserSource id="editor" />
    <BrowserSource id="editor2" />
    <BrowserSource id="chat" sandbox={true} />
    <VideoInputSource id="facecam" deviceId={state.faceCamId} />
    <VideoInputSource id="hardwarecam" deviceId={state.hardwareCamId} />
  </Scene>
}

import React from 'react';
import 'style.css'
import Scene from './Scene';
import BrowserSource from './BrowserSource';
import VideoInputSource from './VideoInputSource';

export const AppContext = React.createContext({
  scene: "leftscene",
  left: false,
  chat: false,
  hardware: false,
  painttool: "arrow",
  faceCamId: "",
  hardwareCamId: ""
});

export default function App() {
  return <AppContext.Consumer>
    {({ scene, faceCamId, hardwareCamId }) =>
      <Scene className={scene}>
        <BrowserSource id="editor" />
        <BrowserSource id="editor2" />
        <BrowserSource id="chat" sandbox={true} />
        <VideoInputSource id="facecam" deviceId={faceCamId} />
        <VideoInputSource id="hardwarecam" deviceId={hardwareCamId} />
      </Scene>}
  </AppContext.Consumer>
}

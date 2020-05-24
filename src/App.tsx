import React from 'react';
import './App.css';
import { BrowserSource } from './BrowserSource';
import { VideoInputSource } from './VideoInputSource';

export const AppContext = React.createContext({
  locked: true,
  gridSize: 8
});

export interface AppProps {

}

export interface AppState {
  editorUrl: string;
  editorTitle: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      editorUrl: "https://makecode.microbit.org",
      editorTitle: "micro:bit"
    }
  }

  render() {
    const { editorUrl, editorTitle } = this.state;
    return <AppContext.Provider value={{ locked: false, gridSize: 8 }}>[
      <BrowserSource url={editorUrl} title={editorTitle} />,
      <VideoInputSource />
    ]
    </AppContext.Provider>
  }
}

export default App;

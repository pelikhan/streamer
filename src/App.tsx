import React from 'react';
import { BrowserSource } from './BrowserSource';
import { VideoInputSource } from './VideoInputSource';
import { Paper, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

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

const HigherOrderComponent = () => {
  return <div>
    <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>
    <Fab color="secondary" aria-label="edit">
      <EditIcon />
    </Fab>
    <Fab variant="extended">
      <NavigationIcon />
    Navigate
  </Fab>
    <Fab disabled aria-label="like">
      <FavoriteIcon />
    </Fab>
  </div>
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
    return <AppContext.Provider value={{ locked: false, gridSize: 8 }}>
      <Paper />
      <BrowserSource url={editorUrl} title={editorTitle} />
      <VideoInputSource />
      <HigherOrderComponent />
    </AppContext.Provider>
  }
}

export default App;

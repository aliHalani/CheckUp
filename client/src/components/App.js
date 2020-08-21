import React from 'react';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import MainApp from './MainApp'
import { UserContextProvider } from './context/UserContext'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import "assets/css/stylesheet-base.css";

const theme = createMuiTheme({
    palette: {
      primary: {
          main: "#000000"
      }
    }
  });

export default function App() {
    return (
        <ThemeProvider theme={theme}>
        <UserContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginPage}/>
                    <Route component={MainApp} />
                </Switch>
            </Router>
        </UserContextProvider>
        </ThemeProvider>
    )
}
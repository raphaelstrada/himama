import React from 'react'
import { ThemeProvider } from 'styled-components'
import { createBrowserHistory } from 'history'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Index, {
  Home,
  Clock,
  Dashboard
} from '../pages'
import { theme } from '../styles'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const history = createBrowserHistory()

export const Routes = {
  home: '/',
  login: '/login/:uid',
  clock: '/schools/:school_id/employees/:employee_id/clock/:uid',
  dashboard: '/schools/:school_id/employees/:employee_id/clock/:uid/dashboard',
}

const routes = {
  [Routes.home]: Home,
  [Routes.login]: Home,
  [Routes.clock]: Clock,
  [Routes.dashboard]: Dashboard
  
}

const AppRouter = () => (
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <React.Fragment>
            <Index>
              {Object.keys(routes).map(r => (
                <Route key={r} path={r} exact={r === '/'} component={routes[r]} />
              ))}
            </Index>
      </React.Fragment>
    </Router>
  </ThemeProvider>
)

export default AppRouter

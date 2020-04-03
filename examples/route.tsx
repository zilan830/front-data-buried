import React, { PureComponent } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PageOne from './pages/page1'
import PageTwo from './pages/page2'

const history = createBrowserHistory()

class ERouter extends PureComponent {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/page1" component={PageOne} />
                    <Route path="/page2" component={PageTwo} />
                </Switch>
            </Router>
        )
    }
}


export default ERouter
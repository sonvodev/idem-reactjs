import * as React from 'react';
import { Switch, Route } from 'react-router-dom'

import ExchangeCurrencyContainer from './containers/exchange-currency/ExchangeCurrency';
import AboutContainer from './containers/about/About';
import AppHeader from './components/app-header/AppHeader'
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AppHeader />
        <div className="container">
          <Switch>
            <Route exact path='/' component={ExchangeCurrencyContainer} />
            <Route path='/about' component={AboutContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import './utils/configurations'
import { Provider } from 'react-redux'
import createStore from './store'
import { BrowserRouter } from 'react-router-dom'
import 'element-theme-default'
const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

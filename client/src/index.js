import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store={store}
  >
    <ConfigProvider
    theme={{
      components : {
        Button : {
          colorPrimary : '#D5CEA3',
          colorPrimaryHover : '#E5E5CB',
          colorPrimaryActive : '#E5E5CB',
          colorPrimaryText : '#1A120B',
        }
      },
      token : {
        borderRadius: '2px',
      }
    }}>
      <App/>
    </ConfigProvider>
  </Provider>
);

reportWebVitals();

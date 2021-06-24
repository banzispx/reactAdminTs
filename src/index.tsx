import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store, persistor } from '@/store'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
// import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import '@/assets/css/public.less'
// import 'antd/dist/antd.dark.less'
// import 'antd/dist/antd.compact.css';
ReactDOM.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider locale={zhCN}>
        {/* <React.StrictMode> */}
          <App />
        {/* </React.StrictMode> */}
      </ConfigProvider>
    </PersistGate>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log); // 检测网页性能的

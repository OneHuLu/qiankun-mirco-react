// 入口文件 index.tsx
//引入新增的 public-path 文件
import "./public-path";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from 'react-router-dom'

let root: ReactDOM.Root;

function createRoot(props: Record<string, any>) {
  // container中包含了qiankun创建的dom，它会插入一个带有id为root的dom
  const { container } = props;
  root = ReactDOM.createRoot(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}
// 独立运行，直接调用 createRoot函数 render
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  createRoot({});
  // @ts-ignore
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

// lifecycle => 初始化
export async function bootstrap(props: Record<string, any>) {
  console.log(props);
}

// lifecycle => 挂载
export async function mount(props: Record<string, any>) {
  createRoot(props);
  //qiankun环境中渲染
  root.render(
    <BrowserRouter
      // 对两种不同的环境分别给出不同的基础路径
      // @ts-ignore
      basename={window.__POWERED_BY_QIANKUN__ ? "/qk-micro-react" : "/"}
    >
      <App />
    </BrowserRouter>
  );
}

// lifecycle => 卸载
export async function unmount(_props: Record<string, any>) {
  root.unmount();
}
reportWebVitals();

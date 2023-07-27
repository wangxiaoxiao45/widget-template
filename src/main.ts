import { defineCustomElement } from './defineCustomElementWithStyles'
import App from './App.ce.vue' // 引入App组件

const AppElement = defineCustomElement(App) // 生成 HTMLElement 构造函数

customElements.define('widget-demo', AppElement) // 注册

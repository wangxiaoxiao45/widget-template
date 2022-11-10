import { defineCustomElement } from './defineCustomElementWithStyles'
import App from './App.ce.vue' // 引入

const AppElement = defineCustomElement(App) // 生成 HTMLElement 构造函数

customElements.define('simple-rating-widget', AppElement) // 注册

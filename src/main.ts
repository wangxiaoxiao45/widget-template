import { defineCustomElement } from './defineCustomElementWithStyles'
import Example from './App.ce.vue' // 引入

const ExampleElement = defineCustomElement(Example) // 生成 HTMLElement 构造函数

customElements.define('my-example', ExampleElement) // 注册

/** @format */

// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import { defineCustomElement } from './defineCustomElementWithStyles'
import Example from './App.ce.vue' // 引入

const ExampleElement = defineCustomElement(Example) // 生成 HTMLElement 构造函数

customElements.define('my-example', ExampleElement) // 注册

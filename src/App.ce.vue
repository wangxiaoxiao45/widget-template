<!-- @format -->
<template>
  <div id="xxxx">
    {{ name }}

    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<script setup lang="ts">
import { getCaptcha } from '@/api'

import HelloWorld from './components/HelloWorld.ce.vue'

defineProps(['name'])
</script>

<style scoped>
#xxxx {
  width: 400px;
  height: 200px;
  overflow: scroll;
  border: 1px solid red;
  background: lightsalmon;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/commons/Header.vue'
import './styles/main.css'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
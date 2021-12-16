<template>
  <div id="app">
    <Header />
    <BreadCrumb :items="breadCrumbItems" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/commons/Header.vue'
import BreadCrumb from './components/commons/BreadCrumb.vue'
import './styles/main.css'

export default {
  name: 'App',
  components: {
    Header,
    BreadCrumb
  },
  data() {
    return {
      breadCrumbItems: this.$route.matched.map(match => match.name)
    }
  },
  watch: {
    $route() {
      this.breadCrumbItems = this.$route.matched.map(match => match.name);
    }
  }
}
</script>
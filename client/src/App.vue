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
  },
  watch: {
    '$store.state.token': function() {
      console.log("token: " + this.$store.state.token)
    },
    '$store.state.expiresIn': function() {
      console.log("expiresIn: " + this.$store.state.expiresInauthority)
    },
    '$store.state.authority': function() {
      console.log("authority: " + this.$store.state.authority)
    },
    '$store.state.name': function() {
      console.log("name: " + this.$store.state.name)
    },
    '$store.state.email': function() {
      console.log("email: " + this.$store.state.email)
    },
  }
}
</script>
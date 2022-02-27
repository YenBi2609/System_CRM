<template>
  <div id="app">
    <Login v-if="$route.path == '/'"/>
    <Home v-if="$route.path != '/'"/>
  </div>
</template>

<script>
import Login from './views/Login.vue'
import Home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Login,
    Home
  }
}
</script>

<style>

</style>

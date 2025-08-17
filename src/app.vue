<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/hellWorld.vue'

export default {
  components: {
    HelloWorld
  },

  data() {
    return {
      message: 'Hello Rsbuild + Vue!',
    };
  },
};
</script>

<style>
.app {
  text-align: center;
  margin-top: 50px;
}
</style>

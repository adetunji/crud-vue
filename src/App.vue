<template>
  <div id="app">
    <ItemInput :msg="message" />
    <ItemList :msg="message"/>
  </div>
</template>

<script>
import ItemInput from "./components/ItemInput";
import ItemList from "./components/ItemList";

export default {
  name: 'app',
  data() {
    return {
      message: [{title: 'Hello', information: 'World'}]
    }
  },
  components: {
    ItemList,
    ItemInput
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <container></container>
  </div>
</template>

<script>
import Container from "./views/Container";

export default {
  name: "app",
  components: {
    Container,
  },
};
</script>

<style lang="scss">
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.fa-icon {
  width: auto;
  height: 1em;
  /* 或任意其它字体大小相对值 */
  /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
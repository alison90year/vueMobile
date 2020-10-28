<template>
  <div id="app">
444
    <div class="head">头部</div>
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
    @import "styles/reset.css";
    #app{
        .head{
            background: red;
        }
    }
</style>

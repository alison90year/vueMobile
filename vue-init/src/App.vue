<template>
    <div id="app">
        444
        <div class="head">头部</div>

        <nut-button>
            去结算{{name}}
        </nut-button>
        <router-view></router-view>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    data() {
      return {
        list: []
      }
    },
    components: {},
    created() {
      this.init()
    },
    computed: {
      ...mapGetters(['name'])
    },
    methods: {
      init() {
        this.$store.dispatch('func1')
      }
    }
  }
</script>

<style lang="scss">
    @import "styles/reset.css";

    #app {
        .head {
            background: red;
            display: flex;
            height: 500px;
        }
    }
</style>

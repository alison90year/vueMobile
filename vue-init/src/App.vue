<template>
    <div id="app">
        <div class="head">头部
<!--            <nut-icon type="self" :url="require('assets/icons/svg/zs.svg')"></nut-icon>-->
            <button @click="file" style="width: 100px;height: 20px">上传文件</button>
            <label ref="upload"
                   style="position: relative;">
                <input type="file"
                       @change="selectFile"
                       style=" width: 100px; height: 40px; opacity: 0;">
            </label>
            <img :src="contentUrl" style="width: 200px;height: 200px" v-if="contentUrl">
        </div>
        <div style="background: gold" class="bottm"></div>

        <router-view></router-view>

    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    data() {
      return {
        list: [],
        contentUrl:''
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
        this.$store.dispatch('home/func1')
        // this.$store.dispatch('home/uploadAction')
      },
      file() {
        // 模拟点击file input触发选择文件，注意：不能在任何方式的回调里面执行此语句
        this.$refs.upload.click()
      },
      selectFile(event) {
        // 调用上传方法，传入选择的文件对象
        this.$uploadFile(event.target.files[0], (picId) => {
                this.$store.dispatch('home/picToStoreByIdAction',{picID:picId}).then(res => {
                  this.contentUrl = res.data
                })
                // this.contentUrl='//bpic.588ku.com/ad_diversion/20/01/16/a92278a30f085d9148a809c8cba845ce.png'
        })
        // 重置file input控件的值
        event.target.value = ''
      }
    }
  }
</script>

<style lang="scss">
    @import "src/styles/reset.scss";

    #app {
        .head {
        }

    }
</style>

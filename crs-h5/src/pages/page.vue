<template>
  <div id="wrap" class="warp">
    <draggable v-model="pageData.componentList" class="draggable" group="people" :style="pageStyle" @change="changePosition">
      
    </draggable>
  </div>
</template>

<script>
// page页面需要支持拖拽和修改
import draggable from 'vuedraggable'
export default {
  name:'page',
  components:{
    draggable
  },
  computed:{
    pageData:{
      get:function() {
        return this.$store.getters.pageData
      },
      set:function(){
        
      }
    },
    pageStyle(){
      const s = {
        backgroundColor:this.pageData.backgroundColor,
        backgroundPosition:`center ${this.pageData.backgroundPosition}`
      }
      if(this.pageData.backgroundImage){
        s.backgroundImage = `url(${this.pageData.backgroundImage})`
      }
      return s
    }
  },
  methods:{
    changePosition(e){
      let {newIndex,oldIndex,element} = e.moved
      this.$store.commit('changeComponentPosition',{newIndex,oldIndex,element})
    }
  }
}
</script>

<style>

</style>
import Vue from 'vue'
import Vuex from 'vuex'
import Postmessage from '@/utils/postMessage'
Vue.use(Vuex)

export default new Vuex.Store({
    store:{
        pageData:{
            componentList:[]
        },
        previewId:null,
        previewHeight:0,
        componentTopList:[]
    },
    mutations:{
        changeComponentPosition(){
            this.commit('postPageChange')
        },  

        postPageChange(state){
            Postmessage.postMessage('pageChange',state.pageData)
        },

        changeComponent(state,{value}){
            state.pageData = value
        },
        
        // 增加，预添加组件
        setPreview(state,{value}){
            state.pageData.componentList = value
        },
        
        // 移走，删除预添加组件
        deletePreview(state,{value}){
            state.pageData.componentList = state.pageData.componentList.filter(item => item.data.component != "blank")
        },
        setActiveId(state, id) {
            state.previewId = id
        },

    },
    actions:{},
    getters:{
        pageData:state =>{
            return state.pageData
        }
    }
})


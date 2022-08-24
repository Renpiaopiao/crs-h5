import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex({
    store:{
        pageData:{
            components:[]
        },
        previewId:null,
        previewHeight:0,
        componentTopList:[]
    },
    mutations:{},
    actions:{}
})


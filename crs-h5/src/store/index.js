import Vue from 'vue'
import Vuex from 'vuex'
import Postmessage from '@/utils/postMessage'
Vue.use(Vuex)

export default new Vuex.Store({
    store: {
        pageData: {
            componentList: []
        },
        previewId: null,
        previewHeight: 0,
        componentTopList: []
    },
    mutations: {
        changeComponentPosition() {
            this.commit('postPageChange')
        },

        postPageChange(state) {
            Postmessage.postMessage('pageChange', state.pageData)
        },

        changeComponent(state, { value }) {
            state.pageData = value
        },

        // 增加，预添加组件(蓝底预添加)
        setPreview(state, { value }) {
            this.commit('deletePreview')
            const previewComponent = {
                data: {
                    component: 'blank'
                }
            }
            state.pageData.componentList.splice(index, 0, previewComponent)
        },

        // 移走，删除预添加组件
        deletePreview(state, { value }) {
            state.pageData.componentList = state.pageData.componentList.filter(item => item.data.component != "blank")
        },
        setActiveId(state, id) {
            state.previewId = id
        },

        // componentResolve组件，删除按钮
        deleteComponent(state, id) {
            const index = state.pageData.componentList.findIndex(item => item.id === id)
            state.pageData.componentList.splice(index, 1)
            this.commit('postPageChange')  //通知cms-manage
        },

        changeSelected(state, id) {
            state.previewId = id
            Postmessage.postMessage('setActive', id)
        }
    },
    actions: {},
    getters: {
        pageData: state => {
            return state.pageData
        }
    }
})


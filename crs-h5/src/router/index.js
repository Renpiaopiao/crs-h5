import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/page',
            name:'page',
            component:() => import('../pages/page.vue'),
            meta:{
                title:'配置页面'
            }
        },
        {
            path:'/pagePreview',
            name:'pagePreview',
            component:() => import('../pages/pagePreview.vue'),
            meta:{
                title:'预览页'
            }
        },
        {
            path:'/activity',
            name:'activity',
            component:() => import('../pages/activity.vue'),
            meta:{
                title:'活动页'
            }
        }
    ]
})
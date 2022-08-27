<template>
    <div id="wrap" class="wrap">
        <div class="main" :style="pageStyle">
            <div v-for="element in pageData.componentList" :key="element.id">
                <component :is="element.component" :property="element.data" :style="styleObject(element)"></component>
            </div>
        </div>
    </div>
</template>

<script>
const wx = require('weixin-js-sdk');
import { getPageJson } from '@/api/pagePreview.js';
export default {
    name: 'pagePreview',
    data() {
        return {
            pageData: {},
        };
    },
    computed: {
        pageStyle() {
            return {
                backgroundColor: this.pageData.backgroundColor,
                backgroundImage: `url(${this.pageData.backgroundImage})`,
                backgroundPosition: `center ${this.pageData.backgroundPosition}`,
            };
        },
    },
    mounted() {
        const id = this.$route.query.id;
        getPageJson({ id }).then((res) => {
            document.title = res.data.name;
            this.pageData = res.data;
            const { shareDesc, shareImage } = res.data;
            if (shareDesc || shareImage) {
                const data = {
                    shareDesc,
                    shareImage,
                };
                // 分享文案+图片传递给微信
                wx.miniProgram.postMessage({data})
            }
        });
    },
    methods: {
        styleObject(item) {
            return {
                color: item.textColor,
                borderRadius: item.radius + 'px',
                marginTop: item.marginTop + 'px',
            };
        },
    },
};
</script>

<style scoped>
.wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.main {
    position: relative;
    width: 375px;
}
.wrap .mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
}
</style>

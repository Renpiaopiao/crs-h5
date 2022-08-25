<template>
    <div class="carousel-box">
        <div v-if="property.layout ==='swiper'" :style="boxStyle">
            <van-swiper class="my-carousel" :autoplay="3000" indicator-color="white">
               <van-swipe-item v-for="(item,i) in imageList" :key="i" :style="itemStyle" @click="jumpLink(item.link)">
                    <van-image :style="imgStyle" :radius="radius" fit="fill" :src="item.imageUrl?item.imageUrl:defaultImg"></van-image>
               </van-swipe-item>
            </van-swiper>
        </div>
        <div v-else class="single" :style="boxStyle">
            <div v-for="(item,i) in imageList" :key="i" :style="imageList.length-1?itemStyle:''" @click="jumpLink(item.link)">
                <van-image :style="imgStyle" :radius="radius" fit="fill" :src="item.imageUrl?item.imageUrl:defaultImg"></van-image>
            </div>
        </div>
    </div>
</template>

<script>
import defaultImg from '../assets/swipe-default.png'
export default {
    name: 'Carousel',
    data:{
        imageList:[],
        imgStyle:{},
        boxStyle:{},
        itemStyle:{},
        radius:0,
        defaultImg:defaultImg
    },  
    props: {
        property: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    watch: {
        property:{
            handler(val){
                if(val){
                    this.imageList = this.property.imageList,
                    this.setMyStyle()
                }
            }
        }
    },
    methods:{
        setMyStyle(){
            let padding = '0'
            let height = '100%'
            this.radius = this.property.isBorderRadius?radius:0
            //如果图片有边距
            if(this.property.isDefaultMargin){  
                padding = `${this.property.marginSize[0]}px ${this.property.marginSize[1]}px` + ''
            }
            this.imgStyle = {
                height,
                verticalAlign:'top'
            }
            this.boxStyle = {
                padding,
                backgroundColor:this.property.backgroundColor
            }
            // 如果是swiper就设置背景色，如果是流布局还要加上图片间距
            this.itemStyle = this.property.layout === 'swiper'?{backgroundColor:this.property.backgroundColor}:{
                backgroundColor:this.property.backgroundColor,
                marginBottom:(this.property.isDefaultMargin && this.property.imageMargin?this.property.imageMargin:0) + 'px'
            }
        }
    }
};
</script>

<style lang="less" scoped>

</style>

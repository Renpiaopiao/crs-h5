<template>
    <div style="position: relative">
        <div
            v-show="dislogShow"
            :class="[
                componentConfig.data.component === 'Dialog'
                    ? componentConfig.id === previewId
                        ? 'componentDialog selected'
                        : 'componentDialog'
                    : 'component',
            ]"
            @click="sensorTest"
        >
            <div @click="!preview ? changeSelected(componentConfig.id) : ''">
                <component
                    :is="componentConfig.data.component"
                    :property="componentConfig.data"
                    :style="styleObj"
                    :class="{ componentDom: true, selected: componentConfig.id === previewId }"
                ></component>
            </div>
            <div v-if="!preview" class="modal" @click="!preview ? changeSelected(componentConfig.id) : ''"></div>
            <div v-if="!preview" class="name" :class="operateTagClass">
                {{ componentConfig.name }}
            </div>
            <div v-if="!preview" class="delete" :class="operateTagClass" @click="deleteComponent(componentConfig.id)">
                删除
            </div>
        </div>
        <div v-show="componentConfig.data.component === 'Dialog'" class="hideDialog" @click="dialogSwitch">
            {{ dialogShow ? '隐藏弹窗' : '显示弹窗' }}
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Carousel from '@/components/Carousel';
import Dialog from '@/components/Dialog';
import imgc from '@/components/imgc';
import AssistLine from '@/components/AssistLine';
import FloatLayer from '@/components/FloatLayer';
import OnlineService from '@/components/OnlineService';
import Slider from '@/components/Slider';
import cubeSelection from '@/components/cubeSelection';
import ImageNav from '@/components/ImageNav';
import product from '@/components/product';
import notice from '@/components/notice';
import richText from '@/components/richText';
export default {
    name: 'componentResolve',
    data() {
        return {
            dislogShow: true,
            componentConfig: JSON.parse(JSON.stringify(this.componentConfigProp)),
            styleObj: {},
            dialogShow: true
        };
    },
    mounted() {
        this.styleObject = {
            color: this.componentConfig.textColor,
            borderRadius: this.componentConfig.radius + 'px',
            marginTop: this.componentConfig.marginTop + 'px',
            '--selected-width':
                this.componentConfig.data.component === 'OnlineService'
                    ? '54px'
                    : this.componentConfig.data.component === 'FloatLayer'
                    ? '100px'
                    : '375px',
        };
    },
    components: {
        Carousel,
        Dialog,
        imgc,
        AssistLine,
        FloatLayer,
        OnlineService,
        Slider,
        cubeSelection,
        ImageNav,
        product,
        notice,
        richText,
    },
    props: {
        componentConfigProp: {
            type: Object,
            default: () => {
                return {};
            },
        },
        preview: {
            //是否正在查看组件
            type: Boolean,
            default: false,
        },
    },
    watch: {
        componentConfigProp: {
            handler: function (val) {
                this.componentConfig = val;
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(['previewId']),
        operateTagClass() {
            return this.componentConfig.data.component === 'OnlineService'
                ? 'online-service-pos'
                : this.componentConfig.data.component === 'FloatLayer'
                ? 'float-layer-pos'
                : '';
        },
    },
    methods: {
        ...mapMutations(['changeSelected', 'deleteComponent']),
        sensorTest() {},
        dialogSwitch(){
            this.dialogShow = !this.dialogShow
        }
    },
};
</script>

<style scoped>
:root {
  --selected-width: 54px;

}
.component{
  position: relative;
  cursor: move;
}
.componentDialog{
  position: fixed;
  top: 0;
  z-index: 99;
}
.componentDialog .name,.componentDialog .delete{
  top: 30px;
}
.componentDialog .componentDom.selected:before {
  left: 0;
  border: none;
}
.name, .delete{
  font-size: 14px;
  color: #333;
  padding: 4px 12px;
  background: #fff;
  position: absolute;
  white-space: nowrap;
  border: 2px;
  height: 18px;
  border-radius: 2px;
  line-height: 18px;
  cursor: pointer;
  font-size: 12px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  color: #323232;
}

.name, .delete{
  left: 380px;
  top: 0px;
}
.delete {
  display: none;
}
.components:hover .name{
  display: none;
}
.components:hover .delete{
  display: block;
}
.name:hover +.delete {
  display: block;
}
/* .delete:hover +.name {
  display: none;
} */
.name:before, .delete:before{
  content: '';
  display: inline-block;
  width: 0px;
  height: 0px;
  border: solid 4px transparent;
  border-right: solid 4px #fff;
  position: absolute;
  left: -8px;
  top: 8px;
}
.componentDom{
  min-height: 20px;
  user-select: none;
  position: relative;
}

.selected:before{
  content: "";
  position: absolute;
  width: var(--selected-width);
  left: -1px;
  top: 0;
  bottom: 0;
  width: 100%;
  border: 1px dashed #155bd4;
  z-index: 50;
  cursor: move;
  box-sizing: content-box;
}
.componentDom.selected:before{
  left: -2px;
  border: 2px solid #155bd4;
}

.modal:hover{
  cursor: move;
  border: 1px dashed #155bd4;
}

.float-layer-pos, .online-service-pos {
  position: fixed;
  top: unset
}

.float-layer-pos {
  bottom: 180px
}

.online-service-pos {
  bottom: 60px
}

.hideDialog{
  position: fixed;
  right: 380px;
  top: 0px;
  color: #333;
  padding: 4px 12px;
  background: #fff;
  white-space: nowrap;
  border: 2px;
  height: 18px;
  border-radius: 2px;
  line-height: 18px;
  cursor: pointer;
  font-size: 12px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  color: #323232;
}
.hideDialog:before{
  content: '';
  display: inline-block;
  width: 0px;
  height: 0px;
  border: solid 4px transparent;
  border-left: solid 4px #fff;
  position: absolute;
  right: -8px;
  top: 8px;
}
</style>

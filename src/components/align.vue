<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-07-16 15:17:28
 * @Description: 组合元素对齐
-->

<template>
  <div v-if="mixinState.mSelectMode === 'multiple'" class="attr-item-box">
    <!-- <h3>对齐</h3> -->
    <Divider plain orientation="left"><h4>对齐</h4></Divider>
    <div class="bg-item">
      <!-- 水平对齐 -->
      <!-- <Tooltip :content="$t('attrSeting.align.left')"> -->
      <Button
        @click="left"
        size="small"
        text
        v-tooltip="$t('attrSeting.align.left')"
      >
        <img src="/src/assets/icon/left.svg" />
        <!-- <leftIcon /> -->
      </Button>
      <!-- </Tooltip>
      <Tooltip :content="$t('attrSeting.align.centerX')"> -->
      <Button
        @click="xcenter"
        size="small"
        text
        v-tooltip="$t('attrSeting.align.centerX')"
      >
        <img src="/src/assets/icon/centerx.svg" />
        <!-- <centerxIcon /> -->
      </Button>
      <!-- </Tooltip>
      <Tooltip :content="$t('attrSeting.align.right')"> -->
      <Button
        @click="right"
        size="small"
        text
        v-tooltip="$t('attrSeting.align.right')"
      >
        <img src="/src/assets/icon/right.svg" />
        <!-- <rightIcon /> -->
      </Button>
      <!-- </Tooltip> -->
      <!-- 垂直对齐 -->
      <!-- <Tooltip :content="$t('attrSeting.align.top')"> -->
      <Button
        @click="top"
        size="small"
        text
        v-tooltip="$t('attrSeting.align.top')"
      >
        <img src="/src/assets/icon/top.svg" />
        <!-- <topIcon /> -->
      </Button>
      <!-- </Tooltip>
      <Tooltip :content="$t('attrSeting.align.centerY')"> -->
      <Button
        @click="ycenter"
        size="small"
        text
        v-tooltip="$t('attrSeting.align.centerY')"
      >
        <img src="/src/assets/icon/centery.svg" />
        <!-- <centeryIcon /> -->
      </Button>
      <!-- </Tooltip>
      <Tooltip :content="$t('attrSeting.align.bottom')"> -->
      <Button
        @click="bottom"
        size="small"
        text
        v-tooltip="$t('attrSeting.align.bottom')"
      >
        <img src="/src/assets/icon/bottom.svg" />
        <!-- <bottomIcon /> -->
      </Button>
      <!-- </Tooltip> -->
      <!-- 平均对齐 -->
      <!-- <Tooltip :content="$t('attrSeting.align.averageX')"> -->
      <Button
        @click="xequation"
        size="small"
        text
        v-tooltip="$t('attrSeting.align.averageX')"
      >
        <img src="/src/assets/icon/sx.svg" />
        <!-- <sxIcon /> -->
      </Button>
      <!-- </Tooltip>
      <Tooltip :content="$t('attrSeting.align.averageY')"> -->
      <Button
        @click="yequation"
        size="small"
        text
        v-tooltip="$t('attrSeting.align.averageY')"
      >
        <img src="/src/assets/icon/sy.svg" />
        <!-- <syIcon /> -->
      </Button>
      <!-- </Tooltip> -->
    </div>
    <!-- <Divider plain></Divider> -->
  </div>
</template>

<script name="Align" setup>
import useSelect from "../hooks/select";

// import leftIcon from "@/assets/icon/left.svg";
// import rightIcon from "@/assets/icon/right.svg";

// import topIcon from "@/assets/icon/top.svg";
// import bottomIcon from "@/assets/icon/bottom.svg";

// import sxIcon from "@/assets/icon/sx.svg";
// import syIcon from "@/assets/icon/sy.svg";

// import centerxIcon from "@/assets/icon/centerx.svg";
// import centeryIcon from "@/assets/icon/centery.svg";

const { mixinState, canvasEditor } = useSelect();

// 左对齐
const left = () => {
  canvasEditor.left();
};
// 右对齐
const right = () => {
  canvasEditor.right();
};
// 水平居中对齐
const xcenter = () => {
  canvasEditor.xcenter();
};
// 垂直居中对齐
const ycenter = () => {
  canvasEditor.ycenter();
};
// 顶部对齐
const top = () => {
  canvasEditor.top();
};
// 底部对齐
const bottom = () => {
  canvasEditor.bottom();
};
// 水平平均对齐
const xequation = () => {
  canvasEditor.xequation();
};
// 垂直平均对齐
const yequation = () => {
  canvasEditor.yequation();
};
</script>

<style scoped lang="scss">
.icon {
  width: 100%;
  height: auto;
}
</style>

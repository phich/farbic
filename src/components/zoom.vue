<!--
 * @Author: 秦少卫
 * @Date: 2022-04-21 20:20:20
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-08-05 18:44:54
 * @Description: 缩放元素
-->
<template>
  <div class="box">
    <ButtonGroup>
      <Button @click="big" icon="pi pi-search-plus"> </Button>
      <Button @click="small" icon="pi pi-search-minus"> </Button>
      <Button @click="rSet" icon="pi pi-expand"></Button>
      <Button @click="setViewport" icon="pi pi-eject"></Button>
    </ButtonGroup>
  </div>
</template>

<script setup name="Zoom">
import useSelect from "../hooks/select";

const { canvasEditor } = useSelect();

const rSet = () => {
  canvasEditor.one();
};
const big = () => {
  canvasEditor.big();
};
const small = () => {
  canvasEditor.small();
};
const setViewport = () => {
  canvasEditor.auto();
};
</script>
<style scoped lang="scss">
.box {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>

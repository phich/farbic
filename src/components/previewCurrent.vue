<!--
 * @Author: bigFace2019 599069310@qq.com
 * @Date: 2023-04-09 11:19:07
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-07-05 00:58:02
 * @FilePath: \vue-fabric-editor\src\components\preview.vue
 * @Description: 预览组件
-->
<template>
  <Button text @click="preview" style="width: auto">
    {{ $t("preview") }}
  </Button>
  <Image :src="imagepath" alt="Image" width="250" preview v-if="isShow" />
</template>

<script lang="ts" setup>
const imagepath = ref("");
const isShow = ref(false);
const canvasEditor: any = inject("canvasEditor");
const preview = () => {
  canvasEditor.preview().then((dataUrl: string) => {
    // const dataUrl = getImgUrl();
    imagepath.value = dataUrl;
    isShow.value = true;
    // ImagePreview.show({
    //   previewList: [dataUrl],
    // });
  });
};
</script>

<style scoped lang="scss"></style>

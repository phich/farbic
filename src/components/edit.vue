<script setup lang="ts">
import useSelect from "../hooks/select";
const { mixinState, canvasEditor } = useSelect();
// import { Message } from "view-ui-plus";
const onEditPolygon = () => {
  const obj = canvasEditor.fabricCanvas?.getActiveObject();
  if (obj && obj.type === "polygon") {
    canvasEditor.activeEdit();
  } else {
    // Message.warning("请检查选择polygon");
  }
};
</script>

<template>
  <Button
    @click="onEditPolygon"
    icon="pi pi-pencil"
    v-if="mixinState.mSelectOneType === 'polygon'"
    text
    v-tooltip="$t('quick.editPoly')"
  ></Button>
</template>

<style scoped lang="scss"></style>

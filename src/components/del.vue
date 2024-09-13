<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-05-21 09:21:42
 * @Description: 删除元素按钮
-->

<template>
  <Button
    long
    @click="del"
    icon="pi pi-trash"
    text
    :v-tooltip="$t('quick.del')"
  ></Button>
</template>

<script setup name="Del">
import useSelect from "../hooks/select";
import { debounce } from "lodash-es";

const { mixinState, canvasEditor } = useSelect();

const del = debounce(function () {
  canvasEditor.del();
}, 300);
</script>

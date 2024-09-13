<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-07-06 17:23:50
 * @Description: 插入SVG元素
-->

<template>
  <Menu ref="menu" :model="itemMenus" :popup="true" />
  <Button
    text
    label="Import File"
    icon="pi pi-angle-down"
    @click="toggle"
    style="width: auto"
  ></Button>
  <div style="display: inline-block">
    <!-- 插入字符串svg元素 -->
    <Dialog
      v-model:visible="state.showModal"
      :header="$t('insertFile.modal_tittle')"
      style="width: 50rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <Textarea
          v-model="state.svgStr"
          rows="5"
          :placeholder="$t('insertFile.insert_SVGStr_placeholder')"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="showModal = false"
        ></Button>
        <Button
          type="button"
          label="Save"
          @click="insertTypeHand('insertSvgStr')"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script name="ImportFile" setup>
import { Utils } from "@kuaitu/core";
const { getImgStr, selectFiles } = Utils;

import useSelect from "../hooks/select";
import { v4 as uuid } from "uuid";

const { fabric, canvasEditor } = useSelect();
const state = reactive({
  showModal: false,
  svgStr: "",
});
const HANDLEMAP = {
  // 插入图片
  insertImg: function () {
    selectFiles({ accept: "image/*", multiple: true }).then((fileList) => {
      Array.from(fileList).forEach((item) => {
        getImgStr(item).then((file) => {
          insertImgFile(file);
        });
      });
    });
  },
  // 插入Svg
  insertSvg: function () {
    selectFiles({ accept: ".svg", multiple: true }).then((fileList) => {
      Array.from(fileList).forEach((item) => {
        getImgStr(item).then((file) => {
          insertSvgFile(file);
        });
      });
    });
  },
  // 插入SVG元素
  insertSvgStrModal: function () {
    state.svgStr = "";
    state.showModal = true;
  },
  // 插入字符串元素
  insertSvgStr: function () {
    fabric.loadSVGFromString(state.svgStr, (objects, options) => {
      const item = fabric.util.groupSVGElements(objects, {
        ...options,
        name: "defaultSVG",
      });
      canvasEditor.addBaseType(item, {
        scale: true,
      });
    });
  },
};

const insertTypeHand = (type) => {
  const cb = HANDLEMAP[type];
  cb && typeof cb === "function" && cb();
};
// 插入图片文件
function insertImgFile(file) {
  if (!file) throw new Error("file is undefined");
  const imgEl = document.createElement("img");
  imgEl.src = file;
  // 插入页面
  document.body.appendChild(imgEl);
  imgEl.onload = async () => {
    const imgItem = await canvasEditor.createImgByElement(imgEl);
    canvasEditor.addBaseType(imgItem, {
      scale: true,
    });
    imgEl.remove();
  };
}

// 插入文件元素
function insertSvgFile(svgFile) {
  if (!svgFile) throw new Error("file is undefined");
  fabric.loadSVGFromURL(svgFile, (objects, options) => {
    const item = fabric.util.groupSVGElements(objects, {
      ...options,
      name: "defaultSVG",
      id: uuid(),
    });
    canvasEditor.addBaseType(item, {
      scale: true,
    });
  });
}
const menu = ref(null);
const toggle = (event) => {
  menu.value.toggle(event);
};
const itemMenus = ref([
  {
    label: "Options",
    items: [
      {
        label: "Insert Image",
        icon: "pi pi-refresh",
        command: () => {
          insertTypeHand("insertImg");
        },
      },
      {
        label: "Insert SVG",
        icon: "pi pi-refresh",
        command: () => {
          insertTypeHand("insertSvg");
        },
      },
      {
        label: "Insert SVG String",
        icon: "pi pi-refresh",
        command: () => {
          insertTypeHand("insertSvgStrModal");
        },
      },
    ],
  },
]);
</script>

<style scoped lang="scss">
:deep(.ivu-select-dropdown) {
  z-index: 999;
}
</style>

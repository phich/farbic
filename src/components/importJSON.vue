<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-05-31 16:58:12
 * @Description: 导入JSON文件
-->

<template>
  <Menu ref="menu" :model="itemMenus" :popup="true" />
  <Button
    text
    label="Options"
    icon="pi pi-angle-down"
    @click="toggle"
    style="width: auto"
  ></Button>
  <!-- <div style="display: inline-block">
    <Dropdown @on-click="clickHandler">
      <a href="javascript:void(0)">
        {{ $t("importFiles.file") }}
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <template #list>
        <DropdownMenu>
          <DropdownItem name="createDesign">
            {{ $t("importFiles.createDesign.title") }}
          </DropdownItem>
          <DropdownItem name="importFiles">{{
            $t("importFiles.importFiles")
          }}</DropdownItem>
          <DropdownItem name="psd">PSD</DropdownItem>
        </DropdownMenu>
      </template>
    </Dropdown> -->

  <!-- 创建设计 -->
  <modalSzie
    :title="$t('importFiles.createDesign.title')"
    ref="modalSizeRef"
    @set="customSizeCreate"
  ></modalSzie>
  <!-- </div> -->
  <ProgressSpinner v-if="isLoadding" />
</template>

<script name="ImportJson" setup>
import useSelect from "../hooks/select";
import useMaterial from "../hooks/useMaterial";
// import { Message } from "view-ui-plus";
import modalSzie from "./common/modalSzie.vue";

const menu = ref();
const { canvasEditor } = useSelect();
const { createTmpl, routerToId } = useMaterial();
const modalSizeRef = ref(null);
const isLoadding = ref(false);
const clickHandler = (type) => {
  const handleMap = {
    // 导入文件
    importFiles: canvasEditor.insert,
    // 创建文件
    createDesign,
    // psd
    psd: () => {
      isLoadding.value = true;
      canvasEditor.insertPSD().finally((isLoadding.value = false));
    },
  };
  handleMap[type]?.();
};

const createDesign = () => {
  debugger;
  modalSizeRef.value.showSetSize(0, 0);
};

const customSizeCreate = async (w, h) => {
  const res = await createTmpl(w, h);
  routerToId(res.data.data.id);
  // Message.success("创建成功");
};
const toggle = (event) => {
  menu.value.toggle(event);
};

const itemMenus = ref([
  {
    label: "Options",
    items: [
      {
        label: "Create Design",
        icon: "pi pi-refresh",
        command: () => {
          clickHandler("createDesign");
        },
      },
      {
        label: "Import file",
        icon: "pi pi-refresh",
        command: () => {
          clickHandler("importFiles");
        },
      },
      {
        label: "PSD",
        icon: "pi pi-refresh",
        command: () => {
          clickHandler("psd");
        },
      },
    ],
  },
]);
</script>
<style scoped lang="scss">
h3 {
  margin-bottom: 10px;
}
.divider {
  margin-top: 0;
}
</style>

<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-05-11 15:49:01
 * @LastEditors: 秦少卫
 * @LastEditTime: 2023-04-10 14:33:18
 * @Description: 保存文件
-->

<template>
  <Menu ref="menu" :model="itemMenus" :popup="true" />
  <Button
    text
    label="Save"
    icon="pi pi-angle-down"
    @click="toggle"
    style="width: auto"
  ></Button>

  <ProgressSpinner v-if="isLoadding" />
</template>

<script setup name="save-bar">
// import { Modal } from "view-ui-plus";
import useSelect from "../hooks/select";
import useMaterial from "../hooks/useMaterial";
import { debounce } from "lodash-es";
import { useI18n } from "vue-i18n";

import { useRoute } from "vue-router";
// import { Message } from "view-ui-plus";

import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const route = useRoute();
const isLoadding = ref(false);
const { createTmplByCommon, updataTemplInfo, routerToId } = useMaterial();

const { t } = useI18n();

const { canvasEditor } = useSelect();
const cbMap = {
  async clipboard() {
    try {
      await canvasEditor.clipboard();
      // Message.success("复制成功");
    } catch (error) {
      // Message.error("复制失败");
    }
  },
  saveJson() {
    canvasEditor.saveJson();
  },
  saveSvg() {
    canvasEditor.saveSvg();
  },
  saveImg() {
    canvasEditor.saveImg();
  },
  async clipboardBase64() {
    try {
      await canvasEditor.clipboardBase64();
      // Message.success("复制成功");
    } catch (error) {
      // Message.error("复制失败");
    }
  },
  async saveMyClould() {
    try {
      isLoadding.value = true;
      if (route?.query?.id) {
        await updataTemplInfo(route?.query?.id);
      } else {
        const res = await createTmplByCommon();
        routerToId(res.data.data.id);
      }
    } catch (error) {
      // Message.warning("请登录");
    }
    isLoadding.value = false;
  },
};

const saveWith = debounce(function (type) {
  cbMap[type] && typeof cbMap[type] === "function" && cbMap[type]();
}, 300);

/**
 * @desc clear canvas 清空画布
 */
const clear = () => {
  canvasEditor.clear();
  canvasEditor.canvas.clearHistory(false);
  canvasEditor.historyUpdate();
};

const beforeClear = () => {
  // Modal.confirm({
  //   title: t("tip"),
  //   content: `<p>${t("clearTip")}</p>`,
  //   okText: t("ok"),
  //   cancelText: t("cancel"),
  //   onOk: () => clear(),
  // });
};
const menu = ref(null);
const toggle = (event) => {
  menu.value.toggle(event);
};
const itemMenus = ref([
  {
    label: "",
    items: [
      {
        label: t("save.save_my_spase"),

        command: () => {
          saveWith("saveMyClould");
        },
      },
      {
        label: t("save.save_image"),

        command: () => {
          saveWith("saveImg");
        },
      },
      {
        label: t("save.save_svg"),
        command: () => {
          saveWith("saveSvg");
        },
      },
      {
        label: t("save.copy_to_clipboard"),
        command: () => {
          saveWith("clipboard");
        },
      },
      {
        label: t("save.copy_to_clipboardstr"),
        command: () => {
          saveWith("clipboardBase64");
        },
      },
      {
        label: t("save.save_as_json"),
        command: () => {
          saveWith("saveJson");
        },
      },
    ],
  },
]);
</script>

<style scoped lang="scss">
.save-box {
  display: inline-block;
  padding-right: 10px;
}
</style>

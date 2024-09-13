<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-08-16 17:47:21
 * @Description: 导入模板
-->

<template>
  <div>
    <!-- 搜索组件 -->
    <div class="search-box">
      <Select
        class="select"
        v-model="typeValue"
        :options="typeList"
        option-value="value"
        option-label="label"
        @change="changeSelectType"
        :disabled="pageLoading"
      >
      </Select>
      <InputText
        class="input"
        :placeholder="`在${typeText}中搜索`"
        v-model="searchKeyWord"
        search
        :disabled="pageLoading"
        @on-search="startGetList"
      />
    </div>
    <!-- 列表 -->
    <div style="height: calc(100vh - 108px)" id="myTemplBox">
      <div ref="listTmpl" class="list-box">
        <div v-for="item in pageData" :key="item" class="tmpl-img-box">
          <Image
            lazy
            :src="item.previewSrc"
            fit="contain"
            height="100%"
            :alt="item.name"
            @click="beforeClearTip(item)"
            :v-tooltip="item.name"
          />
        </div>
      </div>
      <div class="card flex justify-center">
        <ProgressSpinner v-if="pageLoading" />
      </div>
      <Divider plain v-if="isDownBottm">已经到底了</Divider>
    </div>
  </div>
  <BlockUI :blocked="blocked" fullScreen> </BlockUI>
  <ProgressSpinner v-if="blocked" class="sprin-full" />
</template>

<script setup name="ImportTmpl">
import { useInfiniteScroll } from "@vueuse/core";
import useSelect from "../hooks/select";
import usePageList from "../hooks/pageList";
// import { Spin, Modal } from "view-ui-plus";
import { debounce } from "lodash-es";

import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";

import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const { canvasEditor } = useSelect();

const {
  startPage,
  typeValue,
  typeText,
  typeList,
  pageLoading,
  pageData,
  searchKeyWord,
  isDownBottm,
  startGetList,
  nextPage,
  showScroll,
  scrollHeight,
  getInfo,
} = usePageList({
  typeUrl: "templ-types",
  listUrl: "templs",
  searchTypeKey: "templ_type",
  searchWordKey: "name",
  pageSize: 10,
  scrollElement: "#myTemplBox",
  fields: ["name"],
});
const blocked = ref(false);
typeValue.value = 4;
const listTmpl = ref();
const a = useInfiniteScroll(
  listTmpl,
  async () => {
    // load more
    await nextPage();
  },
  { distance: 10 }
);
// 替换提示
const beforeClearTip = (info) => {
  confirm.require({
    message: t("replaceTip"),
    header: t("tip"),
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: t("cancel"),
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: t("ok"),
    },
    accept: () => {
      getTempData(info);
    },
  });
  // Modal.confirm({
  //   title: t("tip"),
  //   content: `<p>${t("replaceTip")}</p>`,
  //   okText: t("ok"),
  //   cancelText: t("cancel"),
  //   onOk: () => getTempData(info),
  // });
};

onMounted(() => {
  startPage();
  getTemplInfo();
});

// 获取模板数据
const getTempData = async (info) => {
  blocked.value = true;
  const infoRes = await getInfo(info.id);
  if (route.query.admin) {
    router.replace("/?tempId=" + info.id + "&admin=true");
  } else {
    router.replace("/?tempId=" + info.id);
  }
  canvasEditor.loadJSON(
    JSON.stringify(infoRes.data.data.attributes.json),
    () => {
      blocked.value = false;
    }
    // Spin.hide
  );
};
const loadnext = async (event) => {
  const { first, last } = event;
  if (last > 0) {
    await nextPage();
  } else {
    await startPage();
  }
};
const getTemplInfo = async () => {
  if (route.query.tempId) {
    try {
      const infoRes = await getInfo(route.query.tempId);
      canvasEditor.loadJSON(
        JSON.stringify(infoRes.data.data.attributes.json)
        // Spin.hide
      );
    } catch (error) {
      console.log(error);
    }
  }
};

const changeSelectType = debounce(() => {
  startGetList();
}, 100);
</script>

<style scoped lang="scss">
.search-box {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  .input {
    margin-left: 10px;
  }
  .select {
    width: 100px;
  }
}

.list-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2px;
}

.tmpl-img-box {
  width: 122px;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    :deep(.ivu-image-img) {
      opacity: 0.8;
    }
  }
}
</style>

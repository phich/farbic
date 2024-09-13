<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-05-11 19:09:45
 * @Description: 公共尺寸
-->

<template>
  <Dialog
    v-model:visible="modal"
    :header="props.title"
    :style="{ width: '50rem' }"
  >
    <div class="card flex flex-col gap-4 w-4/5">
      <div class="font-semibold text-xl">
        {{ $t("importFiles.createDesign.customSize") }}
      </div>
      <div class="flex flex-wrap gap-4">
        <div class="flex flex-col grow basis-0 gap-2">
          <label for="width">width</label>
          <InputNumber id="width" type="text" v-model="width" fluid />
        </div>
        <div class="flex flex-col grow basis-0 gap-2">
          <label for="height">Height</label>
          <InputNumber id="height" type="text" v-model="height" />
        </div>
      </div>
      <Button type="primary" @click="customSizeCreate">
        {{ $t("importFiles.createDesign.create") }}
      </Button>
    </div>

    <Divider class="divider" />

    <h3>
      {{ $t("importFiles.createDesign.systemSize") }}
    </h3>
    <Listbox
      v-model="selectedCity"
      :options="sizeList"
      optionLabel="name"
      class="w-full"
      @update:model-value="setSize"
    >
      <template #option="slotProps">
        <div>
          {{
            `${slotProps.option.width} x ${slotProps.option.height} ${slotProps.option.unit}`
          }}
        </div>
      </template></Listbox
    >
  </Dialog>
</template>

<script name="ImportJson" setup>
import useSelect from "../../hooks/select";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const { canvasEditor } = useSelect();
const emit = defineEmits(["set"]);

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const modal = ref(false);
const width = ref(null);
const height = ref(null);
const sizeList = ref([]);
const showSetSize = (w, h) => {
  width.value = w || null;
  height.value = h || null;
  // 获取素材
  canvasEditor.getSizeList().then((res) => {
    sizeList.value = res;
  });
  modal.value = true;
};
const setSize = (itemString) => {
  width.value = Number(itemString.width);
  height.value = Number(itemString.height);
};

const customSizeCreate = async () => {
  if (width.value && height.value) {
    emit("set", width.value, height.value);
    modal.value = false;
  } else {
    toast.add({ severity: "warn", summary: "请检查尺寸", life: 3000 });
  }
};

defineExpose({
  showSetSize,
});
</script>
<style scoped lang="scss">
h3 {
  margin-bottom: 10px;
}
.divider {
  margin-top: 0;
}
</style>

<template>
  <Button
    class="color-bar"
    :style="{ background: model }"
    @click="toggle"
  ></Button>
  <!-- <template #content> -->
  <Popover ref="op">
    <Vue3ColorPicker
      v-model="model"
      @update:model-value="(value) => onchange(value)"
      type="RGBA"
      mode="solid"
      inputType="RGB"
      :showColorList="false"
      :showInputMenu="false"
      :showInputSet="false"
      :show-picker-mode="false"
    />
  </Popover>
</template>
<script setup>
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
const emit = defineEmits(["change"]);

const onchange = (value) => {
  emit("change", value);
};
const model = defineModel();

const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
};
</script>

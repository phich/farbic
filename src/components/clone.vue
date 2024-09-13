<template>
  <!-- <Tooltip :content="$t('quick.copy')"> -->
  <div v-if="mixinState.mSelectMode === 'one'">
    <Button
      long
      @click="clone"
      icon="pi pi-copy"
      text
      :v-tooltip="$t('quick.copy')"
    ></Button>
  </div>
  <!-- </Tooltip> -->
</template>

<script setup name="Clone">
import useSelect from "../hooks/select";
import { debounce } from "lodash-es";

const { mixinState, canvasEditor } = useSelect();
const clone = debounce(function () {
  canvasEditor.clone();
}, 300);
</script>

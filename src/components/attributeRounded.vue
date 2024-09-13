<!--
 * @Author: 秦少卫
 * @Date: 2024-05-21 10:18:57
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-05-26 22:59:26
 * @Description: 圆角
-->
<template>
  <div
    class="box attr-item-box"
    v-if="
      mixinState.mSelectMode === 'one' &&
      rectType.includes(mixinState.mSelectOneType)
    "
  >
    <!-- <h3>圆角</h3> -->
    <Divider plain orientation="left"><h4>Rounded Corners</h4></Divider>
    <!-- 通用属性 -->

    <div class="grid grid-cols-1 gap-2">
      <div class="flex flex-wrap gap-4 mt-3">
        <div class="flex flex-col grow basis-0 gap-2">
          <label for="rxry">{{ $t("attributes.rx_ry") }}</label>
          <Slider
            v-model="baseAttr.roundValue"
            :max="300"
            @update:model-value="(value) => changeCommon(value)"
          ></Slider>
        </div>
      </div>
      <div class="mt-3">
        <InputNumber
          v-model="baseAttr.roundValue"
          :min="0"
          :max="300"
          @update:model-value="(value) => changeCommon(value)"
        ></InputNumber>
      </div>
    </div>
  </div>
</template>

<script setup name="AttrBute">
import useSelect from "../hooks/select";

const update = getCurrentInstance();
const { mixinState, canvasEditor } = useSelect();

// 矩形元素
const rectType = ["rect"];

// 属性值
const baseAttr = reactive({
  roundValue: 0,
});

// 属性获取
const getObjectAttr = (e) => {
  const activeObject = canvasEditor.canvas.getActiveObject();
  // 不是当前obj，跳过
  if (e && e.target && e.target !== activeObject) return;
  if (activeObject) {
    baseAttr.roundValue = activeObject.get("roundValue");
  }
};

// 通用属性改变
const changeCommon = (value) => {
  const activeObject = canvasEditor.canvas.getActiveObjects()[0];
  if (activeObject) {
    activeObject.set("ry", value);
    activeObject.set("rx", value);
    activeObject.set("roundValue", value);
    canvasEditor.canvas.renderAll();
  }
};

const selectCancel = () => {
  update?.proxy?.$forceUpdate();
};

onMounted(() => {
  // 获取圆角数据
  getObjectAttr();
  canvasEditor.on("selectCancel", selectCancel);
  canvasEditor.on("selectOne", getObjectAttr);
  canvasEditor.canvas.on("object:modified", getObjectAttr);
});

onBeforeUnmount(() => {
  canvasEditor.off("selectCancel", selectCancel);
  canvasEditor.off("selectOne", getObjectAttr);
  canvasEditor.canvas.off("object:modified", getObjectAttr);
});
</script>

<style scoped lang="scss">
:deep(.ivu-input-number) {
  display: block;
  width: 100%;
}

:deep(.ivu-color-picker) {
  display: block;
}
.ivu-row {
  margin-bottom: 8px;
  .ivu-col {
    position: inherit;
    &__box {
      display: flex;
      align-items: center;
      background: #f8f8f8;
      border-radius: 4px;
      gap: 8px;
    }
  }

  .label {
    padding-left: 8px;
  }
  .content {
    flex: 1;
    :deep(.--input),
    :deep(.ivu-select-selection) {
      background-color: transparent;
      border: none !important;
      box-shadow: none !important;
    }
  }
}
</style>

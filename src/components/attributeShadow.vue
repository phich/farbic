<!--
 * @Author: 秦少卫
 * @Date: 2024-05-21 10:10:24
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-05-21 15:37:03
 * @Description: 阴影
-->

<template>
  <div class="box attr-item-box" v-if="mixinState.mSelectMode === 'one'">
    <!-- <h3>阴影</h3> -->
    <Divider plain orientation="left"><h4>Shadow</h4></Divider>
    <!-- 通用属性 -->

    <div class="grid grid-cols-2 gap-2">
      <div>
        <InputGroup>
          <InputGroupAddon>{{ $t("color") }}</InputGroupAddon>
          <PickerColor
            v-model="baseAttr.shadow.color"
            @change="changeCommon"
          ></PickerColor>
        </InputGroup>
      </div>
      <div>
        <InputGroup
          ><InputGroupAddon>{{ $t("attributes.blur") }} </InputGroupAddon>
          <InputNumber
            v-model="baseAttr.shadow.blur"
            :defaultValue="0"
            @update:model-value="changeCommon"
            :min="0"
            showButtons
          ></InputNumber>
        </InputGroup>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 mt-3">
      <div>
        <InputGroup>
          <InputGroupAddon>{{ $t("attributes.offset_x") }}</InputGroupAddon>
          <InputNumber
            v-model="baseAttr.shadow.offsetX"
            :defaultValue="0"
            @update:model-value="changeCommon"
            showButtons
          ></InputNumber>
        </InputGroup>
      </div>
      <div>
        <InputGroup>
          <InputGroupAddon>{{ $t("attributes.offset_y") }} </InputGroupAddon>
          <InputNumber
            v-model="baseAttr.shadow.offsetY"
            :defaultValue="0"
            @update:model-value="changeCommon"
            showButtons
          ></InputNumber>
        </InputGroup>
      </div>
    </div>
  </div>
  <!-- <Divider plain></Divider> -->
</template>

<script setup name="AttrBute">
import useSelect from "../hooks/select";

const update = getCurrentInstance();
const { fabric, mixinState, canvasEditor } = useSelect();

// 属性值
const baseAttr = reactive({
  shadow: {},
});

// 属性获取
const getObjectAttr = (e) => {
  const activeObject = canvasEditor.canvas.getActiveObject();
  // 不是当前obj，跳过
  if (e && e.target && e.target !== activeObject) return;
  if (activeObject) {
    baseAttr.shadow = activeObject.get("shadow") || {};
  }
};

// 通用属性改变
const changeCommon = () => {
  const activeObject = canvasEditor.canvas.getActiveObjects()[0];
  if (activeObject) {
    activeObject.set("shadow", new fabric.Shadow(baseAttr.shadow));
    canvasEditor.canvas.renderAll();
  }
};

const selectCancel = () => {
  update?.proxy?.$forceUpdate();
};

onMounted(() => {
  // 获取字体数据
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
const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
};
</script>

<style scoped lang="scss">
:deep(.ivu-input-number) {
  display: block;
  width: 100%;
}

:deep(.ivu-color-picker) {
  display: block;
}
.box {
  width: 100%;
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

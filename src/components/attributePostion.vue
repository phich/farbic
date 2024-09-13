<!--
 * @Author: 秦少卫
 * @Date: 2024-05-21 09:23:36
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-05-21 15:37:27
 * @Description: file content
-->
<template>
  <div class="box attr-item-box" v-if="mixinState.mSelectMode === 'one'">
    <!-- <h3>位置信息</h3> -->
    <Divider plain orientation="left"><h4>Location</h4></Divider>
    <!-- 通用属性 -->
    <div v-show="baseType.includes(mixinState.mSelectOneType)">
      <div class="grid grid-cols-2 gap-2">
        <div flex="1">
          <InputGroup>
            <InputGroupAddon> {{ $t("attributes.left") }} </InputGroupAddon>
            <InputNumber
              v-model="baseAttr.left"
              @update:model-value="(value) => changeCommon('left', value)"
              :append="$t('attributes.left')"
              showButtons
              fluid
            ></InputNumber>
          </InputGroup>
        </div>
        <div flex="1">
          <InputGroup>
            <InputGroupAddon> {{ $t("attributes.top") }} </InputGroupAddon>
            <InputNumber
              v-model:="baseAttr.top"
              @update:model-value="(value) => changeCommon('top', value)"
              showButtons
              fluid
            ></InputNumber>
          </InputGroup>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 mt-3">
        <div class="flex flex-col grow basis-0 gap-2">
          <label>{{ $t("attributes.angle") }}</label>
          <Slider
            v-model="baseAttr.angle"
            :max="360"
            @update:model-value="(value) => changeCommon('angle', value)"
          ></Slider>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 mt-3">
        <div class="flex flex-col grow basis-0 gap-2">
          <label>{{ $t("attributes.opacity") }}</label>
          <Slider
            v-model="baseAttr.opacity"
            @update:model-value="(value) => changeCommon('opacity', value)"
          ></Slider>
        </div>
      </div>
    </div>
    <!-- <Divider plain></Divider> -->
  </div>
</template>

<script setup name="AttrBute">
import useSelect from "../hooks/select";

const update = getCurrentInstance();
const { mixinState, canvasEditor } = useSelect();

// 可修改的元素
const baseType = [
  "text",
  "i-text",
  "textbox",
  "rect",
  "circle",
  "triangle",
  "polygon",
  "image",
  "group",
  "line",
  "arrow",
  "thinTailArrow",
];

// 属性值
const baseAttr = reactive({
  opacity: 0,
  angle: 0,
  left: 0,
  top: 0,
  rx: 0,
  ry: 0,
});

// 属性获取
const getObjectAttr = (e) => {
  const activeObject = canvasEditor.canvas.getActiveObject();
  // 不是当前obj，跳过
  if (e && e.target && e.target !== activeObject) return;
  if (activeObject && baseType.includes(activeObject.type)) {
    baseAttr.opacity = activeObject.get("opacity") * 100;
    baseAttr.left = activeObject.get("left");
    baseAttr.top = activeObject.get("top");
    baseAttr.angle = activeObject.get("angle") || 0;
  }
};

// 通用属性改变
const changeCommon = (key, value) => {
  const activeObject = canvasEditor.canvas.getActiveObjects()[0];
  if (activeObject) {
    // 透明度特殊转换
    if (key === "opacity") {
      activeObject && activeObject.set(key, value / 100);
      canvasEditor.canvas.renderAll();
      return;
    }
    // 旋转角度适配
    if (key === "angle") {
      activeObject.rotate(value);
      canvasEditor.canvas.renderAll();
      return;
    }
    activeObject && activeObject.set(key, value);
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
</script>

<style scoped lang="scss">
:deep(.ivu-input-number) {
  display: block;
  width: 100%;
}

.ivu-form-item {
  background: #f6f7f9;
  border-radius: 5px;
  padding: 0 5px;
  margin-bottom: 10px;
}

.ivu-row {
  margin-bottom: 10px;
}
</style>

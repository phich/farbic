<template>
  <div class="box" v-if="mixinState.mSelectMode === 'one' && isImage">
    <!-- <Divider plain orientation="left">图像描边</Divider> -->
    <Divider plain orientation="left">
      <h4>Image Stroke</h4>
    </Divider>
    <div class="hd-wrap">
      <div class="hd">
        <span>Enable image strokes</span>
        <i
          class="pi pi-exclamation-circle"
          style="color: #f34250"
          v-tooltip="`Only supports png transparent images`"
        ></i>
      </div>
      <ToggleSwitch
        v-model="openImgStroke"
        @update:model-value="onSwitchChange"
        aria-label="Remember Me"
      />
      <!-- <iSwitch
        v-model="openImgStroke"
        size="large"
        class="switch"
        @on-change="onSwitchChange"
      >
        <template #open>
          <span>开启</span>
        </template>
        <template #close>
          <span>关闭</span>
        </template>
      </iSwitch> -->
    </div>

    <template v-if="openImgStroke">
      <div class="hd-wrap">
        <div class="hd">
          <span>Whether to show only strokes</span>
        </div>
        <ToggleSwitch
          v-model="isOnlyStroke"
          @update:model-value="updateStroke"
          aria-label="Remember Me"
        />
        <!-- <iSwitch
          v-model="isOnlyStroke"
          size="large"
          class="switch"
          @on-change="updateStroke"
        >
          <template #open>
            <span>是</span>
          </template>
          <template #close>
            <span>否</span>
          </template>
        </iSwitch> -->
      </div>
      <div class="operation">
        <div class="hd" style="flex-basis: 98px">
          <span>Stroke Size</span>
        </div>
        <div style="width: 100%">
          <Slider
            v-model="strokeWidth"
            :max="50"
            @change="onSliderChange"
          ></Slider>
        </div>
      </div>

      <div class="operation" style="justify-content: space-between">
        <div class="hd">
          <span>Stroke Color</span>
        </div>

        <div>
          <ColorPicker
            v-model="strokeColor"
            @update:model-value="onColorChange"
            placement="left"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script name="ImgStroke" lang="ts" setup>
import useSelect from "../hooks/select";
// import { Slider } from "view-ui-plus";
import { fabric } from "fabric";
import { Utils } from "@kuaitu/core";

interface IExtendImage {
  [x: string]: any;
  originWidth?: number;
  originHeight?: number;
  originSrc?: string;
}

const { mixinState, canvasEditor } = useSelect();
const isImage = ref(false);
const openImgStroke = ref(false);
const strokeWidth = ref(5);
const strokeColor = ref("#000");
const isOnlyStroke = ref(false);
const getActiveObject = (): (fabric.Image & IExtendImage) | undefined => {
  const activeObject = canvasEditor.fabricCanvas?.getActiveObject();
  if (!activeObject || !Utils.isImage(activeObject)) return;
  return activeObject;
};

const setOrigin = () => {
  const _activeObject = getActiveObject();
  if (!_activeObject) return;
  _activeObject.set("originWidth", _activeObject?.get("width"));
  _activeObject.set("originHeight", _activeObject?.get("height"));
  _activeObject.set("originSrc", _activeObject?.getSrc());
};

const updateStroke = () => {
  const strokeType = unref(isOnlyStroke) ? "destination-out" : "source-over";
  canvasEditor.imageStrokeDraw(
    unref(strokeColor),
    unref(strokeWidth),
    strokeType
  );
};

const closeImgStroke = () => {
  strokeWidth.value = 0;
  updateStroke();
};

const onSwitchChange = async (val: boolean) => {
  if (val) {
    unref(strokeWidth) === 0 && (strokeWidth.value = 5);
    setOrigin();
    updateStroke();
  } else {
    closeImgStroke();
  }
};

const onSliderChange = (val: number) => {
  strokeWidth.value = val;
  updateStroke();
};

const onColorChange = (val: string) => {
  strokeColor.value = val;
  updateStroke();
};

const handleSelectOne = () => {
  isImage.value = !!getActiveObject();
};

onMounted(() => {
  canvasEditor.on("selectOne", handleSelectOne);
});

onBeforeUnmount(() => {
  canvasEditor.off("selectOne", handleSelectOne);
});
</script>

<style lang="scss" scoped>
// :deep(.ivu-divider-plain) {
//   &.ivu-divider-with-text-left {
//     margin: 10px 0;
//     font-weight: bold;
//     font-size: 16px;
//     color: #000000;
//   }
// }
.box {
  margin-bottom: 20px;
  .hd-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .hd {
      flex: 1;
      & > span {
        margin-right: 5px;
      }
    }
  }
  .operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .slide-wrap {
      width: 100%;
    }
  }
}
</style>

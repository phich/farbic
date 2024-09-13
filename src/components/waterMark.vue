<!--
 * @Author: June
 * @Description:
 * @Date: 2023-11-01 11:54:10
 * @LastEditors: 秦少卫
 * @LastEditTime: 2024-04-22 00:51:43
-->
<template>
  <Button text @click="addWaterMark" style="width: auto">
    {{ $t("waterMark.text") }}
  </Button>

  <Dialog v-model:visible="showWaterMadal" :title="$t('waterMark.modalTitle')">
    <div class="setting-item required">
      <span class="mr-10px">{{ $t("waterMark.setting.name") }}</span>
      <InputText
        class="w-320"
        v-model="waterMarkState.text"
        maxlength="15"
        show-word-limit
        :placeholder="$t('placeholder')"
      />
    </div>
    <div class="setting-item font-selector">
      <span class="mr-10px">Choise font</span>
      <Select
        class="w-320"
        v-model="waterMarkState.fontFamily"
        :options="fontsList"
        @on-change="changeFontFamily"
      >
        <template #option="{ option }">
          <div class="flex items-center">
            <div class="font-item" v-if="!option.value.item.img">
              {{ option.value.item.name }}
            </div>
            <div
              class="font-item"
              v-else
              :style="`background-image:url('${option.value.item.img}');`"
            >
              {{ !option.value.item.img ? option.value.item : "" }}
              <!-- 解决无法选中问题 -->
              <span style="display: none">{{ option.value.item.name }}</span>
            </div>
          </div>
        </template>
      </Select>
    </div>
    <div class="setting-item">
      <span class="mr-10px">{{ $t("waterMark.setting.size") }}</span>

      <Slider
        class="w-320"
        v-model="waterMarkState.size"
        :min="18"
        :max="48"
      ></Slider>
    </div>
    <div class="setting-item">
      <span class="mr-10px">{{ $t("waterMark.setting.color") }}</span>
      <PickerColor v-model="waterMarkState.color"></PickerColor>
      <!-- <ColorPicker v-model="waterMarkState.color" alpha size="small" /> -->
    </div>
    <div class="setting-item">
      <span class="mr-10px">{{ $t("waterMark.setting.position.label") }}</span>
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center">
          <RadioButton
            :value="POSITION.lt"
            v-model="waterMarkState.position"
            name="position"
          ></RadioButton>
          <label for="ingredient2" class="ml-2">{{
            $t("waterMark.setting.position.lt")
          }}</label>
        </div>
        <div class="flex items-center">
          <RadioButton
            :value="POSITION.rt"
            v-model="waterMarkState.position"
            name="position"
          ></RadioButton>
          <label for="ingredient2" class="ml-2">{{
            $t("waterMark.setting.position.rt")
          }}</label>
        </div>
        <div class="flex items-center">
          <RadioButton
            :value="POSITION.lb"
            v-model="waterMarkState.position"
            name="position"
          ></RadioButton>
          <label for="ingredient2" class="ml-2">{{
            $t("waterMark.setting.position.lb")
          }}</label>
        </div>
        <div class="flex items-center">
          <RadioButton
            :value="POSITION.rb"
            v-model="waterMarkState.position"
            name="position"
          ></RadioButton>
          <label for="ingredient2" class="ml-2">{{
            $t("waterMark.setting.position.rb")
          }}</label>
        </div>
        <div class="flex items-center">
          <RadioButton
            :value="POSITION.full"
            v-model="waterMarkState.position"
            name="position"
          ></RadioButton>
          <label for="ingredient2" class="ml-2">{{
            $t("waterMark.setting.position.full")
          }}</label>
        </div>
      </div>
    </div>
    <div
      class="setting-item"
      v-show="waterMarkState.position === POSITION.full"
    >
      <span class="mr-10px">{{ $t("waterMark.setting.angle") }}</span>

      <div class="flex flex-wrap gap-4">
        <div class="flex items-center">
          <RadioButton
            :value="0"
            v-model="waterMarkState.isRotate"
            name="isRotate"
          ></RadioButton>
          <label for="ingredient2" class="ml-2">{{
            $t("waterMark.setting.isRotate.horizontal")
          }}</label>
        </div>
        <div class="flex items-center">
          <RadioButton
            :value="1"
            v-model="waterMarkState.isRotate"
            name="isRotate"
          ></RadioButton>
          <label for="ingredient2" class="ml-2">{{
            $t("waterMark.setting.isRotate.vertical")
          }}</label>
        </div>
      </div>
    </div>
    <template #footer>
      <Button text @click="onCleanUpWaterMark">
        {{ `${$t("cleanUp")}${$t("waterMark.text")}` }}
      </Button>
      <Button @click="onModalOk">确定</Button>
    </template>
  </Dialog>
</template>

<script name="WaterMark" setup lang="ts">
import { cloneDeep, debounce } from "lodash-es";
import useSelect from "../hooks/select";
// import { useFont } from '@/hooks';
// import { Message } from "view-ui-plus";
enum POSITION {
  lt = "Left_Top",
  lb = "Left_Right",
  rt = "Right_Top",
  rb = "Right_Bottom",
  full = "Full",
}

type IPosition =
  | POSITION.lt
  | POSITION.lb
  | POSITION.rt
  | POSITION.rb
  | POSITION.full; // lt 左上 lr 左上 rt 右上  rb 右下 full 平铺 后续可扩展其他功能

type IDrawOps = {
  text: string;
  size: number;
  fontFamily: string;
  color: string;
  isRotate: boolean;
  position: IPosition;
};
const { canvasEditor }: any = useSelect();

const fontsList: any = ref([]);
canvasEditor.getFontList().then((list: any) => {
  fontsList.value = list;
});
const waterMarkState: any = reactive({
  text: "",
  size: 24,
  isRotate: 0, // 组件不支持boolean
  fontFamily: "汉体", // 可考虑自定义字体
  color: "#ccc", // 可考虑自定义颜色
  position: POSITION.lt, // lt 左上 rt 右上 lb 左下  rb 右下 full 平铺
});

const showWaterMadal = ref(false);

const onCleanUpWaterMark = () => {
  waterMarkState.text = "";
  waterMarkState.size = 24;
  waterMarkState.fontFamily = "serif";
  waterMarkState.color = "#ccc";
  waterMarkState.position = POSITION.lt;
  waterMarkState.isRotate = 0;
  canvasEditor.clearWaterMMatk();
  showWaterMadal.value = false;
};

const onModalOk = async () => {
  // if (!waterMarkState.text) return Message.warning("水印名字不能为空");
  const ops: IDrawOps = cloneDeep(waterMarkState);
  ops.isRotate = !!ops.isRotate; // 转为对应类型  后续再统一处理类型
  await canvasEditor.drawWaterMark(ops);
  showWaterMadal.value = false;
  // onMadalCancel();
};

const changeFontFamily = (fontName: string) => {
  if (!fontName) return;
  canvasEditor.loadFont(fontName);
};

const addWaterMark = debounce(function () {
  showWaterMadal.value = true;
}, 250);
</script>

<style lang="scss" scoped>
.mr-10px {
  margin-right: 10px;
}
.w-320 {
  width: 320px;
}
.setting-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  &.required::before {
    content: "*";
    color: red;
    position: absolute;
    top: 3px;
    left: -6px;
  }
}
.font-selector {
  :deep(.ivu-select-item) {
    padding: 1px 4px;
  }

  .font-item {
    height: 40px;
    width: 330px;
    background-size: auto 40px;
    background-repeat: no-repeat;
  }
}
</style>

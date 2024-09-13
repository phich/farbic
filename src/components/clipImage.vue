<template>
  <div
    v-if="mixinState.mSelectMode === 'one' && type === 'image'"
    class="attr-item-box"
  >
    <div class="bg-item ivu-mb-8">
      <Button type="button" :label="$t('createClip')" @click="toggle"></Button>
      <Popover ref="op">
        <div class="flex flex-col gap-4">
          <div>
            <ul class="list-none p-0 m-0 flex flex-col">
              <li
                v-for="item in options"
                :key="item.key"
                class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                @click="addClipPath(item.value)"
              >
                <div>
                  <span class="font-medium">{{ item.label }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Popover>
      <!-- <SplitButton
        :label="$t('createClip')"
        icon="pi pi-check"
        dropdownIcon=""
        :model="options"
        class="w-full"
      /> -->
      <!-- <Dropdown style="width: 270px" @on-click="addClipPath">
        <Button type="text" long>{{ $t("createClip") }}</Button>
        <template #list>
          <DropdownMenu>
            <DropdownItem
              v-for="item in options"
              :key="item.value"
              :name="item.value"
            >
              {{ item.label }}
            </DropdownItem>
          </DropdownMenu>
        </template>
      </Dropdown> -->
    </div>
    <div class="bg-item">
      <Button @click="removeClip" type="text" long>{{
        $t("removeClip")
      }}</Button>
    </div>
  </div>
</template>

<script setup name="ReplaceImg">
import useSelect from "../hooks/select";
import { useI18n } from "vue-i18n";

const update = getCurrentInstance();
// const canvasEditor = inject('canvasEditor');
const { mixinState, canvasEditor } = useSelect();
const { t } = useI18n();
const type = ref("");
const options = [
  {
    label: t("polygonClip"),
    value: "polygon",
    command: () => {
      addClipPath("polygon");
    },
  },
  {
    label: t("rectClip"),
    value: "rect",
    command: () => {
      addClipPath("rect");
    },
  },
  {
    label: t("circleClip"),
    value: "circle",
    command: () => {
      addClipPath("circle");
    },
  },
  {
    label: t("triangleClip"),
    value: "triangle",
    command: () => {
      addClipPath("triangle");
    },
  },
  {
    label: t("polygonClipInverted"),
    value: "polygon-inverted",
    command: () => {
      addClipPath("polygon-inverted");
    },
  },
  {
    label: t("rectClipInverted"),
    value: "rect-inverted",
    command: () => {
      addClipPath("rect-inverted");
    },
  },
  {
    label: t("circleClipInverted"),
    value: "circle-inverted",
    command: () => {
      addClipPath("circle-inverted");
    },
  },
  {
    label: t("triangleClipInverted"),
    value: "triangle-inverted",
    command: () => {
      addClipPath("triangle-inverted");
    },
  },
];
const addClipPath = async (name) => {
  canvasEditor.addClipPathToImage(name);
};
const removeClip = () => {
  canvasEditor.removeClip();
};
const init = () => {
  const activeObject = canvasEditor.canvas.getActiveObjects()[0];
  if (activeObject) {
    type.value = activeObject.type;
    update?.proxy?.$forceUpdate();
  }
};
const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
};
onMounted(() => {
  canvasEditor.on("selectOne", init);
});

onBeforeUnmount(() => {
  canvasEditor.off("selectOne", init);
});
</script>
<style lang="scss" scoped>
.attr-item-box {
  margin-top: 8px;
}
</style>

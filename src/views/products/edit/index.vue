<template>
  <Fluid>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="card flex flex-col gap-4 w-4/5">
        <div class="font-semibold text-xl">Product</div>
        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col grow basis-0 gap-2">
            <label for="name2">Name</label>
            <InputText id="name2" type="text" v-model="product.name" />
          </div>
          <div class="flex flex-col grow basis-0 gap-2">
            <label for="email2">Slug</label>
            <InputText id="email2" type="text" />
          </div>
        </div>
        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col grow basis-0 gap-2">
            <label for="description">Description</label>
            <Editor v-model="product.description" editorStyle="height: 320px" />
          </div>
        </div>
      </div>
      <div class="card flex flex-col gap-4 w-1/5">
        <div class="font-semibold text-xl">Organization</div>
        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col grow basis-0 gap-2">
            <label for="name2">Pbase</label>
            <Select
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="Select a pbase"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col grow basis-0 gap-2">
            <label for="name2">Design</label>
            <Select
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              placeholder="Select a design"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col grow basis-0 gap-2">
            <label for="name2">Collections</label>
            <AutoComplete
              inputId="collections"
              multiple
              fluid
              :suggestions="items"
              v-model="product.collections"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col grow basis-0 gap-2">
            <label for="name2">Tags</label>
            <AutoComplete
              inputId="tag"
              multiple
              fluid
              :suggestions="items"
              v-model="product.tags"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="card flex flex-col gap-4">
      <div class="flex flex-col grow basis-0 gap-4">
        <div class="font-semibold text-xl">
          Media({{ product.images.length }}/500)
        </div>
        <FileUpload
          mode="basic"
          name="demo[]"
          url="/api/upload"
          accept="image/*"
          :maxFileSize="1000000"
          multiple="true"
          @upload="onUpload"
          :auto="true"
          chooseLabel="Browse"
        />
        <div class="grid grid-cols-6 grid-flow-row gap-4">
          <div class="row-span-2 col-span-2 bg-black">
            <Image
              :src="product.image.thumbnailImageSrc"
              preview
              :alt="product.image.alt"
              width="100%"
              class="w-full"
            />
          </div>
          <div
            v-for="image in images"
            :key="image.title"
            class="col-span-1 col-span-1"
          >
            <Image preview :alt="image.alt" class="w-full">
              <template #image>
                <img :src="image.thumbnailImageSrc" alt="image" width="100%" />
              </template>
              <template #preview="slotProps">
                <img
                  :src="image.itemImageSrc"
                  alt="preview"
                  :style="slotProps.style"
                  @click="slotProps.onClick"
                /> </template
            ></Image>
          </div>
        </div>
      </div>
    </div>

    <div class="card flex flex-col gap-4">
      <div class="font-semibold text-xl">Variants</div>
      <Button
        type="button"
        shape="circle"
        icon="pi pi-plus"
        @click="addVarriant"
      ></Button>
      <div class="flex flex-wrap gap-4" v-for="item in variants" :key="item.id">
        <div class="flex flex-col grow basis-0 gap-2">
          <label>Name</label>
          <InputText
            v-model="item.name"
            placeholder="Enter your name"
          ></InputText>
        </div>
        <div class="flex flex-col grow basis-0 gap-2">
          <label>Value</label>
          <AutoComplete
            v-model="item.value"
            inputId="multiple-ac-2"
            multiple
            fluid
            :typeahead="false"
          />
        </div>
      </div>
    </div>
    <Button type="button" @click="handleSubmit">Submit</Button>
  </Fluid>
</template>
<script setup>
import { uniqueId } from "lodash-es";

const formValidate = ref(null);
const product = ref({
  name: "",
  slug: "",
  description: "",
  variants: [],
  collections: [],
  tags: [],
  image: {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },

  images: [],
});
const variants = ref([]);
const images = ref([
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
]);
const handleSubmit = () => {
  console.log(product);
  console.log(variants);
};
const addVarriant = () => {
  variants.value.push({
    id: uniqueId(),
    name: "",
    value: [],
  });
};

const removeVarriant = (id) => {
  variants.value = variants.value.filter((i) => i.id != id);
};

const search = (event) => {
  items.value = [...Array(10).keys()].map((item) => event.query + "-" + item);
};
</script>

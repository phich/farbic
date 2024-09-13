<template>
  <DataTable :value="products" tableStyle="min-width: 50rem">
    <Column field="slug" header="Slug"></Column>
    <Column field="name" header="Name"></Column>
    <Column header="Image">
      <template #body="slotProps">
        <img
          :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
          :alt="slotProps.data.image"
          class="w-24 rounded"
        />
      </template>
    </Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
    <Column field="action" header="Action">
      <Button icon="pi pi-pencil" severity="danger" rounded aria-label="Edit" />
      <Button
        icon="pi pi-times"
        severity="danger"
        rounded
        aria-label="Cancel"
      />
    </Column>
  </DataTable>

  <Paginator
    :rows="10"
    :totalRecords="totalRecords"
    :rowsPerPageOptions="[10, 20, 30]"
    @page="onChangePage"
  ></Paginator>
</template>

<script setup>
const data = [
  {
    name: "John Brown",
    age: 18,
    address: "New York No. 1 Lake Park",
  },
  {
    name: "Jim Green",
    age: 24,
    address: "London No. 1 Lake Park",
  },
  {
    name: "Joe Black",
    age: 30,
    address: "Sydney No. 1 Lake Park",
  },
  {
    name: "Jon Snow",
    age: 26,
    address: "Ottawa No. 2 Lake Park",
  },
];
const page = ref(1);
const totalRecords = ref(20);
const onChangePage = (event) => {};
</script>

<style></style>

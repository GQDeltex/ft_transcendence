<script setup lang="ts">
import StreamCategoryComponent from '../components/StreamCategoryComponent.vue';
import CategorySearchComponent from '../components/CategorySearchComponent.vue';
</script>

<template>
  <div>
    <CategorySearchComponent />
  </div>
  <div>
    <StreamCategoryComponent category-name="Top Rated" />
    <StreamCategoryComponent category-name="Most Popular" />
  </div>
</template>

<style scoped></style>

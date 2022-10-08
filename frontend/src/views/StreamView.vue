<script setup lang="ts">
import StreamCategoryComponent from '../components/StreamCategoryComponent.vue';
import SearchComponent from '../components/SearchComponent.vue';
</script>

<template>
  <div>
    <SearchComponent />
  </div>
  <div>
    <StreamCategoryComponent category-name="Top Rated" />
    <StreamCategoryComponent category-name="Most Popular" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import StreamCategoryComponent from '../components/StreamCategoryComponent.vue';
import CategorySearchComponent from '../components/CategorySearchComponent.vue';
import StreamGameComponent from '../components/StreamGameComponent.vue';
import SearchResultComponent from '../components/SearchResultComponent.vue';
</script>

<template>
  <div>
    <CategorySearchComponent />
  </div>
  <div>
    <SearchResultComponent
      search-term="placeholder"
      :component-type="StreamGameComponent"
    />
    <StreamCategoryComponent category-name="Top Rated" />
    <StreamCategoryComponent category-name="Most Popular" />
  </div>
</template>

<style scoped></style>

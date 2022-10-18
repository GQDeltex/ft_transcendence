<script setup lang="ts">
import ParentStreamComponent from '../components/stream/ParentStreamComponent.vue';
import CategorySearchComponent from '../components/landingview/CategorySearchComponent.vue';
import ChildStreamComponent from '../components/stream/ChildStreamComponent.vue';
import SearchResultComponent from '../components/stream/SearchResultComponent.vue';
</script>

<template>
  <div>
    <CategorySearchComponent />
  </div>
  <div>
    <SearchResultComponent
      search-term="placeholder"
      :component-type="ChildStreamComponent"
    />
    <ParentStreamComponent category-name="Top Rated" />
    <ParentStreamComponent category-name="Most Popular" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import CategoryComponent from '../components/landingview/CategoryComponent.vue';
import { useI18n } from 'vue-i18n';
</script>

<template>
  <CategoryComponent :category="useI18n().t('category') + ' I'" />
</template>

<style scoped></style>

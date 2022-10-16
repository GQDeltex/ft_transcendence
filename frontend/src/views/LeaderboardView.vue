<script setup lang="ts">
import LeaderboardCategoryComponent from '../components/LeaderboardCategoryComponent.vue';
import { useI18n } from 'vue-i18n';
</script>

<template>
  <LeaderboardCategoryComponent
    :category-name="useI18n().t('topviewedplayer')"
  />
  <LeaderboardCategoryComponent
    :category-name="useI18n().t('topperformplayer')"
  />
</template>

<style scoped></style>

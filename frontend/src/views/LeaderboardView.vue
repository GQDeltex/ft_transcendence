<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ParentLeaderboardComponent from '../components/leaderboard/ParentLeaderboardComponent.vue';
</script>

<template>
  <ParentLeaderboardComponent
    :category-name="useI18n().t('topperformplayer')"
  />
</template>

<style scoped></style>

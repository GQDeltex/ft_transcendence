<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
  medalName: string;
  medalKind: string;
}>();
</script>

<template>
  <div>
    <router-link to="/profile">
      <div>
        <img
          class="gilohm"
          src="@/assets/sexy-guy-001-modified.png"
          width="100"
          height="100"
        />
        <img :src="medalKind" class="gold" width="30" height="30" />
        <span class="playername">{{ medalName }}</span>
      </div>
    </router-link>
    <span class="sub">{{
      useI18n().t('matches', { n: useI18n().n(455, 'shortnumber') }, 2)
    }}</span>
    <span class="sub">{{
      useI18n().t('views', { n: useI18n().n(3000000000, 'shortnumber') }, 2)
    }}</span>
  </div>
</template>

<style scoped>
div {
  display: grid;
  margin: auto;
}
.playername {
  display: flex;
  justify-content: center;
  color: white;
  text-decoration: none;
}
.sub {
  color: grey;
  font-size: 0.7em;
  display: flex;
  justify-content: center;
}
.gilohm {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.gold {
  position: relative;
  bottom: calc(1em / 2 + 20px);
  right: calc(100% / -2 + 50px);
}
</style>

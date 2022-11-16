<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import type { User } from '@/store/user';

defineProps<{
  medalPlayer: Partial<User>;
  medalKind: string;
}>();
</script>

<template>
  <div>
    <router-link class="routerlink" :to="`/profile/${medalPlayer.id}`">
      <div>
        <RoundPictureComponent
          v-if="medalPlayer.picture"
          class="gilohm"
          :picture="medalPlayer.picture"
          size="100px"
          border-color="transparent"
        />
        <img :src="medalKind" class="gold" width="30" height="30" />
        <span class="playername">{{ medalPlayer.username }}</span>
      </div>
    </router-link>
    <span class="sub">{{
      useI18n().t('points', { n: useI18n().n(medalPlayer.points, 'shortnumber') }, 2)
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
.routerlink {
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

<script setup lang="ts">
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import type { User } from '@/store/user';

defineProps<{
  medalPlayer: Partial<User>;
  medalKind: string;
}>();
</script>

<template>
  <div>
    <router-link :to="`/profile/${medalPlayer.id}`">
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
    <span class="sub">{{ medalPlayer.points }} Points</span>
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
  color: var(--main-2-color);
  text-decoration: none;
}
.sub {
  color: var(--main-3-color);
  font-size: var(--main-small-font-size);
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

<script setup lang="ts">
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import type { User } from '@/store/user';

defineProps<{
  player: Partial<User>;
}>();
</script>

<template>
  <div>
    <router-link :to="`/profile/${player.id}`">
      <div>
        <RoundPictureComponent
          v-if="player.picture"
          :picture="player.picture"
          size="100px"
          border-color="transparent"
        />
        <img
          class="mty"
          src="@/assets/pongking_boi_empty.png"
          width="30"
          height="30"
        />
        <span class="playername">{{ player.username }}</span>
      </div>
    </router-link>
    <span class="sub">{{ player.points }} Points</span>
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
.mty {
  position: relative;
  bottom: calc(1em / 2 + 20px);
  right: calc(100% / -2 + 50px);
}
</style>

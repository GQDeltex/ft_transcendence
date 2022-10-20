<script setup lang="ts">
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import ImportedPicture from '@/assets/sexy-guy-001-modified.png';

defineProps<{
  medalName: string;
  medalKind: string;
}>();
</script>

<template>
  <div>
    <router-link to="/profile">
      <div>
        <RoundPictureComponent
          class="gilohm"
          :picture="ImportedPicture"
          size="100px"
          border-color="transparent"
        />
        <img :src="medalKind" class="gold" width="30" height="30" />
        <span class="playername">{{ medalName }}</span>
      </div>
    </router-link>
    <span class="sub">455 Matches</span>
    <span class="sub">3 Mio. Views</span>
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

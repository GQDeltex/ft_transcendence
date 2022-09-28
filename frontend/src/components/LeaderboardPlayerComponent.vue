<script setup lang="ts">
defineProps<{
  playerName: string;
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
        <img
          class="mty"
          src="@/assets/pongking_boi_empty.png"
          width="30"
          height="30"
        />
        <span class="playername">{{ playerName }}</span>
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
  display :block;
  margin-left: auto;
  margin-right: auto;
}
.mty {
  position: relative;
  bottom: calc(1em / 2 + 20px);
  right: calc(100% / -2 + 50px);
}
</style>

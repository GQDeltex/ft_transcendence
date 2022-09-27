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
          src="@/assets/sexy-guy-001-modified.png"
          width="100"
          height="100"
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
</style>

<script setup lang="ts">
defineProps<{
  header: string;
  text: string;
  picture: string;
}>();
</script>

<template>
  <div class="achieve">
    <img alt="page logo" class="logo" src="@/assets/pongking_boi.svg" />
    <p class="infoBox">
      {{ header }}: <span class="info"> {{ text }}</span>
    </p>
  </div>
</template>

<style scoped>
.achieve {
  display: flex;
  align-items: center;
  gap: 1vw;
  /* grid-column: 1 / 2; */
  padding: 1vw;
}

.infoBox {
  /* grid-column: 2 / 4; */
  font-size: var(--main-title-font-size);
  color: var(--main-3-color);
}

.info {
  color: var(--main-2-color);
}

.logo {
  object-fit: cover;
  /* grid-column: 1 / 2; */
  object-position: 50% 0%;
  border-radius: 50%;
  border: 1px solid var(--main-1-color);
  height: 5vw;
  width: 5vw;
}
</style>

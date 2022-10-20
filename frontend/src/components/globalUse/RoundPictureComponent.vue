<script setup lang="ts">
const props = defineProps<{
  picture: string;
  size: string;
  borderColor: string;
}>();
</script>

<template>
  <img
    :style="{ width: size, height: size, 'border-color': borderColor }"
    alt="profile picture"
    class="ppicture"
    :src="props.picture"
    :border-color="props.borderColor"
  />
</template>

<style>
.ppicture {
  border-radius: 50%;
  object-position: 50% 0%;
  border: 1px solid;
  object-fit: cover;
}
</style>

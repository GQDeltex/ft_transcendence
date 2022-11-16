<script setup lang="ts">
const props = defineProps({
  picture: { type: String, required: true },
  size: { type: String, required: true },
  borderColor: { type: String, required: true },
  isNotified: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <div class="item">
    <span v-show="isNotified" class="notify-badge">NEW</span>
    <img alt="profile picture" class="pictureStyle" :src="props.picture" />
  </div>
</template>

<style>
.item {
  position: relative;
}

.notify-badge {
  position: absolute;
  right: 1vw;
  background: red;
  text-align: center;
  border-radius: 0.3vw;
  color: white;
  padding: 0.05vw 0.1vw;
  font-size: 0.3vw;
}

.pictureStyle {
  border-radius: 50%;
  object-position: 50% 0;
  border: 1px solid v-bind(borderColor);
  object-fit: cover;
  width: v-bind(size);
  height: v-bind(size);
}
</style>

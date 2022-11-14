<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  channelId: number;
  channelName: string;
  picture: string;
  selectedChannel: string;
  isUserInside: boolean;
}>();

const activeChannel = computed(() => {
  if (props.channelName === props.selectedChannel) return { color: '#c00000' };
  if (!props.isUserInside) return { color: 'grey' };
  else return { color: 'white' };
});

const activePicture = computed(() => {
  if (props.channelName === props.selectedChannel)
    return { 'border-color': '#c00000' };
  if (!props.isUserInside) return { 'border-color': 'grey' };
  else return { 'border-color': 'white' };
});
</script>

<template>
  <div class="channel">
    <img
      class="picture"
      alt="channel picture"
      src="@/assets/xmas.png"
      :style="activePicture"
    />
    <div class="infoBox">
      <span class="channelName" :style="activeChannel">{{ channelName }}</span>
    </div>
  </div>
</template>

<style scoped>
.channel {
  display: flex;
  align-items: center;
  padding-top: 1%;
}
.infoBox {
  display: flex;
  flex-direction: column;
  padding-left: 5%;
}
.picture {
  object-fit: cover;
  object-position: 50% 0%;
  height: 1.5vw;
  width: 1.5vw;
  border-radius: 50%;
  border: 1px solid white;
  font-size: 1vw;
}
.channelName {
  color: white;
  font-size: 0.8vw;
  font-stretch: expanded;
}
</style>

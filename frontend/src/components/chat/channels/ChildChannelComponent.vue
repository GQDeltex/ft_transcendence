<script setup lang="ts">
import { CI } from '@/CI';
import { computed, ref } from 'vue';

const ci = ref<typeof CI>(CI);

const props = defineProps<{
  channelId: number;
  channelName: string;
  picture: string;
  selectedChannel: string;
  isUserInside: boolean;
}>();

const activeChannel = computed(() => {
  // if (props.channelName === props.selectedChannel) return { color: '#f8971d' };
  if (props.channelName === props.selectedChannel)
    return { color: ci.value.color1 };
  if (!props.isUserInside) return { color: ci.value.color3 };
  else return { color: ci.value.color2 };
});

const activePicture = computed(() => {
  if (props.channelName === props.selectedChannel)
    return { 'border-color': ci.value.color1 };
  if (!props.isUserInside) return { 'border-color': ci.value.color3 };
  else return { 'border-color': ci.value.color2 };
});
</script>

<template>
  <div class="channel">
    <img
      class="picture"
      alt="channel picture"
      src="@/assets/pongking_boi.svg"
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
  border: 1px solid var(--main-2-color);
  font-size: var(--main-text-font-size);
}
.channelName {
  color: var(--main-2-color);
  font-size: var(--main-small-font-size);
  font-stretch: expanded;
}
</style>

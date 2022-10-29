<script setup lang="ts">
import { computed } from 'vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';

const props = defineProps<{
  client: {
    id: number;
    username: string;
    title: string[];
    picture: string;
    status?: string | undefined;
  };
}>();

const statusStyle = computed(() => {
  switch (props.client.status) {
    case 'online':
      return { color: 'lime' };
    default:
      return { color: 'grey' };
  }
});

const statusBorder = computed(() => {
  switch (props.client.status) {
    case 'online':
      return 'lime';
    default:
      return 'grey';
  }
});
</script>

<template>
  <div class="client">
    <RoundPictureComponent
      class="picture"
      :picture="client.picture"
      size="5.5vw"
      :border-color="statusBorder"
    />
    <div class="infoBox">
      <span class="username">{{ client.title[0] }} {{ client.username }}</span>
      <span :style="statusStyle" class="status">{{ client.status }}</span>
    </div>
  </div>
</template>

<style scoped>
.client {
  display: flex;
  align-items: center;
  padding-top: 1%;
  cursor: pointer;
}

.infoBox {
  display: flex;
  flex-direction: column;
  padding-left: 5%;
}
.username {
  color: white;
  font-size: 1.8vw;
  font-stretch: expanded;
}

.status {
  font-size: 1.6vw;
  color: lime;
}
</style>

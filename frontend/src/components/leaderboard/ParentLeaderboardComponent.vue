<script setup lang="ts">
import ChildPlayerComponent from './ChildPlayerComponent.vue';
import ChildMedalComponent from './ChildMedalComponent.vue';
import pongking_boi_gold from '../../assets/pongking_boi_gold.png';
import pongking_boi_silver from '../../assets/pongking_boi_silver.png';
import pongking_boi_bronze from '../../assets/pongking_boi_bronze.png';
import { ref } from 'vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';
import type { User } from '@/store/user';

defineProps<{
  categoryName: string;
}>();

const errorStore = useErrorStore();
const leaders = ref<Partial<User>[]>([]);
UserService.findLeaders()
  .then((users) => (leaders.value = users))
  .catch((error) => errorStore.setError(error.message));
</script>

<template>
  <div class="title">{{ categoryName }}</div>
  <div class="categories">
    <ChildMedalComponent
      v-if="typeof leaders[0] != 'undefined'"
      :medal-player="leaders[0]"
      :medal-kind="pongking_boi_gold"
    />
    <ChildMedalComponent
      v-if="typeof leaders[1] != 'undefined'"
      :medal-player="leaders[1]"
      :medal-kind="pongking_boi_silver"
    />
    <ChildMedalComponent
      v-if="typeof leaders[2] != 'undefined'"
      :medal-player="leaders[2]"
      :medal-kind="pongking_boi_bronze"
    />
    <ChildPlayerComponent
      v-for="leader in leaders.slice(3, 5)"
      :key="leader.id"
      :player="leader"
    />
  </div>
</template>

<style scoped>
.title {
  padding: 5px;
  color: var(--main-1-color);
  font-size: var(--main-title-font-size);
}
.categories {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap-reverse;
  gap: initial;
}
</style>

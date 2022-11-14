<script setup lang="ts">
import ChildPlayerComponent from './ChildPlayerComponent.vue';
import ChildMedalComponent from './ChildMedalComponent.vue';
import star_gold from '../../assets/star_gold.png';
import star_silver from '../../assets/star_silver.png';
import star_bronze from '../../assets/star_bronze.png';
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
  <h3>{{ categoryName }}</h3>
  <div class="categories">
    <ChildMedalComponent
      v-if="typeof leaders[0] != 'undefined'"
      :medal-player="leaders[0]"
      :medal-kind="star_gold"
    />
    <ChildMedalComponent
      v-if="typeof leaders[1] != 'undefined'"
      :medal-player="leaders[1]"
      :medal-kind="star_silver"
    />
    <ChildMedalComponent
      v-if="typeof leaders[2] != 'undefined'"
      :medal-player="leaders[2]"
      :medal-kind="star_bronze"
    />
    <ChildPlayerComponent
      v-for="leader in leaders.slice(3, 5)"
      :key="leader.id"
      :player="leader"
    />
  </div>
</template>

<style scoped>
h3 {
  padding: 5px;
  color: orange;
}
.categories {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap-reverse;
  gap: initial;
}
</style>

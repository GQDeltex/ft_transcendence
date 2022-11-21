<script setup lang="ts">
import GameService, { type Game } from '@/service/GameService';
import { computed, onBeforeMount, type Ref, ref } from 'vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import { useErrorStore } from '@/store/error';

const props = defineProps<{
  gameId: number;
}>();

const game: Ref<Game | null> = ref(null);

const statusBorder = (status: string) => {
  switch (status) {
    case 'online':
      return 'lime';
    default:
      return 'grey';
  }
};

const winnerName = computed((): string => {
  if (!game.value) return '';
  if (game.value.score1 > game.value.score2) return game.value.player1.username;
  else if (game.value.score1 < game.value.score2)
    return game.value.player2.username;
  return 'nobody';
});

const winnerPicture = computed((): string => {
  if (!game.value) return '';
  if (game.value.score1 > game.value.score2) return game.value.player1.picture;
  else if (game.value.score1 < game.value.score2)
    return game.value.player2.picture;
  return '';
});

const winnerStatusColor = computed((): string => {
  if (!game.value) return 'grey';
  if (game.value.score1 > game.value.score2)
    return statusBorder(game.value.player1.status ?? 'offline');
  else if (game.value.score1 < game.value.score2)
    return statusBorder(game.value.player2.status ?? 'offline');
  return 'grey';
});

async function homepage() {
  window.location.href = '/';
}

onBeforeMount(async () => {
  try {
    game.value = await GameService.findOne(props.gameId);
  } catch (error) {
    useErrorStore().setError((error as Error).message);
  }
});
</script>

<template>
  <div class="parent">
    <RoundPictureComponent
      v-if="winnerPicture !== ''"
      class="picture"
      :picture="winnerPicture"
      size="15vw"
      :border-color="winnerStatusColor"
    />
    <p class="saving">{{ winnerName }} wins!</p>
    <div class="button">
      <button class="home-page flex-btn" @click="homepage">Home</button>
    </div>
  </div>
</template>

<style scoped>
.saving {
  color: white;
  font-size: 2vw;
}

.parent {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5vh;
}

.button {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  width: 50%;
}

.flex-btn {
  font-family: 'Mountains of Christmas', cursive;
  text-decoration: none;
  border-radius: 20px;
  color: white;
  overflow: hidden;
  background-color: #c00000;
  padding: 10px 20px;
  align-content: center;
  cursor: pointer;
  width: min-content;
  align-items: center;
  border: none;
  font-size: 2vw;
  font-weight: bolder;
}
</style>

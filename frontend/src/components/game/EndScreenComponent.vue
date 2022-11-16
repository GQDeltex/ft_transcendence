<script setup lang="ts">
import GameService from '@/service/GameService';
import { onMounted, ref } from 'vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';

const errorStore = useErrorStore();

const props = defineProps<{
  gameId: number;
}>();

const status = 'online';

const playerScore1 = ref(0);
const remoteScore2 = ref(0);
const player1 = ref({
  id: 0,
  username: '',
  picture: '',
  status: '',
});
const player2 = ref({
  id: 0,
  username: '',
  picture: '',
});

const player = ref({
  id: 0,
  username: '',
  picture: '',
  status: '',
});

async function homepage() {
  window.location.href = '/';
}

onMounted(async () => {
  if (props.gameId === 0) return;
  await GameService.findOne(props.gameId)
    .then((game) => {
      playerScore1.value = game.score1;
      remoteScore2.value = game.score2;
      player1.value.id = game.player1.id;
      player2.value.id = game.player2.id;
      player1.value.username = game.player1.username;
      player2.value.username = game.player2.username;
    })
    .catch((error) => errorStore.setError(error.message));

  await UserService.findOneById(player1.value.id)
    .then((user) => {
      player1.value.picture = user.picture;
    })
    .catch((error) => errorStore.setError(error.message));

  await UserService.findOneById(player2.value.id)
    .then((user) => {
      player2.value.picture = user.picture;
      username();
    })
    .catch((error) => errorStore.setError(error.message));

  function username() {
    if (playerScore1.value > remoteScore2.value) {
      player.value.username = player1.value.username;
      player.value.picture = player1.value.picture;
    } else {
      player.value.username = player2.value.username;
      player.value.picture = player2.value.picture;
    }
  }
});
</script>

<template>
  <div class="parent">
    <RoundPictureComponent
      class="picture"
      :picture="player.picture"
      size="15vw"
      :border-color="status"
    />
    <p class="saving">{{ player.username }} wins!</p>
    <div class="btns">
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

.btns {
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
  padding: 15px;
  align-content: center;
  cursor: pointer;
  width: min-content;
  align-items: center;
  border: none;
  font-size: 2vw;
  font-weight: bolder;
  text-decoration: none;
  /* text-decoration: none;
  border-radius: 5px;
  color: white;
  background-color: #c00000;
  font-size: 3vw;
  border-color: transparent;
  cursor: pointer; */
}
</style>

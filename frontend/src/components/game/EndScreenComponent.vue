<script setup lang="ts">
import GameService from '@/service/GameService';
import { onMounted, ref } from 'vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import UserService from '@/service/UserService';
import { useRouter } from 'vue-router';

const emit = defineEmits(['back']);

const props = defineProps<{
  gameId: number;
}>();

const router = useRouter();

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
  await router.push('/');
}

onMounted(async () => {
  await GameService.findOne(props.gameId).then((game) => {
    playerScore1.value = game.score1;
    remoteScore2.value = game.score2;
    player1.value.id = game.player1.id;
    player2.value.id = game.player2.id;
    player1.value.username = game.player1.username;
    player2.value.username = game.player2.username;
  });

  await UserService.findOneById(player1.value.id).then((user) => {
    player1.value.picture = user.picture;
  });

  await UserService.findOneById(player2.value.id).then((user) => {
    player2.value.picture = user.picture;
    username();
  });

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

const backToQueue = () => {
  emit('back');
};
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
      <button class="home-page flex-btn" @click="homepage">Home page</button>
      <button class="flex-btn" @click="backToQueue">Back to queue</button>
    </div>
  </div>
</template>

<style scoped>
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
  width: 11vh;
  height: 4vh;
}
</style>

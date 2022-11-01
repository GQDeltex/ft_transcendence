<script setup lang="ts">
import CategorySearchComponent from '../components/landingview/CategorySearchComponent.vue';
import ChildStreamComponent from '../components/stream/ChildStreamComponent.vue';
import PongComponent from '../components/game/PongComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import { ref, computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { socket } from '@/service/socket';
import type { User } from '@/store/user'
import UserService from '@/service/UserService';

const games = ref<Game[]>([]);
const player1User = ref<User>();
const player2User = ref<User>();
const route = useRoute()
const routExist = computed(() => typeof route.params.id === 'undefined');

const gameId= ref(0)
const loadedData= ref(false)

onBeforeMount(() => {
  gameId.value = +route.params.id;
  socket.emit('stream', {gameId: gameId.value, event:"JOIN"}, async(data:{player1Id: number, player2Id: number}) => {
  player1User.value = await UserService.findOneById(data.player1Id);
  player2User.value = await UserService.findOneById(data.player2Id);
  loadedData.value = true;
  console.log(data.player1Id, data.player2Id);
  })
})

GameService.findAll('running').then(
  (gamesreturn: Game[]) => (games.value = gamesreturn),
);
</script>

<template>
  <div>
    <div v-if="routExist" >
      <h1>stream overview</h1>
      <ChildStreamComponent
        v-for="game in games"
        :key="game.id"
        :player1-name="game.player1.username"
        :player2-name="game.player2.username"
        :score1="game.score1"
        :score2="game.score2"
        :game-id="game.id"
      />
    </div>
  <div v-else>
    <h1>pathed stream</h1>
     <PongComponent v-if="loadedData" :gameId="gameId" :player1ID="player1User" :player2ID="player2User" :priority='false'/>
  </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import CategorySearchComponent from '../components/landingview/CategorySearchComponent.vue';
import ChildStreamComponent from '../components/stream/ChildStreamComponent.vue';
import GameService from '@/service/GameService';
import type { Game } from '@/service/GameService';
import { ref } from 'vue';

const games = ref<Game[]>([]);

GameService.findAll('running').then(
  (gamesreturn: Game[]) => (games.value = gamesreturn),
);
</script>

<template>
  <div>
    <CategorySearchComponent />
  </div>
  <div>
    <ChildStreamComponent
      v-for="game in games"
      :key="game.id"
      :player1-name="game.player1.username"
      :player2-name="game.player2.username"
    />
    <!--
    <SearchResultComponent
      search-term="placeholder"
      :component-type="ChildStreamComponent"
    />
    <ParentStreamComponent category-name="Top Rated" />
    <ParentStreamComponent category-name="Most Popular" />
    -->
  </div>
</template>

<style scoped></style>

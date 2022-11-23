<script setup lang="ts">
import UserPlayedGameComponent from '../../globalUse/UserPlayedGameComponent.vue';
import type { Game } from '@/service/GameService';
import { ref, inject, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { games } = inject<{ games: Ref<Game[]> }>('user', {
  games: ref([]),
});

const sortGames = (games: Game[]) => {
  return [...games].sort((a, b) => b.id - a.id);
};
</script>

<template>
  <div class="frame">
    <div class="title">{{ useI18n().t('history') }}</div>
    <div class="scroll">
      <UserPlayedGameComponent
        v-for="game in sortGames(games)"
        :key="game.id"
        :game="game"
        size="56.9vw"
      />
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 2vw;
  color: #c00000;
}

.scroll {
  overflow-y: scroll;
  max-height: 90%;
}
.frame {
  border: 1px solid gray;
  padding: 1vw;
  max-height: inherit;
}
</style>

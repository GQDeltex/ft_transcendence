<script setup lang="ts">
import ChildAchievementComponent from './ChildAchievementComponent.vue';
</script>

<template>
  <div class="achievementsParent">
    <span class="text">Achievements (1)</span>
    <div class="achievements">
      <ChildAchievementComponent
        header="Smol PongKing"
        text="first login"
        picture=""
      />
      <ChildAchievementComponent
        header="Smol PongKing"
        text="second login"
        picture=""
      />
      <ChildAchievementComponent
        header="Smol PongKing"
        text="Played a Pong game"
        picture=""
      />
      <ChildAchievementComponent
        header="Smol PongKing"
        text="Lost a Pong game"
        picture=""
      />
      <ChildAchievementComponent
        header="Smol PongKing"
        text="Lost a Pong game twice"
        picture=""
      />
    </div>
  </div>
</template>

<style scoped>
.achievementsParent {
  display: grid;
  padding: 1vw;
  border: 1px solid grey;
  max-height: 30vh;
}
.achievements {
  max-height: inherit;
  overflow-y: scroll;
}
.text {
  font-size: 2vw;
  margin-bottom: 1vw;
}
</style>

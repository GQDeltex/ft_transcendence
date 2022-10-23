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
  max-height: 1fr;
}
.achievements {
  max-height: 28vh;
  overflow-y: scroll;
}
.text {
  font-size: 2vw;
  margin-bottom: 1vw;
}
.achieve {
  display: flex;
  align-items: center;
  gap: 1vw;
  padding: 1vw;
}

.infoBox {
  font-size: 2vw;
  color: grey;
}

.info {
  color: white;
}

.logo {
  object-fit: cover;
  object-position: 50% 0%;
  border-radius: 50%;
  border: 1px solid #f8971d;
  height: 5vw;
  width: 5vw;
}
</style>

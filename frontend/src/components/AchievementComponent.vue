<script setup lang="ts">

</script>


<template>
  <div class="achievements">

    <span style="font-size: 0.7em">Achievements (1)</span>
    <br>
    <div class="achieve">
      <img
        alt="page logo"
        class="logo"
        src="@/assets/pongking_boi.svg"
        height="40"
        width="50"
      />
    </div>
      <div class="infoBox">
      Smol PongKing: <span class="info">first login</span>
      </div>

  </div>
</template>


<style scoped>

.achievements {
  display: grid;
  padding: 10px;
  border: 1px solid grey;
  overflow-y: scroll;
}

.achieve {
  grid-column: 1 / 2;
}
.infoBox {
  grid-column: 2 / 6;
  font-size: 0.5em;
  color: grey;
  align-content: center;
}

.info{
  color: white;
}

.logo {
  /* grid-column: 1 / 2; */
  border-radius: 50%;
  border: 1px solid #f8971d;
}

</style>

<script setup lang="ts">
import ChatClientComponent from './ChatClientComponent.vue';

const props = defineProps<{
  clients: {
    id: number;
    title: string;
    username: string;
    picture: string;
    status: string;
  }[];
}>();
</script>

<template>
  <div class="friendsPeopleParent">
    <span class="text">People</span>
    <div class="list">
      <ChatClientComponent
        v-for="client in clients"
        :key="client.id"
        :client-id="client.id"
        :title="client.title[0]"
        :username="client.username"
        :picture="client.picture"
        :status="client.status"
      />
    </div>
  </div>
</template>

<style scoped>
.friendsPeopleParent {
  display: flex;
  flex-direction: column;
  padding: 0.5vw;
  padding-bottom: 0.5vw;
  border: 1px solid #202020;
}
.text {
  font-size: 1vw;
  color: #f8971d;
}
.list {
  /* max-height: 33.33%; */
  overflow-y: scroll;
  padding-left: 5%;
}
</style>

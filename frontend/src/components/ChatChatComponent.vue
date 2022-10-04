<script setup lang="ts">
defineProps<{
	chatName: string;
	}>();
</script>

<template>
  <div class="parent">
	  <span class="chatname">{{ chatName }}</span>
	  <span>here the messages will be displayed</span>
  </div>
</template>

<style scoped>
.parent {
	display: flex;
	flex-direction: column;
	}
.chatname {
	color: #f8971d;
	}
</style>

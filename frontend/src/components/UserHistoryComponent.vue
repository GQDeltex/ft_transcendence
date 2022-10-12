<script setup lang="ts">
import UserPlayedGameComponent from './UserPlayedGameComponent.vue';
defineProps<{
	gameImg: string;
	}>();
</script>

<template>
	<UserPlayedGameComponent />
</template>

<style scoped>
</style>

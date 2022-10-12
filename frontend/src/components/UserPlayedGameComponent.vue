<script setup lang="ts">
import StreamGameComponent from './StreamGameComponent.vue';
defineProps<{
	gameImg: string;
	time: Number;
	user: string;
	}>();
</script>

<template>
	<div>
	<span class="username">gucalvi</span>
	<span class="time">6h ago</span>
	<StreamGameComponent player1-name="hlehmann" player2-name="gucalvi" />
	</div>
</template>

<style scoped>
div {
	display: flex;
	}
.username {
	
	}
.time {

	}
</style>

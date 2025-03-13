<script setup lang="ts"></script>

<template>
	<div class="relative flex min-h-screen w-full flex-col">
		<Header />

		<main class="mb-2 flex-1 sm:pt-14">
			<slot></slot>
		</main>
	</div>
</template>

<script setup lang="ts"></script>

<template>
	<div class="relative flex min-h-screen w-full flex-col pt-14 pb-10">
		<Header />

		<Drawer />

		<main class="flex-1">
			<slot></slot>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { useI18n } from 'vue-i18n'
	import { LINKS } from '~/shared'

	const globalStore = useGlobalStore()
	const { availableLocales, setLocale, locale } = useI18n()

	const toggleLocale = () => {
		const newLocale = availableLocales.find((el) => el !== locale.value) || 'en'
		setLocale(newLocale)
	}
</script>

<template>
	<header class="header fixed top-0 left-0 z-10 w-full py-2 shadow-2xl">
		<UContainer>
			<div class="flex flex-wrap items-center justify-between">
				<div class="flex items-center gap-x-4">
					<UButton
						variant="link"
						class="focus:outline-none sm:hidden"
						@click="globalStore.drawer = !globalStore.drawer"
					>
						<Icon name="lucide:align-justify" />
					</UButton>

					<NuxtLink class="flex items-center" :to="{ name: 'index' }">
						<Icon
							class="text-3xl transition hover:opacity-60 sm:text-4xl"
							name="custom:lone-social-logo"
						/>
					</NuxtLink>
				</div>

				<div class="flex items-center gap-4">
					<nav class="hidden sm:block">
						<ul class="flex items-center gap-4">
							<li v-for="(link, index) in LINKS" :key="index">
								<NuxtLink
									:to="{ name: link.name }"
									exact-active-class="after:w-full"
									class="relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
								>
									{{ $t(link.title) }}
								</NuxtLink>
							</li>
						</ul>
					</nav>

					<div class="flex items-center">
						<ClientOnly>
							<UButton
								:icon="globalStore.isDark ? 'lucide:moon' : 'lucide:sun'"
								variant="ghost"
								@click="globalStore.toggleDark()"
							/>
						</ClientOnly>
						<UButton icon="lucide:languages" variant="ghost" @click="toggleLocale" />
					</div>
				</div>
			</div>
		</UContainer>
	</header>
</template>

<style scoped>
	.header {
		background-color: var(--ui-bg);
	}
</style>

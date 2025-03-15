<script setup lang="ts">
	import { useI18n } from 'vue-i18n'
	import { LINKS } from '~/shared'

	const globalStore = useGlobalStore()
	const { t, availableLocales, setLocale, locale } = useI18n()

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

					<NuxtLink :to="{ name: 'index' }" class="link--default header__icon">
						<div class="flex h-full w-full items-center">
							<Icon class="text-3xl sm:text-4xl" name="custom:lone-social-logo" />
						</div>
					</NuxtLink>
				</div>

				<nav class="hidden sm:block">
					<ul class="flex items-center gap-x-4">
						<li v-for="(link, index) in LINKS" :key="index">
							<NuxtLink
								class="link--default header__link"
								exact-active-class="after:opacity-100"
								:to="link.href"
							>
								{{ t(link.title) }}
							</NuxtLink>
						</li>
					</ul>
				</nav>

				<div>
					<div class="flex items-center">
						<UButton variant="ghost" @click="globalStore.toggleDark()">
							<ClientOnly>
								<Icon v-if="globalStore.isDark" name="lucide:moon" />
								<Icon v-else name="lucide:sun" />
							</ClientOnly>
						</UButton>

						<UButton variant="ghost" @click="toggleLocale">
							<Icon name="lucide:languages" />
						</UButton>
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

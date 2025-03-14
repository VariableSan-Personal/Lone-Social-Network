<script setup lang="ts">
	import { useI18n } from 'vue-i18n'
	import { LINKS } from '~/shared'

	const { toggleDark, drawer, isDark } = useGlobalStore()
	const { t, availableLocales, setLocale, locale } = useI18n()

	const toggleLocale = () => {
		const newLocale = availableLocales.find((el) => el !== locale.value) || 'en'
		setLocale(newLocale)
	}
</script>

<template>
	<header class="fixed top-0 left-0 z-50 h-auto w-full py-2 shadow-2xl">
		<UContainer>
			<div class="flex flex-wrap justify-between">
				<div>
					<button class="mr-3 focus:outline-none sm:hidden" @click="drawer = !drawer">
						<Icon name="lucide:align-justify" />
					</button>

					<router-link :to="{ name: 'index' }" class="link--default header__icon">
						<div class="flex h-full w-full items-center">
							<Icon name="custom:lone-social-logo" size="32" />
						</div>
					</router-link>
				</div>

				<nav>
					<ul class="flex">
						<li v-for="(link, index) in LINKS" :key="index" class="not-last:mr-4">
							<router-link
								class="link--default header__link"
								exact-active-class="after:opacity-100"
								:to="link.href"
							>
								{{ t(link.title) }}
							</router-link>
						</li>
					</ul>
				</nav>

				<div>
					<div class="flex items-center">
						<UButton
							variant="ghost"
							@click="
								() => {
									toggleDark()
								}
							"
						>
							<ClientOnly>
								<Icon v-if="isDark" name="lucide:moon" />
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

<script setup lang="ts">
	const { data } = await useAsyncData('facts', () => useAPIFetch('/fact'))
</script>

<template>
	<div>
		{{ data }}

		<!-- <HomeHero /> -->

		<!-- <section class="pb-12">
			<div class="container">
				<div class="flex flex-wrap items-start">
					<ProfileAside class="mx-auto w-full sm:w-9/12 lg:w-1/4" />

					<div class="mt-12 w-full lg:w-3/4 lg:pl-8">
						<h2 class="mb-12 text-3xl font-bold lg:text-4xl">{{ t('portfolio.projects') }}:</h2>

						<ul>
							<li v-for="portfolio in works" :key="portfolio.id" class="not-last:mb-12">
								<PortfolioWork :portfolio="portfolio" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section> -->
	</div>
</template>

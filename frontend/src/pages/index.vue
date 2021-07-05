<script setup lang="ts">
import { isEmpty } from 'lodash'
import { getCurrentInstance, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { DashHomeService, home, works } from '~/logic'

const instance = getCurrentInstance()
const { t } = useI18n()

onMounted(() => {
  getHomeData()
})

async function getHomeData() {
  if (isEmpty(home.value)) {
    const dashHomeService = new DashHomeService(instance)

    try {
      const homeData = await dashHomeService.getHomeData()
      const portfolioData = await dashHomeService.getPortfolioWorks()

      home.value = homeData
      works.value = portfolioData
    }
    catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
  <HeroComponent></HeroComponent>

  <section class="pb-12">
    <div class="container">
      <div class="flex flex-wrap items-start">
        <ProfileAside class="w-full mx-auto sm:w-9/12 lg:w-1/4"></ProfileAside>

        <div class="w-full mt-12 lg:w-3/4 lg:pl-8">
          <h2 class="mb-12 text-3xl lg:text-4xl font-bold">
            {{ t('portfolio.projects') }}:
          </h2>

          <ul>
            <li v-for="portfolio in works" :key="portfolio.id" class="not-last:mb-12">
              <PortfolioWork :portfolio="portfolio"></PortfolioWork>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

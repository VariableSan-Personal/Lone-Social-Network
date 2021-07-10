<script setup lang='ts'>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'
import type { TAboutMe } from '~/helpers/types/AboutMe.type'
import { DashAboutService } from '~/logic'

const instance = getCurrentInstance()

const aboutData = ref<TAboutMe>()
const dashAboutService = new DashAboutService(instance)

const getAboutData = async() => {
  aboutData.value = await dashAboutService.getAboutData()
}

onMounted(() => {
  getAboutData()
})
</script>

<template>
  <!-- h2, h3, p, ul, li -->

  <div class="container mt-8">
    <div class="flex items-center mb-8">
      <div class="p-3 mr-4 text-white bg-cool-gray-400 leading-none text-sm font-bold">
        <h4>N</h4>
        <h4>N</h4>
      </div>

      <h1 class="text-2xl font-bold">
        Nursultan Nurgaliyev
      </h1>
    </div>

    <div class="md:grid grid-flow-col grid-rows-2 grid-cols-2 gap-4">
      <ExperienceComponent :experience="aboutData?.experience"></ExperienceComponent>
      <EducationComponent :education="aboutData?.education"></EducationComponent>
    </div>
  </div>
</template>

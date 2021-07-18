<script setup lang='ts'>
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { isEmpty } from 'lodash'
import { useI18n } from 'vue-i18n'
import { ELanguages } from '~/helpers/enums/Languages.enum'
import { about, DashAboutService } from '~/logic'

const { t, locale } = useI18n()

const instance = getCurrentInstance()

const getAboutData = async() => {
  if (isEmpty(about.value)) {
    const dashAboutService = new DashAboutService(instance)

    about.value = await dashAboutService.getAboutData()
  }
}

onMounted(() => {
  getAboutData()
})
</script>

<template>
  <div class="container mt-8">
    <div class="flex items-center mb-8">
      <div class="p-3 mr-4 text-white bg-cool-gray-400 leading-none text-sm font-bold">
        <template v-if="locale === ELanguages.RU">
          <h4>Н</h4>
          <h4>Н</h4>
        </template>
        <template v-else>
          <h4>N</h4>
          <h4>N</h4>
        </template>
      </div>

      <h1 class="text-2xl font-bold">
        {{ t('about.fullname') }}
      </h1>
    </div>

    <div class="lg:flex justify-between">
      <div class="about__part">
        <ExperienceComponent :experience="about?.experience"></ExperienceComponent>
      </div>

      <div class="about__part">
        <EducationComponent :education="about?.education"></EducationComponent>
        <SkillsComponent :skills="about?.skills"></SkillsComponent>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.about {
  &__section {
    @apply mb-8;
  }

  &__headline {
    @apply mb-4 pt-4 border-t border-gray-700 text-lg font-bold text-gray-500 dark:text-gray-400 dark:border-white tracking-widest uppercase;
  }

  &__title {
    @apply text-lg font-semibold text-gray-700 dark:text-white leading-snug;
  }

  &__block {
    @apply not-last:mb-6;
  }

  &__part {
    @screen lg {
      width: calc(50% - 30px);
    }
  }
}
</style>

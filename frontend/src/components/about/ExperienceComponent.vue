<script setup lang='ts'>
import { defineProps } from '@vue/runtime-core'
import { useI18n } from 'vue-i18n'
import type { TExperience } from '~/helpers/types/AboutMe.type'
import { getTranslate, getMonthAndYear } from '~/logic'

const { locale, t } = useI18n()

defineProps({
  experience: {
    default: [] as TExperience[],
  },
})

</script>

<template>
  <section class="about__section">
    <h2 class="about__headline">
      {{ t('about.experience') }}
    </h2>

    <div v-for="exp in experience" :key="exp.id" class="about__block">
      <h3 class="about__title">
        {{ exp.company_name }}
      </h3>

      <p
        class="mb-2 leading-normal text-md text-gray-600 dark:text-white"
      >
        {{ getMonthAndYear(exp.start_date, locale, t) }} - {{ getMonthAndYear(exp.end_date, locale, t) }} | {{ getTranslate(locale, exp, 'position_name') }}
      </p>

      <ul class="pl-4">
        <li
          v-for="(item, index) in getTranslate(locale, exp, 'description').split('\n')"
          :key="index"
          class="text-md text-gray-700 leading-normal list-disc not-last:mb-2 dark:text-white"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

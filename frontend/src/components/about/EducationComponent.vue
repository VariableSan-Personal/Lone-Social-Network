<script setup lang='ts'>
import { defineProps } from '@vue/runtime-core'
import { useI18n } from 'vue-i18n'
import type { TEducation } from '~/helpers/types/AboutMe.type'
import { getMonthAndYear, getTranslate } from '~/logic'

const { locale, t } = useI18n()

defineProps({
  education: {
    default: [] as TEducation[],
  },
})

</script>

<template>
  <section class="about__section">
    <h2 class="about__headline">
      {{ t('about.education') }}
    </h2>

    <div v-for="edu in education" :key="edu.id" class="about__block">
      <h3 class="about__title">
        {{ edu.title }}
      </h3>

      <p
        class="whitespace-pre-line text-md text-gray-700 dark:text-white leading-normal"
      >
        {{ getMonthAndYear(edu.start_date, locale, t) }} - {{ getMonthAndYear(edu.end_date, locale, t) }} | {{ getTranslate(locale, edu, 'degree') }}
      </p>
    </div>
  </section>
</template>

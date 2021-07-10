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
  <section>
    <h2 class="mb-4 font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase">
      Education
    </h2>

    <div v-for="edu in education" :key="edu.id" class="mb-8">
      <h3 class="text-lg font-semibold text-gray-700 dark:text-white leading-snug">
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

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
  <section>
    <h2 class="mb-4 font-bold text-gray-500 dark:text-gray-400 tracking-widest uppercase">
      Experience
    </h2>

    <div v-for="exp in experience" :key="exp.id" class="mb-8">
      <h3
        class="text-lg font-semibold text-gray-700 dark:text-white leading-snug"
      >
        {{ exp.company_name }}
      </h3>

      <p
        class="mb-2 leading-normal text-md text-gray-600 dark:text-white"
      >
        {{ getMonthAndYear(exp.start_date, locale, t) }} - {{ getMonthAndYear(exp.end_date, locale, t) }} | {{ getTranslate(locale, exp, 'position_name') }}
      </p>

      <p
        class="whitespace-pre-line text-md text-gray-700 dark:text-white leading-normal"
      >
        {{ getTranslate(locale, exp, 'description') }}
      </p>
    </div>
  </section>
</template>

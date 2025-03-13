<script setup lang='ts'>
import { defineProps } from '@vue/runtime-core'
import { useI18n } from 'vue-i18n'
import type { TSkill } from '~/helpers/types/AboutMe.type'
import { getMonthAndYear, getTranslate } from '~/logic'

const { locale, t } = useI18n()

defineProps({
  skills: {
    default: [] as TSkill[],
  },
})

</script>

<template>
  <section class="about__section">
    <h2 class="about__headline">
      {{ t('about.skills') }}
    </h2>

    <div v-for="skill in skills" :key="skill.id" class="about__block">
      <div class="mb-3">
        <h3 class="about__title">
          {{ getTranslate(locale, skill, 'title') }}
        </h3>

        <h4
          v-if="skill.level"
          class="text-md text-gray-700 leading-normal dark:text-white"
        >
          {{ getTranslate(locale, skill, 'level') }} {{ t('level') }}
        </h4>
      </div>

      <ul class="flex flex-wrap">
        <li
          v-for="(ability) in skill.abilities"
          :key="ability.id"
          class="mr-2 mb-3 bg-gray-300 py-1 px-3 text-base text-gray-700 leading-normal dark:text-white dark:bg-gray-500"
        >
          {{ ability.title }}
        </li>
      </ul>
    </div>
  </section>
</template>

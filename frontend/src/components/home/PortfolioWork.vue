<script setup lang="ts">
import { computed, defineProps, getCurrentInstance } from '@vue/runtime-core'
import { useI18n } from 'vue-i18n'
import { ELanguages } from '~/helpers/enums/Languages.enum'
import type { TPortfolioWork } from '~/helpers/types/PortfolioWork.type'
import { getAsset, getTranslate } from '~/logic'

const instance = getCurrentInstance()
const { locale, t } = useI18n()

const props = defineProps({
  portfolio: {
    default: {} as TPortfolioWork,
  },
})

const dateFormat = computed({
  get() {
    switch (locale.value) {
      case ELanguages.RU:
        return props.portfolio.date.split('-').reverse().join('.')

      default:
        return props.portfolio.date
    }
  },

  set() { },
})
</script>

<template>
  <component
    :is="$grid.lg ? 'div' : 'a'"
    :href="portfolio.link"
    target="_blank"
    :event="$grid.lg ? '' : 'click'"
    class="relative block bg-white dark:bg-cool-gray-700 rounded-md shadow-lg group overflow-hidden"
  >
    <div
      class="absolute inset-0 hidden lg:flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition"
    >
      <a
        class="btn portfolio__link text-white"
        tabindex="-1"
        target="_blank"
        :href="portfolio.link"
      >{{ t('portfolio.visit') }}</a>
    </div>

    <div
      class="bg--default portfolio__poster"
      :style="{ backgroundImage: `url(${getAsset(portfolio.poster, instance)})` }"
    ></div>

    <div class="py-6 px-4 tracking-wide">
      <table class="portfolio__table">
        <tr>
          <td class="portfolio__td">
            {{ t('portfolio.title') }}:
          </td>
          <td>{{ portfolio.title }}</td>
        </tr>

        <tr>
          <td class="portfolio__td">
            {{ t('portfolio.date') }}:
          </td>
          <td>{{ dateFormat }}</td>
        </tr>

        <tr class="py-10">
          <td class="portfolio__td">
            {{ t('portfolio.technologies') }}:
          </td>
          <td class="py-4">
            <div v-html="portfolio.technologies"></div>
          </td>
        </tr>

        <tr>
          <td class="portfolio__td">
            {{ t('portfolio.description') }}:
          </td>
          <td>{{ getTranslate(locale, portfolio, 'description') }}</td>
        </tr>
      </table>
    </div>
  </component>
</template>

<style lang="postcss">
.portfolio {
  &__poster {
    padding-bottom: 50%;

    @screen md {
      padding-bottom: 40%;
    }

    @screen lg {
      padding-bottom: 30%;
    }
  }

  &__link {
    @apply border border-light-400 text-lg opacity-0 group-hover:opacity-100 transition;
    @apply py-4 px-8 hover:text-white hover:opacity-70 !important;
  }

  &__table {
    ul {
      @apply pl-4 list-disc;
    }
  }

  &__td {
    @apply pr-4 whitespace-nowrap;
  }
}
</style>

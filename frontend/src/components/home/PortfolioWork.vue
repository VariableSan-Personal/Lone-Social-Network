<script setup lang="ts">
import { computed, defineProps, getCurrentInstance, ref } from '@vue/runtime-core'
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

const imageSrc = ref('')
const imageLoading = ref(true)

const image = new Image()
image.src = getAsset(props.portfolio.poster, instance)

image.onload = () => {
  imageSrc.value = image.src
  imageLoading.value = false
}
</script>

<template>
  <component
    :is="$grid.lg || portfolio.link == '#' ? 'div' : 'a'"
    :href="portfolio.link"
    target="_blank"
    :event="$grid.lg ? '' : 'click'"
    class="relative block bg-white dark:bg-cool-gray-700 rounded-md shadow-lg group overflow-hidden"
  >
    <div
      v-if="portfolio.link != '#'"
      class="absolute z-2 inset-0 hidden lg:flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition"
    >
      <a
        class="btn portfolio__link text-white"
        tabindex="-1"
        target="_blank"
        :href="portfolio.link"
      >{{ t('portfolio.visit') }}</a>
    </div>

    <div
      class="bg--default portfolio__poster relative z-1"
      :style="{
        backgroundImage: `url(${imageSrc})`
      }"
    >
      <ImageLoader v-if="imageLoading" size="text-8xl"></ImageLoader>
    </div>

    <div class="py-6 px-4 tracking-wide">
      <table v-if="$grid.sm" class="portfolio__table">
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

      <template v-else>
        <div class="mb-6">
          <h3 class="text-lg font-bold">
            {{ t('portfolio.title') }}:
          </h3>

          <p>{{ portfolio.title }}</p>
        </div>
        <div class="mb-6">
          <h3 class="text-lg font-bold">
            {{ t('portfolio.date') }}:
          </h3>

          <p>{{ dateFormat }}</p>
        </div>
        <div class="mb-6">
          <h3 class="text-lg font-bold">
            {{ t('portfolio.technologies') }}:
          </h3>

          <div class="portfolio__list" v-html="portfolio.technologies"></div>
        </div>
        <div>
          <h3 class="text-lg font-bold">
            {{ t('portfolio.description') }}:
          </h3>

          <p>{{ getTranslate(locale, portfolio, 'description') }}</p>
        </div>
      </template>
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

  &__table,
  &__list {
    ul {
      @apply pl-4 list-disc;
    }
  }

  &__td {
    @apply pr-4 whitespace-nowrap;
  }
}
</style>

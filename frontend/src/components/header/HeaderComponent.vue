<script setup lang='ts'>
import type { Emitter } from 'mitt'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LoneSocialLogo from 'public/lone-social-logo.svg?raw'
import { ELanguages } from '~/helpers/enums/Languages.enum'
import { drawer, isDark, links, toggleDark, user } from '~/logic'

const { t, availableLocales, locale } = useI18n()

const instance = getCurrentInstance()
const emitter = instance?.appContext.config.globalProperties.$emitter as Emitter<any>

const loginWindow = ref(false)

const currentTab = ref(0)

const toggleLocale = () => {
  locale.value = availableLocales.find(el => el !== locale.value) || 'en-US'
}

onMounted(() => {
  const uiLang = navigator.language

  switch (uiLang) {
    case ELanguages.RU:
      locale.value = uiLang
      break
    default:
      locale.value = ELanguages.EN
      break
  }

  emitter.on('hide:loginWindow', () => {
    loginWindow.value = false
  })
})

</script>

<template>
  <header
    class="header fixed top-0 left-0 z-50 w-full h-auto py-2 bg-cool-gray-50 dark:bg-cool-gray-700 shadow-2xl"
  >
    <div class="container">
      <div class="flex flex-wrap">
        <div class="header__logo">
          <button class="mr-3 focus:outline-none sm:hidden" @click="drawer = !drawer">
            <cil:hamburger-menu></cil:hamburger-menu>
          </button>

          <router-link to="/" class="link--default header__icon">
            <div class="flex items-center w-full h-full" v-html="LoneSocialLogo"></div>
          </router-link>
        </div>

        <nav class="header__nav">
          <ul class="flex">
            <li v-for="(link, index) in links" :key="index" class="not-last:mr-4">
              <router-link
                class="link--default header__link"
                exact-active-class="after:opacity-100"
                :to="link.href"
              >{{ t(link.title) }}</router-link>
            </li>
          </ul>
        </nav>

        <div class="header__user">
          <div class="flex items-center mr-5">
            <button class="btn" @click="toggleDark">
              <span>
                <carbon-moon v-if="isDark" />
                <carbon-sun v-else />
              </span>
            </button>

            <button class="btn" @click="toggleLocale">
              <span>
                <mdi:translate></mdi:translate>
              </span>
            </button>
          </div>

          <div v-if="false">
            <HeaderDropdown v-if="user" class="hidden sm:block"></HeaderDropdown>
            <div v-else class="flex items-center">
              <button
                class="btn"
                @click="loginWindow = true; currentTab = 1"
              >{{ t('login.sign-up') }}</button>
              <button class="btn" @click="loginWindow = true; currentTab = 0">{{ t('login.login') }}</button>
            </div>
          </div>

          <LoginWindow v-model:showWindow="loginWindow" v-model:currentTab="currentTab"></LoginWindow>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="postcss">
.header {
  &__icon {
    @apply w-16;

    &:hover {
      svg path {
        @apply fill-warm-gray-400 !important;
      }
    }

    svg path {
      @apply dark:fill-white;
      @apply transition;
    }
  }

  &__logo,
  &__nav,
  &__user {
    @apply items-center;
  }

  &__logo {
    @apply flex w-full;
    @screen sm {
      @apply w-1/3;
    }
  }

  &__user {
    @apply hidden justify-end w-1/3;
    @screen sm {
      @apply flex;
    }
  }

  &__nav {
    @apply hidden w-1/3;
    @screen sm {
      @apply flex;
    }
  }

  &__link {
    @apply relative block font-semibold;

    &:hover {
      &:after {
        @apply opacity-100;
      }
    }

    &:focus {
      @apply outline-none;
    }

    &:after {
      @apply absolute -bottom-2 left-0 right-0 mx-auto w-full h-0.5 bg-warm-gray-400 transition opacity-0;
      content: "";
    }
  }
}
</style>

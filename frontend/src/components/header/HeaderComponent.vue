<script setup lang='ts'>
import { isDark, user, drawer, links, toggleDark } from '~/logic'
</script>

<template>
  <header class="header fixed top-0 left-0 z-50 w-full h-auto py-2 bg-cool-gray-700">
    <div class="container">
      <div class="flex flex-wrap">
        <div class="header__logo">
          <button class="mr-3 focus:outline-none sm:hidden" @click="drawer = !drawer">
            <cil:hamburger-menu></cil:hamburger-menu>
          </button>

          <router-link
            to="/"
            class="font-bold text-xl font-serif sm:text-2xl outline-none duration-150 focus:text-warm-gray-400 hover:text-warm-gray-400"
          >
            Lone social
          </router-link>
        </div>

        <nav class="header__nav">
          <ul class="flex">
            <li v-for="(link, index) in links" :key="index" class="not-last:mr-4">
              <router-link
                class="header__link"
                exact-active-class="after:opacity-100"
                :to="link.href"
              >
                {{ link.title }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="header__user">
          <HeaderDropdown v-if="user" class="hidden sm:block"></HeaderDropdown>

          <div v-else class="flex items-center">
            <button class="btn">
              Sign up
            </button>
            <button class="btn">
              Login
            </button>

            <button class="btn" @click="toggleDark">
              <span>
                <carbon-moon v-if="isDark" />
                <carbon-sun v-else />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="postcss">
.header {
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
    @apply relative block font-semibold duration-75 transition-colors;

    &:hover,
    &:focus {
      @apply text-warm-gray-400;
    }

    &:hover {
      &:after {
        @apply opacity-100;
      }
    }

    &:focus {
      @apply outline-none;
    }

    &:after {
      @apply absolute -bottom-2 left-0 right-0 mx-auto w-full h-0.5 bg-warm-gray-400 duration-75 opacity-0;
      content: "";
    }
  }
}
</style>

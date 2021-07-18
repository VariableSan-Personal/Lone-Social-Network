<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const links = [
  {
    href: 'https://universal-resume.netlify.app/',
    title: 'resume-design',
  },
  {
    href: 'https://gambolthemes.net/workwise-new/my-profile-feed.html',
    title: 'home-page-design',
  },
  {
    href: 'https://directus.io/',
    title: 'dashboard',
  },
]
</script>

<template>
  <footer class="footer">
    <div class="container flex items-center justify-center py-8">
      <h3 class="mr-4 dark:text-gray-300">
        {{ t('footer.links') }}:
      </h3>

      <ol class="flex">
        <li v-for="(link, index) in links" :key="index" class="not-last:mr-4 dark:text-gray-600">
          <a class="link--default" target="_blank" :href="link.href">{{ t(`footer.${link.title}`) }}</a>
        </li>
      </ol>
    </div>
  </footer>
</template>

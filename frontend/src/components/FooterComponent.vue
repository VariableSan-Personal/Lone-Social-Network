<script setup lang='ts'>
import { ref, watch } from 'vue'
import { home } from '~/logic'

const githubUrl = ref('')

watch(home, () => {
  const link = home.value?.social_links.find(link => link.title.toLowerCase() === 'github')

  githubUrl.value = link?.href || ''
})
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p class="w-full text-center py-4 dark:text-gray-600">
        Copyright © 2021
        <a :href="githubUrl">JudgementHC</a>
      </p>
    </div>
  </footer>
</template>

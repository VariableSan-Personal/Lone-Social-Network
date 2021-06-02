<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()
const { status } = route.query as { status: string }

const { t } = useI18n()
</script>

<template>
  <div>{{ t(status) }}</div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>

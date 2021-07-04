<script setup lang="ts">
import { getCurrentInstance } from '@vue/runtime-core'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { EErrorStatuses } from '~/helpers/enums/ErrorStatuses.enum'
import { DashAuthService } from '~/logic'

const route = useRoute()

const { status } = route.query as { status: string }

const { t } = useI18n()

switch (status) {
  case EErrorStatuses.NOT_AUTH: {
    new DashAuthService(getCurrentInstance()).logout(true)
    break
  }
  default:
    break
}
</script>

<template>
  <div>{{ t(`errors.${status}`) }}</div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>

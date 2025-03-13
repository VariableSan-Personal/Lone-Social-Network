<script setup lang='ts'>
import { user } from '~/logic'
</script>

<template>
  <div class="container">
    <h4>{{ user?.email }}</h4>
  </div>
</template>

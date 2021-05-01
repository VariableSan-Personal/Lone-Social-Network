<template>
  <ul class="social-links__divider">
    <li class="p-3">
      <a class="flex items-center group" href="https://vk.com/nnursultan">
        <mdi:vk class="mt-1 group-hover:text-blue-500 transition duration"></mdi:vk>
        <span class="inline-block ml-3">VKontakte</span>
      </a>
    </li>

    <li class="p-3">
      <a
        class="flex items-center group"
        href="https://www.youtube.com/channel/UClTwcs6f2vaSrO9vSBWJyAA"
      >
        <mdi:youtube class="mt-1 group-hover:text-red-500 transition duration"></mdi:youtube>
        <span class="inline-block ml-3">YouTube</span>
      </a>
    </li>

    <li class="p-3">
      <a class="flex items-center group" href="https://shikimori.one/Judgement">
        <simple-icons:shikimori class="mt-1 group-hover:text-black transition duration"></simple-icons:shikimori>
        <span class="inline-block ml-3">Shikimori</span>
      </a>
    </li>

    <li class="p-3">
      <a class="flex items-center group" href="https://steamcommunity.com/id/JudgementHC/">
        <mdi:steam class="mt-1 group-hover:text-blue-gray-900 transition duration"></mdi:steam>
        <span class="inline-block ml-3">Steam</span>
      </a>
    </li>
  </ul>
</template>

<style lang="postcss">
.social-links {
  &__divider {
    @apply divide-y divide-gray-100;
  }
}
</style>

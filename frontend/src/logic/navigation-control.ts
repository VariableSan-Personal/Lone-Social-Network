import { ref } from 'vue'
import { TLink } from '~/helpers/types/Link.type'

export const drawer = ref(false)

export const links = ref<TLink[]>([
  {
    title: 'nav-links.home',
    href: '/',
  },
  {
    title: 'nav-links.about',
    href: '/about',
  },
])

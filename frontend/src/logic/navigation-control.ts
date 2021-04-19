import { ref } from 'vue'
import { TLink } from '~/helpers/types/Link.type'

export const drawer = ref(false)

export const links = ref<TLink[]>([
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About me',
    href: '/about',
  },
])

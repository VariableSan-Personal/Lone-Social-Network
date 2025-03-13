import { ref } from 'vue'
import { TToken, TUser } from '~/helpers/types/User.type'

export const user = ref<TUser | null>()

export const token = ref<TToken | null>()

export const clearUserInfo = () => {
  user.value = null
  token.value = null
}

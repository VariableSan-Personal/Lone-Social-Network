import { ref } from 'vue'
import { ETheme, TUser } from '~/helpers/types/User.type'

export const user = ref<null | TUser>(null)

user.value = {

  email: 'nabi@gmail.com',
  login: 'Nabi',
  password: 'ainzOalGown',
  firstName: 'Narberal',
  lastName: 'Gamma',

  settings: {
    theme: ETheme.DARK,
    emailPreference: {
      messages: false,
      some: false,
    },
  },

}

export const logout = () => {
  user.value = null
}

import { ref } from 'vue'
import { ETheme, TUser } from '~/helpers/types/User.type'

export const user = ref<null | TUser>(null)

user.value = {

  email: 'nabi@gmail.com',
  login: 'Nabi',
  password: 'ainzOalGown',
  firstName: 'Narberal',
  lastName: 'Gamma',
  avatar: 'https://myanimelist.net/images/characters/3/290840.jpg',
  coverPhoto: {
    url: 'https://sun9-27.userapi.com/impg/FnlzewWbc5NuoChgYl6SFcFz-o8FcahGY7NjJQ/8oltt3214pI.jpg?size=2560x1724&quality=96&sign=a5d7373639cbfdfaa9916d1a645f588b&type=album',
    position: {
      x: 0,
      y: 150,
    },
  },

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

import VueScreen from 'vue-screen'
import { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(VueScreen, 'tailwind')
}

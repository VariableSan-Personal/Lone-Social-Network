import mitt from 'mitt'
import { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  const emitter = mitt()
  app.config.globalProperties.$emitter = emitter
}

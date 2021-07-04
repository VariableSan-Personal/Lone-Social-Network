import { ComponentInternalInstance } from '@vue/runtime-core'
import { DashAxiosService } from '~/helpers/abstracts/BaseAxios'
import { TAboutMe } from '~/helpers/types/AboutMe.type'

export class DashAboutService extends DashAxiosService {
  constructor(currentInstance: ComponentInternalInstance | null) {
    super(currentInstance)
  }

  getAboutData(): Promise<TAboutMe> {
    return this.axios.get('/items/about_me?fields=*.*.*')
  }
}

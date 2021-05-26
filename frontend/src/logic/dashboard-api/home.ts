import { ComponentInternalInstance } from 'vue'
import { fieldsJoiner } from './helpers'
import { DashAxiosService } from '~/helpers/abstracts/DashAxios'
import { THome } from '~/helpers/types/Home.type'

export class DashHomeService extends DashAxiosService {
  constructor(currentInstance: ComponentInternalInstance | null) {
    super(currentInstance)
  }

  getHomeData(): Promise<THome> {
    const params = [
      '*',
      'avatar.id',
      'cover_image.id',
      'social_links.*',
      'admin_info.*.*',
    ]

    return this.axios.get(`/items/home?${fieldsJoiner(params)}`)
  }
}

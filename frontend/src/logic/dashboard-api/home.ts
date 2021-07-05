import { ComponentInternalInstance } from 'vue'
import { fields, nested } from './helpers'
import { DashAxiosService } from '~/helpers/abstracts/BaseAxios'
import { THome } from '~/helpers/types/Home.type'
import { TPortfolioWork } from '~/helpers/types/PortfolioWork.type'

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

    return this.axios.get(`/items/home?${fields(params)}`)
  }

  getPortfolioWorks(): Promise<TPortfolioWork[]> {
    const params = [
      '*',
      nested('translations', undefined, 'id', 'description', 'languages_code'),
    ]

    return this.axios.get(
      `/items/portfolio_work?${fields(params)}&sort=-date&limit=10&page=1`,
    )
  }
}

import { ComponentInternalInstance } from '@vue/runtime-core'
import { fields, nested } from './helpers'
import { DashAxiosService } from '~/helpers/abstracts/BaseAxios'
import { TAboutMe } from '~/helpers/types/AboutMe.type'

export class DashAboutService extends DashAxiosService {
  constructor(currentInstance: ComponentInternalInstance | null) {
    super(currentInstance)
  }

  getAboutData(): Promise<TAboutMe> {
    const params = [
      nested(
        'experience',
        undefined,
        'company_name',
        'description',
        'end_date',
        'start_date',
        'position_name',
      ),

      nested(
        'education',
        undefined,
        'degree',
        'end_date',
        'start_date',
        'title',
      ),
    ]

    return this.axios.get(`/items/about_me?${fields(params)}`)
  }
}

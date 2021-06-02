import { ref } from 'vue'
import { THome } from '~/helpers/types/Home.type'
import { TPortfolioWork } from '~/helpers/types/PortfolioWork.type'

export const home = ref<THome>()
export const works = ref<TPortfolioWork[]>()

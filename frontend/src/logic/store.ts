import { ref } from 'vue'
import { TAboutMe } from '~/helpers/types/AboutMe.type'
import { THome } from '~/helpers/types/Home.type'
import { TPortfolioWork } from '~/helpers/types/PortfolioWork.type'

export const home = ref<THome>()
export const works = ref<TPortfolioWork[]>()
export const about = ref<TAboutMe>()

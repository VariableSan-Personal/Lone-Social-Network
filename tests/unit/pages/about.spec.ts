import { shallowMount } from '@vue/test-utils'
import AboutPage from '~/pages/about.vue'

describe('AboutPage', () => {
  it('should display title text', () => {
    const wrapper = shallowMount(AboutPage)

    expect(wrapper.find('h4.container').text()).toEqual('this is about page')
  })
})

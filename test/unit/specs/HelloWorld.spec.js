import Vue from 'vue'
import ManagePolls from '@/components/ManagePolls'

describe('ManagePolls.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ManagePolls)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})

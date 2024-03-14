import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      header: [],
    }
  },

  actions: {
    async loadHeaderApp() {
      const result: any = await useApiFetch('static.menu.top');
      this.header = result?.result.menu;
    },
  },
})
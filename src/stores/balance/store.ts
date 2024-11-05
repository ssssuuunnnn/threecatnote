import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
  state: () => ({
    assetList: reactive([])
  }),
  actions: {
    getAssetList () {
      const res = [
        {
          name: '台新銀行',
          currency: '台幣',
          amount: 100000,
        },
        {
          name: '台新銀行',
          currency: '台幣',
          amount: 100000,
        },
      ]
      return res
    },
    updateAssetList (list) {
      this.assetList = list
    },
    addAsset (asset) {
      this.assetList.push(asset)
    },
  }
})

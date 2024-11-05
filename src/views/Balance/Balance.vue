<template>
  <div class="balance flex flex-col gap-y-8">
    <h2 class="font-bold">設定資產負債</h2>
    <div class="container my-8">
      <div class="text-subtitle1 flex gap-x-4">
        <q-radio
          v-for="option of options"
          v-model="balanceType"
          :key="option.name"
          :val="option.name"
          :label="option.value"
        />
      </div>
      <asset v-if="balanceType === Type.Asset" @submit="onSubmit" />
      <debt v-if="balanceType === Type.Debt" />
    </div>
    <h2 class="font-bold">資產負債表</h2>
    <h3>資產</h3>
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :rows="assetList"
      :columns="assetListTable.columns"
      row-key="name"
      hide-pagination
    />
    <h3>負債</h3>
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :rows="debtList.rows"
      :columns="debtList.columns"
      row-key="name"
      hide-pagination
    />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue'
import { Type } from '@/enums/balance/Type'
import type { IType } from '@/interfaces/balance/IType'

import { useBalanceStore } from '@/stores/balance/store.ts'

import Asset from './Asset.vue'
import Debt from './Debt.vue'

const balanceStore = useBalanceStore()

defineComponent({
  name: 'BalanceTable',
})

const options: Array<IType> = reactive([
  {
    type: Type.Asset,
    name: Type.Asset,
    value: '資產',
  },
  {
    type: Type.Debt,
    name: Type.Debt,
    value: '負債',
  },
])

const balanceType = ref(Type.Asset)
const assetList = computed(() => balanceStore.assetList)

const assetListTable = reactive({
  columns: [
    {
      name: 'name',
      label: '名稱',
      field: 'name',
    },
    {
      name: 'currency',
      label: '幣別',
      field: 'currency',
    },
    {
      name: 'amount',
      label: '金額',
      field: 'amount',
    },
  ],
})

const debtList = reactive({
  columns: [
    {
      name: 'name',
      label: '名稱',
      field: 'name',
    },
    {
      name: 'currency',
      label: '幣別',
      field: 'currency',
    },
    {
      name: 'amount',
      label: '金額',
      field: 'amount',
    },
    {
      name: 'deducationDate',
      label: '扣款日',
      field: 'deducationDate',
    },
  ],
  rows: [
    {
      name: '台新銀行',
      currency: '台幣',
      amount: 100000,
      deducationDate: 'YYYY/MM/DD',
    },
    {
      name: '台新銀行',
      currency: '台幣',
      amount: 100000,
      deducationDate: 'YYYY/MM/DD',
    },
  ],
})

const onSubmit = ({ name, currency, amount }) => {
  balanceStore.addAsset({
    name,
    currency: currency.label,
    amount,
  })
}

onMounted(() => {
  const res = balanceStore.getAssetList()
  balanceStore.updateAssetList(res)
})
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

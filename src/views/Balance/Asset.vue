<template>
  <div>
    <q-input v-model="asset.name" label="銀行名稱" outlined class="my-4" />
    <q-select
      v-model="asset.currency"
      label="幣別"
      outlined
      class="my-4"
      :options="options"
    />
    <q-input v-model.number="asset.amount" label="餘額" outlined class="my-4" />
  </div>
  <div class="flex gap-x-4 justify-center">
    <q-btn unelevated color="primary" label="新增" @click="onSubmit" />
    <q-btn flat color="primary" label="清除" @click="onCancel" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, computed, defineEmits } from 'vue'
import { Type } from '@/enums/balance/Type'
import { Type as Currency } from '@/enums/currency/Currency'
import type { IType } from '@/interfaces/balance/IType'

defineComponent({
  name: 'BalanceAsset',
})
const emit = defineEmits(['submit'])

const options = reactive([
  {
    label: '台幣',
    value: Currency.TWD,
  },
  {
    label: '美金',
    value: Currency.USD,
  },
])

const asset = reactive({
  name: '',
  currency: {
    label: '台幣',
    value: Currency.TWD,
  },
  amount: 0,
})

const onSubmit = () => {
  emit('submit', asset)
  onCancel()
}

const onCancel = () => {
  asset.name = ''
  asset.currency = {
    label: '台幣',
    value: Currency.TWD,
  }
  asset.amount = 0
}
</script>

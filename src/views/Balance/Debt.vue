<template>
  <div>
    <q-select
      v-model="debt.name"
      label="項目"
      outlined
      class="my-4"
      :options="options"
    />
    <q-input v-model.number="debt.amount" label="金額" outlined class="my-4" />
    <q-input
      filled
      v-model="debt.deducationDate"
      label="扣款日期"
      mask="date"
      :rules="['date']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="debt.deducationDate">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { Type } from '@/enums/balance/Type'
import { Type as Currency } from '@/enums/currency/Currency'
import type { IType } from '@/interfaces/balance/IType'

defineComponent({
  name: 'BalanceDebt',
})

const options = reactive([
  {
    label: '信用卡',
    value: 1,
  },
  {
    label: '房屋貸款',
    value: 2,
  },
])

class Debt {
  constructor() {}

  _name = ref('')
  _currency = ref(Currency.TWD)
  _amount = ref(0)
  _deducationDate = ref('')

  get currency() {
    return this._currency.value
  }

  get name() {
    return this._name.value
  }
  set name(name: string) {
    this._name.value = name
  }

  get amount() {
    return this._amount.value
  }
  set amount(amount: number) {
    this._amount.value = amount
  }

  get deducationDate() {
    return this._deducationDate.value
  }
  set deducationDate(deducationDate: string) {
    this._deducationDate.value = deducationDate
  }
}

const debt = new Debt()
</script>

<script setup>
import axios from 'axios'
import { ref, computed, inject } from 'vue'
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const emit = defineEmits(['createOrder'])

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart, closeDrawer } = inject('cart')

const isCreating = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post('https://d00e62bce0bd5f0c.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })

    cart.value = []

    orderId.value = data.id
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}
const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>

<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-50 z-10" @click="closeDrawer"></div>
  <div
    class="bg-white w-full max-w-xs h-auto fixed right-0 bottom-0 z-20 p-4 shadow-lg transition-transform transform sm:max-w-xs md:max-w-sm lg:w-1/5 rounded-tl-lg"
  >
    <DrawerHead />

    <div
      v-if="!totalPrice && !orderId"
      class="flex flex-col items-center justify-center h-full text-center"
    >
      <InfoBlock
        title="Корзина пуста"
        description="Добавьте товар, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
    </div>
    <div
      v-else-if="orderId"
      class="flex flex-col items-center justify-center h-full text-center"
    >
      <InfoBlock
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else class="overflow-y-auto max-h-80">
      <CartItemList />
      <div class="bg-gray-100 rounded-lg px-4 py-3 mt-4 flex flex-col gap-2">
        <div class="flex justify-between items-center text-sm font-medium text-gray-600">
          <span>Итого:</span>
          <b class="text-lg text-indigo-600">{{ totalPrice }} ₽</b>
        </div>
        <div class="flex justify-between items-center text-sm font-medium text-gray-600">
          <span>Налог 5%:</span>
          <b class="text-gray-600">{{ vatPrice }} ₽</b>
        </div>
      </div>
      <button
        :disabled="buttonDisabled"
        @click="createOrder"
        class="mt-4 bg-indigo-500 w-full rounded-lg py-2 text-white text-sm font-medium disabled:bg-gray-400 hover:bg-indigo-600 transition-colors duration-150 ease-in-out"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
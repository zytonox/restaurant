<template>
  <RouterBlock />

  <div class="wrapper" ref="wrapper">
    <div class="container">
      <HeaderBlock
        :title="'КОРЗИНА С ВЫБРАННЫМИ ТОВАРАМИ'"
        is-basket
        is-shown
      />

      <MainBlock @set-scroll="setScroll" />
    </div>

    <FooterBasket @make-Order="showMessage" />
  </div>

  <ModalBasket v-if="isModal" ref="modal">
    {{ message }}
  </ModalBasket>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import RouterBlock from '@/components/blocks/RouterBlock.vue'
import HeaderBlock from '@/components/blocks/HeaderBlock'
import MainBlock from '@/components/blocks/MainBlock'
import FooterBasket from '@/components/blocks/FooterBasket'
import ModalBasket from '@/components/blocks/ModalBasket.vue'

export default {
  name: 'BasketPage',
  components: {
    RouterBlock,
    HeaderBlock,
    MainBlock,
    FooterBasket,
    ModalBasket
  },
  setup () {
    const store = useStore()
    const router = useRouter()

    const wrapper = ref()
    const modal = ref()
    const message = ref()

    const isModal = ref(false)

    const clearBasket = () => {
      store.commit('clearBasket')
    }

    const showMessage = () => {
      const isBasketEmpty = !store.getters.getCountProductsInBasket
      if (!isBasketEmpty) {
        clearBasket()

        message.value = 'Ваш заказ оформлен!'
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        message.value = 'Корзина пуста!'
      }

      isModal.value = true
    }

    const setScroll = () => (wrapper.value.style.overflowY = 'scroll')

    return {
      wrapper,
      modal,
      message,
      isModal,
      showMessage,
      setScroll
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper::-webkit-scrollbar {
  visibility: hidden;
}
</style>

<template>
  <main
    ref="main"
    :class="{
      main: true,
      main_basket: isBasket,
    }"
  >
    <div
      :class="{
        'card-container': true,
        'card-container_basket': isBasket,
      }"
    >
      <CardElement
        v-for="product in currentProducts"
        :key="product.id"
        :count="product.count"
        :description="product.description"
        :price="product.price"
        :title="product.title"
        :urlImage="product.img"
        :weight="product.weight"
        @open-product="openProduct(product)"
      >
        <ButtonCircle
          v-show="product.count"
          is-remove
          @click.stop="removeProduct(product)"
        />

        <template #addButton>
          <ButtonCircle @click.stop="addProduct(product)" />
        </template>
      </CardElement>
    </div>
  </main>
</template>

<script>
import { ref, computed, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import CardElement from '@/components/elements/CardElement'
import ButtonCircle from '@/components/ui/ButtonCircle'

export default {
  name: 'MainBlock',
  components: {
    CardElement,
    ButtonCircle
  },
  setup (_, { emit }) {
    const store = useStore()
    const router = useRouter()

    const main = ref()

    const checkScroll = () => {
      /**
       * @param {{$el:string}} data
       */
      const mainHeight = main.value.clientHeight
      const viewHeight = window.innerHeight - 139
      if (mainHeight <= viewHeight) {
        emit('setScroll')
      }
    }

    /**
     * @param {{currentRoute:string}} data
     */
    const isBasket = router.currentRoute.value.name === 'basket'

    const currentProducts = !isBasket
      ? computed(() => store.getters.getProducts)
      : computed(() => store.getters.getBasketProducts)

    const addProduct = (product) => store.commit('addProduct', product)

    const removeProduct = (product) => store.commit('removeProduct', product)

    const openProduct = (product) => {
      store.commit('setCurrentProduct', product)
      router.push(`product/${product.id}`)
    }

    onMounted(() => checkScroll())

    onUpdated(() => checkScroll())

    return {
      main,
      isBasket,
      currentProducts,
      addProduct,
      removeProduct,
      openProduct
    }
  }
}
</script>

<style lang="scss" scoped>
.main_basket {
  max-width: 860px;
  margin: 0 auto;
}

.card-container_basket {
  flex-direction: column;
}
</style>

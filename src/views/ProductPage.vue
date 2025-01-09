<template>
  <RouterBlock />

  <div class="wrapper">
    <div class="container">
      <HeaderBlock is-product is-shown />

      <MainProduct
        :description="currentProduct.description"
        :price="currentProduct.price"
        :title="currentProduct.title"
        :urlImage="currentProduct.img"
        :weight="currentProduct.weight"
      >
        <ButtonRect
          v-show="!currentProduct.count"
          has-background
          @click="addProduct(currentProduct)"
        >
          В корзину
        </ButtonRect>

        <div v-show="!!currentProduct.count" class="product__controls">
          <ButtonCircle is-remove @click="removeProduct(currentProduct)" />

          <p class="counter">
            {{ currentProduct.count }}
          </p>

          <ButtonCircle @click="addProduct(currentProduct)" />
        </div>
      </MainProduct>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import RouterBlock from '@/components/blocks/RouterBlock.vue'
import HeaderBlock from '@/components/blocks/HeaderBlock'
import MainProduct from '@/components/blocks/MainProduct'
import ButtonRect from '@/components/ui/ButtonRect'
import ButtonCircle from '@/components/ui/ButtonCircle'

export default {
  name: 'ProductPage',
  components: {
    RouterBlock,
    HeaderBlock,
    MainProduct,
    ButtonRect,
    ButtonCircle
  },
  setup () {
    const store = useStore()
    const route = useRoute()

    const currentProduct = ref({})
    const products = computed(() => store.getters.getProducts)

    const addProduct = (product) => store.commit('addProduct', product)

    const removeProduct = (product) => store.commit('removeProduct', product)

    onMounted(() => {
      currentProduct.value = products.value.find(
        (product) => product.id.toString() === route.params.id
      )
    })

    return {
      currentProduct,
      addProduct,
      removeProduct
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.wrapper {
  height: 100vh;
  background: url("../assets/images/background-product.jpg");
  background-size: 100% auto;
  overflow: scroll;

  &::-webkit-scrollbar {
    visibility: hidden;
  }
}

.product__controls {
  @include flex-centre;
  justify-content: space-evenly;
  width: 200px;
  height: 42px;
  padding: 0 10px;
}
</style>

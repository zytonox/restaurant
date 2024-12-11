<template>
  <div class="footer">
    <div class="footer__content-container">
      <div class="footer__info-container">
        <p class="footer__info">ЗАКАЗ НА СУММУ:</p>

        <p class="footer__price">
          {{ showAllPriceProductsInBasket(allPriceProductsInBasket) }}
          ₽
        </p>
      </div>

      <ButtonRect has-background @click="$emit('makeOrder')"
        >Оформить заказ
      </ButtonRect>
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue'
import { useStore } from 'vuex'

import ButtonRect from '@/components/ui/ButtonRect'

export default {
  name: 'FooterBasket',
  components: {
    ButtonRect
  },
  setup () {
    const store = useStore()

    const allPriceProductsInBasket = computed(
      () => store.getters.getAllPriceProductsInBasket
    )

    const showAllPriceProductsInBasket = inject('showPrice')

    return {
      allPriceProductsInBasket,
      showAllPriceProductsInBasket
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 89px;
  border-top: 1px solid $color-primary;
  background-color: $color-tertiary;

  &__content-container {
    @include flex-centre;
    justify-content: space-between;
    max-width: 860px;
    height: 100%;
    margin: 0 auto;
  }

  &__info-container {
    @include flex-centre;
    gap: 16px;
  }

  &__info {
    font-size: 21px;
    font-weight: 400;
  }

  &__price {
    @include font-regular;
    color: $color-primary;
  }
}
</style>

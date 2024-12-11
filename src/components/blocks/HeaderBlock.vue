<template>
  <header
    :class="{
      header: true,
      header_basket: isBasket,
      header_product: isProduct,
    }"
  >
    <ButtonCircle
      v-show="isShown"
      class="header-button"
      is-return
      @click="router.go(-1)"
    />

    <h1 class="title">{{ title }}</h1>

    <div class="header__inner-container">
      <div
        :class="{
          'header__basket-container': true,
          'header__basket-container_basket': isBasket,
        }"
      >
        <p class="header__basket-info">
          {{ countProductsInBasket }} товара на сумму
          {{ showAllPriceProductsInBasket(allPriceProductsInBasket) }}
          ₽
        </p>

        <RouterLink to="/basket">
          <basketIcon class="header__basket-icon" />
        </RouterLink>
      </div>

      <RouterLink to="/auth">
        <ButtonRect @click="logOut">Выйти</ButtonRect>
      </RouterLink>
    </div>
  </header>
</template>

<script>
import { computed, ref, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import basketIcon from '@/components/icons/basketIcon'
import ButtonRect from '@/components/ui/ButtonRect'
import ButtonCircle from '@/components/ui/ButtonCircle'

export default {
  name: 'HeaderBlock',
  components: {
    basketIcon,
    ButtonRect,
    ButtonCircle
  },
  props: {
    isBasket: {
      type: Boolean,
      default: false
    },
    isProduct: {
      type: Boolean,
      default: false
    },
    isShown: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()

    const countProductsInBasket = computed(
      () => store.getters.getCountProductsInBasket
    )

    const allPriceProductsInBasket = computed(
      () => store.getters.getAllPriceProductsInBasket
    )

    const showAllPriceProductsInBasket = inject('showPrice')

    const buttonName = ref()

    const isUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn'))

    const logOut = () => {
      if (isUserLoggedIn) {
        localStorage.setItem('isUserLoggedIn', 'false')
      }
    }

    return {
      router,
      countProductsInBasket,
      allPriceProductsInBasket,
      showAllPriceProductsInBasket,
      buttonName,
      logOut
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.header {
  @include flex-centre;
  justify-content: space-between;
  padding: 51px 0 81px;

  &_basket {
    padding-bottom: 35px;
  }

  &_product {
    padding-bottom: 25px;
  }

  &__inner-container,
  &__basket-container {
    @include flex-centre;
    gap: 20px;
  }

  &__basket-container_basket {
    display: none;
  }

  &__basket-info {
    width: 170px;
    height: 42px;
    line-height: 21px;
    text-align: right;
    text-indent: 75px;
  }

  &-button {
    @include flex-centre;
  }
}
</style>

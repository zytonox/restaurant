<template>
  <router-view />
</template>

<script>
import { provide } from 'vue'

export default {
  setup () {
    const showAllPriceProductsInBasket = (price) => {
      return price < 9999
        ? price.toString().slice(0, 1) + ' ' + price.toString().slice(1)
        : price.toString().slice(0, 2) + ' ' + price.toString().slice(2)
    }

    provide('showPrice', showAllPriceProductsInBasket)
  }
}
</script>

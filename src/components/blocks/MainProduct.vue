<template>
  <div class="product">
    <img :src="urlImage" alt="preview" class="product__preview" />

    <div class="product__info-container">
      <h2 class="product__title">
        {{ title }}
      </h2>

      <p class="product__description">
        {{ description }}
      </p>

      <div class="product__price-container">
        <p class="product__price">
          {{ price.toString().slice(0, 1) + " " + price.toString().slice(1) }} ₽

          <span class="product__weight"> / {{ weight }} </span>
        </p>

        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainProduct',
  props: {
    urlImage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    },
    weight: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.product {
  display: flex;
  gap: clamp(30px, 5vw, 199px);
  padding-left: 74px;

  &__info-container {
    max-width: 528px;
  }

  &__preview {
    height: 503px;
  }

  &__title {
    display: inline-block;
    max-width: 414px;
    margin: 83px 0 21px;
    font-size: 30px;
    color: $color-primary;
  }

  &__description {
    height: 213px;
    @include font-normal;
  }

  &__price-container {
    @include flex-centre;
    gap: 68px;
  }

  &__price {
    font-size: 23px;
  }

  &__weight {
    margin-left: 9px;
    @include font-regular;
    vertical-align: middle;
  }
}
</style>

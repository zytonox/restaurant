<template>
  <div
    :class="{
      card: true,
      card_basket: isBasket,
    }"
  >
    <img
      :class="{
        card__preview: true,
        card__preview_basket: isBasket,
      }"
      :src="urlImage"
      alt="preview"
      @click="$emit('openProduct')"
    />

    <h2
      :class="{
        card__title: true,
        card__title_basket: isBasket,
      }"
    >
      {{ title }}
    </h2>

    <p
      :class="{
        card__description: true,
        card__description_basket: isBasket,
      }"
    >
      {{ description }}
    </p>

    <div
      :class="{
        card__addition: true,
        card__addition_basket: isBasket,
      }"
    >
      <p
        :class="{
          card__price: true,
          card__price_basket: isBasket,
        }"
      >
        {{ price.toString().slice(0, 1) + " " + price.toString().slice(1) }} ₽

        <span
          :class="{
            card__weight: true,
            card__weight_basket: isBasket,
          }"
        >
          / {{ weight }}
        </span>
      </p>

      <slot />

      <p v-show="checkForCount()" class="counter">
        {{ count }}
      </p>

      <slot name="addButton" />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'CardElement',
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
    },
    count: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const route = useRoute()

    const isBasket = route.name === 'basket'

    const checkForCount = () => !!props.count

    return {
      isBasket,
      checkForCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

img {
  cursor: pointer;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 312px;
  height: 552px;
  padding: 43px 21px 32px;
  border: 1px solid $color-primary;

  &_basket {
    flex-direction: row;
    justify-content: space-between;
    max-width: 860px;
    height: unset;
    padding: 0;
    border: none;
  }

  &__preview {
    width: 270px;

    &_basket {
      width: 132px;
    }
  }

  &__title {
    margin: 31px 0 13px;
    line-height: 21px;

    &_basket {
      min-width: 310px;
      margin: auto 0;
    }
  }

  &:hover &__title,
  &:hover &__description,
  &:hover &__price,
  &:hover &__weight {
    color: $color-primary;
  }

  &__description {
    flex-grow: 2;
    @include font-normal;
    line-height: 17px;

    &_basket {
      display: none;
    }
  }

  &__addition {
    @include flex-centre;
    justify-content: space-between;
    width: 260px;

    &_basket {
      position: unset;
      gap: 15px;
      width: unset;
    }
  }

  &__price {
    height: 21px;
    line-height: 21px;

    &_basket {
      margin-right: 30px;
      @include font-regular;
      color: $color-primary;
    }
  }

  &__weight {
    @include font-normal;

    &_basket {
      display: none;
    }
  }
}
</style>

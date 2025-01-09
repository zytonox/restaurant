<template>
  <div
    :class="{
      'button-circle': true,
      'button-circle_remove': isRemove,
      'button-circle_return': isReturn,
    }"
  >
    <div
      :class="{
        'button-circle__stripe': true,
        'button-circle__stripe_remove': isRemove,
        'button-circle__stripe_return': isReturn,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ButtonCircle',
  props: {
    isRemove: {
      type: Boolean,
      default: false
    },
    isReturn: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.button-circle {
  position: relative;
  width: 30px;
  height: 30px;
  border: 1px solid $color-secondary;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    border: 1px solid $color-primary;
    background-color: $color-primary;
  }

  &:hover &__stripe {
    background-color: $color-secondary;

    &::before {
      background-color: $color-secondary;
    }

    &::after {
      background-color: $color-secondary;
    }
  }

  &_remove {
    border: 1px solid $color-secondary;
  }

  &_return {
    width: 32px;
    height: 32px;
    border: 1px solid $color-primary;
  }

  &__stripe {
    position: absolute;
    inset: 13px auto auto 8px;
    width: 11px;
    height: 2px;
    border-radius: 15px;
    background-color: $color-secondary;

    &::before {
      position: absolute;
      width: 11px;
      height: 2px;
      transform: rotate(90deg);
      border-radius: 15px;
      background-color: $color-secondary;
      content: '';
    }

    &_remove {
      inset: 14px auto auto 7px;
      width: 14px;
      height: 1px;
      transform: rotate(45deg);
      background: $color-secondary;

      &::before {
        width: 14px;
        height: 1px;
        background: $color-secondary;
      }
    }

    &_return {
      inset: 15px auto auto 10.3px;
      width: 9.6px;
      height: 1px;
      background-color: $color-primary;

      &::before {
        inset: auto 5.4px 1.5px auto;
        width: 5px;
        height: 1px;
        transform: rotate(315deg);
        background-color: $color-primary;
        content: '';
      }

      &::after {
        position: absolute;
        inset: 1.5px 5.4px auto auto;
        width: 5px;
        height: 1px;
        transform: rotate(45deg);
        border-radius: 15px;
        background-color: $color-primary;
        content: '';
      }
    }
  }
}
</style>

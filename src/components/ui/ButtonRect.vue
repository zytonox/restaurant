<template>
  <button
    :class="{
      button: true,
      button_filled: hasBackground,
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonRect',
  props: {
    hasBackground: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.button {
  min-width: 200px;
  height: 42px;
  @include font-normal;
  color: $color-primary;
  border: 1px solid $color-primary;
  background: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: $color-secondary;
    background-color: $color-primary;
  }

  &_filled {
    color: #131313;
    border: none;
    background-color: $color-primary;

    &:hover {
      color: $color-primary;
      border: 1px solid $color-primary;
      background: none;
    }
  }
}
</style>

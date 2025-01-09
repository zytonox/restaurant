<template>
  <div class="modal">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ModalBasket'
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.modal {
  position: absolute;
  left: calc(50vw - 200px);
  @include flex-centre;
  justify-content: center;
  width: 400px;
  height: 200px;
  font-size: 25px;
  border: 1px solid $color-primary;
}
</style>

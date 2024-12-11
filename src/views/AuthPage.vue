<template>
  <RouterBlock />

  <div class="wrapper">
    <FormAuth />
  </div>
</template>

<script>
import RouterBlock from '@/components/blocks/RouterBlock.vue'
import FormAuth from '@/components/blocks/FormAuth'

export default {
  name: 'AuthPage',
  components: {
    RouterBlock,
    FormAuth
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100vh;
  background: url("../assets/images/background.jpg") center center;
  background-size: cover;
}
</style>

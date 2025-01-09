<template>
  <RouterBlock />

  <div ref="container" class="container">
    <HeaderBlock :title="'НАША ПРОДУКЦИЯ'" />

    <MainBlock @set-scroll="setScroll" />
  </div>
</template>

<script>
import { ref } from 'vue'

import RouterBlock from '@/components/blocks/RouterBlock.vue'
import HeaderBlock from '@/components/blocks/HeaderBlock'
import MainBlock from '@/components/blocks/MainBlock'

export default {
  name: 'MainPage',
  components: {
    RouterBlock,
    HeaderBlock,
    MainBlock
  },
  setup () {
    const container = ref()

    const setScroll = () => (container.value.style.overflowY = 'scroll')

    return {
      container,
      setScroll
    }
  }
}
</script>

<style lang="scss" scoped>
.container::-webkit-scrollbar {
  visibility: hidden;
}
</style>

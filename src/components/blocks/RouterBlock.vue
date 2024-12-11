<template>
  <slot />
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'RouterBlock',
  setup () {
    const router = useRouter()
    const isUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn'))

    if (!isUserLoggedIn) {
      router.push('/auth')
    }

    const currentRoute = router.currentRoute.value.name
    if (currentRoute === 'auth' && isUserLoggedIn) {
      router.push('/')
    }
  }
}
</script>

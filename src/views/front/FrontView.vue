<template>
  <FrontNavbar></FrontNavbar>
  <router-view></router-view>
</template>

<script>
import FrontNavbar from '@/components/front/FrontNavbar.vue'
export default {
  components: {
    FrontNavbar
  }
}
</script>

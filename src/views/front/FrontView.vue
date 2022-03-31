<template>
  <FrontNavbar></FrontNavbar>
  <router-view></router-view>
</template>

<script>
import FrontNavbar from '@/components/navbar/FrontNavbar.vue'
export default {
  components: {
    FrontNavbar
  }
}
</script>

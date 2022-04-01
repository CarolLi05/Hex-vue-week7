<template>
  <AdminNavbar></AdminNavbar>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
import AdminNavbar from '@/components/navbar/AdminNavbar.vue'
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  components: {
    AdminNavbar
  },
  methods: {
    checkLogin () {
      // eslint-disable-next-line no-useless-escape
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = token
        this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
          .then((res) => {
            // console.log(res.data)
            this.checkSuccess = true
          })
          .catch((err) => {
            console.dir(err)
            alert(err.data.message)
            this.$router.push('/login')
          })
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>

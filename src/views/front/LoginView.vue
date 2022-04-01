<template>
<div class="container">
  <div class="row justify-content-center">
    <h1 class="h3 my-3 font-weight-normal">登入後台</h1>
    <div class="col-8">
      <form id="form" class="form-signin" @submit.prevent="login">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" v-model="user.username" id="username" placeholder="name@example.com" required autofocus>
          <label for="username">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" v-model="user.password" id="password" placeholder="Password" required>
          <label for="password">Password</label>
        </div>
        <button class="btn btn-lg btn-dark w-100 my-3" type="submit">登入</button>
        <button class="btn btn-lg btn-outline-dark w-100" type="submit">回到前台首頁</button>
      </form>
    </div>
  </div>
  <p class="mt-5 mb-3 text-muted">
    &copy; 2280~∞ - APEXC
  </p>
</div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          // console.log(token, expired)
          document.cookie = `loginToken = ${token}; expires = ${new Date(expired)}`
          // 轉到後台
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          console.dir(err)
          alert('登入資料有誤，請重新輸入！')
          this.user.username = ''
          this.user.password = ''
        })
    }
  }
}
</script>

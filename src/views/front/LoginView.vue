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

// eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjQ4NzA0MDk2LCJ1c2VyX2lkIjoiMWNyZnZlZ3hhWFU4d3BobDhoOTRSTUljckNxMiIsInN1YiI6IjFjcmZ2ZWd4YVhVOHdwaGw4aDk0Uk1JY3JDcTIiLCJpYXQiOjE2NDg3MDQwOTcsImV4cCI6MTY0OTEzNjA5NywiZW1haWwiOiJkaW5vc2F1cjA1MTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZGlub3NhdXIwNTE0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.IxZdWbvgNXdh5supN1LjSc1o-YD5VQfCTNKqd7kI6NOA4E4u33LXkEmxkoZnfR-WnDbKyFB4mEqyYq_OQdem2itX_3pyqJS4bxU-lmuOE2tFi8NRBvPPpAqoSwQHDeZwelCUJWS1aCvrbPp6MPdrgYLygSLu7lRNpbmn17RdsHlnawAESCO1SwBPSQtRhuUHjnUFoDLwstg-f4QGyj5BTRNqtcbBBIzARU3B1qjhWLdiaZibjGIHSgKW_MqNyochG9Kuj8m5H_DvgXJjRHeokzC7sHctif6_4nInPJ0NEvbmIsFltweETGmW8GJMtLBRo9SYFLxg0Et4oaNfAydrjA
</script>

<template>
  <div class="py-3"></div>
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="card border-0">
          <img :src="product.imageUrl" alt="" class="card-img ">
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card border-0">
          <div class="card-body">
            <h2 class="card-title">{{product.title}}</h2>
            <p class="card-text">{{product.description}}</p>
            <router-link class="btn btn-dark w-100" to="/orderForm">預約旅程</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    // $router -> 方法
    // $route -> 物件 -> 取值
    getProduct () {
      console.log(this.$route)
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      ).then((res) => {
        this.product = res.data.product
      })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<template>
  <div class="container">
    <h2>Single Product</h2>
    <img :src="product.imageUrl" class="card-img-top" alt="...">
    {{ product }}
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

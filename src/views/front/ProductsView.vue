<template>
  <h2>Products</h2>
  {{products}}
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      this.$http(
        `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      ).then((res) => {
        this.products = res.data.products
      })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

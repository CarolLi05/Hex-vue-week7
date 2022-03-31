<template>
  <div class="container">
    <h2>Products List</h2>
    <!-- row 決定內層的數量 -->
    <div class="row row-cols-1 row-cols-lg-4 g-3">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img :src="product.imageUrl" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{product.title}}</h5>
            <p class="card-text">{{product.description}}</p>
            <router-link :to="`/product/${product.id}`" class="btn btn-primary">More</router-link>
            <button type="button" class="btn btn-dark ms-2" @click="addToCart(product.id)" :disabled="isLoadingItem === product.id">
              <i class="fas fa-spinner fa-pulse" v-show="isLoadingItem === product.id"></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      products: [],
      cartData: {
        carts: [] // 清空購物車時需要
      }, // 購物車列表
      isLoadingItem: ''
    }
  },
  methods: {
    getProducts () {
      this.$http(
        `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      ).then((res) => {
        this.products = res.data.products
      })
    },
    addToCart (id, qty = 1) {
      const data = { // 建構資料格式
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          console.log(res)
          alert('已成功加入購物車')
          // this.getCart() // 加入購物車後，再重新取得購物車內容
          // this.$refs.productModal.closeModal() // 使用 ref 關閉 modal
          this.isLoadingItem = '' // 加入購物車後，把 id 清空
          // 匯入 emitter 的 get-cart
          emitter.emit('get-cart')
        })
        .catch((err) => {
          console.dir(err)
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

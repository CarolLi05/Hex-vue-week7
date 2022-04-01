<template>
<div class="container">
  <h2 class="py-3">OrderForm</h2>
  <form class="row g-3">
    <div class="col-12">
      <label for="journey" class="form-label">預約旅程</label>
      <select class="form-select" name="" id="journey" v-model="products.qty">
        <option value="0" disabled selected>請選擇要預約的旅程</option>
        <option v-for="product in products" :key="`${product.id}`+1" :value="product.title" :selected="product.title">{{product.title
}}</option>
      </select>
    </div>
    <div class="col-md-6">
      <label for="firstName" class="form-label">姓</label>
      <input type="text" class="form-control" id="firstName">
    </div>
    <div class="col-md-6">
      <label for="lastName" class="form-label">名</label>
      <input type="text" class="form-control" id="lastName">
    </div>
    <div class="col-12">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email">
    </div>
    <div class="col-12">
      <label for="phone" class="form-label">電話</label>
      <input type="number" class="form-control" id="phone">
    </div>
    <div class="col-12">
      <label for="address" class="form-label">地址</label>
      <input type="text" class="form-control" id="address" placeholder="1234 Main St">
    </div>
    <div class="col-12">
      <label for="address2" class="form-label">Address 2</label>
      <input type="text" class="form-control" id="address2" placeholder="Apartment, studio, or floor">
    </div>
    <div class="col-md-6">
      <label for="city" class="form-label">City</label>
      <input type="text" class="form-control" id="city">
    </div>
    <div class="col-md-6">
      <label for="state" class="form-label">State</label>
      <select id="state" class="form-select">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="col-12">
      <label for="note" class="form-label">備註</label>
      <textarea class="form-control" id="note" rows="5"></textarea>
    </div>
    <!-- <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck">
        <label class="form-check-label" for="gridCheck">
          Check me out
        </label>
      </div>
    </div> -->
    <div class="col-12">
      <button type="button" class="btn btn-dark w-100" @click="addToCart(product.id)">完成預約</button>
    </div>
  </form>
</div>
</template>

<script>
import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      products: [],
      product: [],
      isLoadingItem: '',
      qty: 1
    }
  },
  methods: {
    getProducts () {
      this.$http(
        `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      ).then((res) => {
        this.products = res.data.products
      }).catch((err) => {
        console.log(err)
      })
    },
    // getProduct () {
    //   const id = this.$route.params.id
    //   this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
    //     .then((res) => {
    //       this.product = res.data.product
    //     }).catch((err) => {
    //       console.log(err)
    //     })
    // },
    // 加入購物車
    addToCart (id, qty = 1) {
      // 判斷loading的時機
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
        data: {
          product_id: id,
          qty: qty
        }
      })
        .then((res) => {
          this.isLoadingItem = ''
          this.getProduct()
          emitter.emit('get-cart-list')
          alert(res.data.message)
          this.qty = 1
        }).catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

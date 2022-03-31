<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/admin/products">APEXC Dashboard</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon">Coupon</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Front</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

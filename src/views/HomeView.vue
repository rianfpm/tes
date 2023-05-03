<template>
  <div class="home">
    <Navbar />
    <body>
      <h2>Home</h2>
    </body>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(120deg, #2980b9, #000000);
  height: 100vh;
  font-size: .875rem;
}
</style>
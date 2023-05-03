<template>
  <Navbar></Navbar>
  <div
    class="container"
    style="background-color: white; border-radius: 10px; margin-top: 10px"
  >
    <h2 style="padding: 10px 10px">Edit Customer</h2>

    <div class="container">
      <form action="<?= BASEURL; ?>/mahasiswa/tambah" method="post">
        <input type="hidden" name="id" id="id" />
        <div class="mb-3">
          <label for="nama" class="form-label">Nama</label>
          <input type="text" class="form-control" id="nama" />
        </div>
        <div class="mb-3">
          <label for="contact" class="form-label">Contact</label>
          <input type="text" class="form-control" id="contact" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" />
        </div>
        <div class="mb-3">
          <label for="alamat" class="form-label">Alamat</label>
          <textarea class="form-control" id="alamat" rows="3"></textarea>
        </div>
        <div class="mb-3">
          <label for="diskon" class="form-label">Diskon</label>
          <input type="number" class="form-control" id="diskon" />
        </div>
        <div class="mb-3">
          <label for="type_diskon" class="form-label">Tipe Diskon</label>
          <select class="form-control" id="type_diskon">
            <option value="persentase">Percent</option>
            <option value="fix">Fix</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="ktp" class="form-label">KTP</label>
          <input type="file" class="form-control" id="ktp" />
        </div>
      </form>
      <router-link to="/customer" class="btn btn-secondary me-1">back</router-link>
      <router-link to="/" class="btn btn-primary">update</router-link>
    </div>
  </div>
</template>
  
<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "EditCustomer",
  components: {
    Navbar,
  },
};
</script>
  
  <style>
</style>
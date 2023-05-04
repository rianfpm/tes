<template>
  <Navbar></Navbar>
  <div
    class="container"
    style="background-color: white; border-radius: 10px; margin-top: 10px"
  >
    <h2 style="padding: 10px 10px">Sales</h2>
    <div class="d-flex align-content-end justify-content-end">
      <button
        type="button"
        class="btn btn-primary tombolTambahData"
        data-bs-toggle="modal"
        data-bs-target="#formModal"
      >
        Tambah Data
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Kode Transaksi</th>
            <th scope="col">Tanggal Transaksi</th>
            <th scope="col">Customer</th>
            <th scope="col">Item</th>
            <th scope="col">total diskon</th>
            <th scope="col">total harga</th>
            <th scope="col">total bayar</th>
            <th scope="col">aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sales" :key="item.sales_id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.kode_transaksi }}</td>
            <td>{{ formatDate(item.tanggal_transaksi) }}</td>
            <td>{{ item.Customer.name }}</td>
            <td>{{ item.SalesItems.length }}</td>
            <td>{{ item.total_diskon }}</td>
            <td>{{ item.total_harga }}</td>
            <td>{{ item.total_bayar }}</td>
            <td>
              <router-link
                :to="{ name: 'DetailSales', params: { id: item.sales_id } }"
                >Detail</router-link
              >
              |
              <a href="#" @click="deleteSales(item.sales_id, index)">Hapus</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div
    class="modal fade"
    id="formModal"
    tabindex="-1"
    aria-labelledby="judulModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="judulModal">Tambah Data Item</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="customer">Customer</label>
              <select
                class="form-control"
                id="customer"
                v-model="selectedCustomer"
                required
              >
                <option
                  v-for="customer in customers"
                  :key="customer.customer_id"
                  :value="customer.customer_id"
                >
                  {{ customer.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="items">Items</label>
              <div v-for="(item, index) in item" :key="item.item_id">
                <div class="form-inline">
                  <select
                    class="form-control mr-2 mt-2"
                    v-model="selectedItems[index].item_id"
                    :name="'items[' + index + '][item_id]'"
                    required
                  >
                    <option
                      v-for="i in itemOptions"
                      :key="i.item_id"
                      :value="i.item_id"
                    >
                      {{ i.name }}
                    </option>
                  </select>
                  <input
                    type="number"
                    class="form-control mr-2 mt-2"
                    v-model="selectedItems[index].qty"
                    :name="'items[' + index + '][qty]'"
                    min="1"
                    required
                  />
                  <button
                    type="button"
                    class="btn btn-danger mt-2"
                    @click="removeItem(index)"
                    v-show="index > 0"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-success mt-2"
                @click="addItem"
              >
                Tambah Item
              </button>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "Sales",
  components: {
    Navbar,
  },
  data() {
    return {
      customers: [],
      sales: [],
      item: [{ item_id: "", qty: 1 }],
      itemOptions: [],
      selectedCustomer: "",
      selectedItems: [{ item_id: "", qty: 1 }],
    };
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3002/customer")
        .then((response) => {
          this.customers = response.data;
          console.log(this.customers);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:3002/item")
        .then((response) => {
          this.itemOptions = response.data;
          console.log(this.itemOptions);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:3002/sales")
        .then((response) => {
          this.sales = response.data.data;
          console.log(this.sales);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submitForm() {
      const data = {
        customer_id: this.selectedCustomer,
        item: this.selectedItems,
      };

      axios
        .post("http://localhost:3002/sales", data)
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
          this.$router.push({ name: "sales" });
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.message);
        });
    },
    addItem() {
      this.item.push({ item_id: "", qty: 1 });
      this.selectedItems.push({ item_id: "", qty: 1 });
    },
    removeItem(index) {
      this.item.splice(index, 1);
      this.selectedItems.splice(index, 1);
    },
    getMaxQty(item_id) {
      const selectedItem = this.itemOptions.find(
        (item) => item.item_id === item_id
      );
      return selectedItem ? selectedItem.stok : 0;
    },
    validateQty() {
      for (let i = 0; i < this.selectedItems.length; i++) {
        const selectedItemId = this.selectedItems[i].item_id;
        const selectedQty = this.selectedItems[i].qty;
        const maxQty = this.getMaxQty(selectedItemId);
        if (selectedQty > maxQty) {
          alert(`Stok untuk item "${selectedItemId}" tidak mencukupi.`);
          return false;
        }
      }
      return true;
    },
    submitForm() {
      if (!this.validateQty()) {
        return;
      }
      const data = {
        customer_id: this.selectedCustomer,
        items: this.selectedItems,
      };
      console.log(data.items)
      axios
        .post("http://localhost:3002/sales", data)
        .then((response) => {
          console.log(response.data);
          alert(response.data.message);
          this.fetchData();
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to add sales");
        });
    },
    deleteSales(id) {
      if (confirm("Are you sure you want to delete this sales?")) {
        axios
          .delete(`http://localhost:3002/sales/${id}`)
          .then((response) => {
            this.fetchData();
            alert(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID");
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
  
  <style>
</style>
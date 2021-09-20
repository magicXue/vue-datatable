<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="product"
      sort-by="name"
      class="elevation-1"
      show-expand
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>My Fruit</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Fruit
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text v-show="mainData">
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.genus"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.family"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.order"
                        label="Carbs (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-text v-show="subData">
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nutritions.carbohydrates"
                        label="Carbohydrates"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nutritions.protein"
                        label="Protein"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nutritions.fat"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nutritions.calories"
                        label="Calories (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nutritions.sugar"
                        label="Sugar (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.nutritions="{ item }">
        <v-btn color="blue darken-1" @click="editItem(item, 'subData')">Edit</v-btn>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" style="padding:0px;">
          <v-simple-table
            hide-default-footer
            style="border-radius:0"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th v-for="(value,index) in item.nutritions" :key="value">{{index}}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="value in item.nutritions" :key="value">{{value}}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </td>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item, 'mainData')"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-snackbar
        v-model="snackbar"
        :timeout="2000"
        :color="snackcolor"
      >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
</template>
<script>
import axios from 'axios'
  export default {
    name: 'Home',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      mainData: true,
      subData: true,
      snackbar:false,
      loading:true,
      snackcolor:'info',
      text: '',
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Family', value: 'family' },
        { text: 'Order', value: 'order' },
        { text: 'Genus', value: 'genus' },
        { text: 'Nutritions', value: 'nutritions' },
        { text: 'More', value: 'data-table-expand' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      product: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        genus: '',
        family: '',
        order: '',
        nutritions:{}
      },
      defaultItem: {
        name: '',
        genus: '',
        family: '',
        order: '',
        nutritions:{}
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Fruit' : 'Edit Fruit'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.getAllProduct()
      },
      getAllProduct() {
        axios
          .get('/api/fruit/all')
          .then(response => {
            this.product = response.data
            this.loading = false
          })
      },
      editItem (item, type) {
        if(type == 'subData'){
          this.mainData = false;
        }else if(type == 'mainData'){
          this.subData = false;
        }
        this.editedItem = Object.assign({}, item)
        this.editedIndex = this.product.indexOf(item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.product.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.product.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.subData = true;
        this.mainData = true;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.product[this.editedIndex], this.editedItem)
          this.text = `Save ${this.editedItem['name']} data`
          this.snackcolor = 'info'
        } else {
          await axios
            .put('/api/fruit', this.editedItem)
            .then(response => {
              this.product.push(this.editedItem)
              this.text = response.data.success
              this.snackcolor = 'success'
            })
            .catch(error => {
              console.log('error',error);
              this.text = error.response.data.error
              this.snackcolor = 'error'
            })
        }
        this.snackbar = true
        this.close()
      },
    },
  }
</script>

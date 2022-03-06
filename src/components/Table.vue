<template>
<div >
  <v-app >
    <v-data-table
      :headers="headers"
      :items="listData"
      class="elevation-1"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>{{titleObject}}</v-toolbar-title>
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
                {{action.add}}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <!-- <v-container> -->
                  <div v-for="item in editedItem" :key="item.key">
                      <v-text-field
                        v-model="item.value"
                        :label="item.text"
                        :rules="rules.name"
                      ></v-text-field>
                  </div>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Hủy
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Lưu
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Bạn có chắc chắn muốn xóa {{object}} ?</v-card-title>
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
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
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
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
  </v-app>
</div>
</template>

<script>


export default {
  name: 'Table',
  components: { 

  },
    props:{
        object: {
            type: String,
            default: ''
        },
        titleObject: {
            type: String,
            default: ''
        },
        action: {
            type: Object,
            default(){
                return {
                    add: '',
                    edit: '',
                    delete: ''
                }
            }
        },
        headers: {
            type: Array,
            default(){
                return [
                    {
                        text: 'Mã khách hàng',
                        align: 'start',
                        sortable: true,
                        value: 'name',
                    },
                    { text: 'Tên khách hàng', value: 'calories' },
                    { text: 'Số điện thoại', value: 'fat' },
                    { text: 'Địa chỉ', value: 'carbs' },
                    { text: 'Email', value: 'protein' },
                    { text: 'Hành động', value: 'actions', sortable: false },
                ]
            }
        },
        listData: {
          type: Array,
          default(){
            return [];
          }
        },
        defaultItem: {
          type: Array,
          default(){
            return []
          }
        },
    },
  data() {
    return {
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    editedItem: [],
    editedIndex: -1,
    rules: {
        name: [val => (val).length > 0 || 'Vui lòng nhập đủ thông tin!'],
      },
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? this.action.add : this.action.edit
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
      this.defaultItem.map(index => {
          this.editedItem.push({
            key: index.key,
            value:index.value,
            text: index.text
          }) 
      })
  },

  methods: {

    editItem (item) {
      this.editedItem = []

      this.editedIndex = this.listData.indexOf(item);

        for(let key in item){
            let text = '';
            this.defaultItem.map(index => {
              if(index.key == key){
                text = index.text
              }
            })
            if(text != ''){
              this.editedItem.push({
                key: key,
                value:item[key],
                text: text
              })              
            }

        }
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.listData.indexOf(item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$emit('delete-item', this.editedIndex )
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.editedItem = []
      this.defaultItem.map(index => {
          this.editedItem.push({
            key: index.key,
            value:index.value,
            text: index.text
          }) 
      })
      this.editedIndex = -1
    },

    closeDelete () {
      this.dialogDelete = false
    },

    save () {
      if (this.editedIndex > -1) {
        this.$emit('update-item', {index: this.editedIndex, item: this.editedItem})
      } else {
        this.$emit('add-item', this.editedItem)
      }
      this.close()
    },
  }
}
</script>

<style>

</style>

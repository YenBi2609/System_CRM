<template>
<div >
  <v-app >
    <v-snackbar
        top
        light
        v-model="notify"
        color="#f58634"
        :timeout="2000"
    >
        {{ message }}
    </v-snackbar>
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
                color="#f58634"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                {{action.add}}
              </v-btn>
            </template>
            <v-card v-if="dialog">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <!-- <v-container> -->
                  <div v-for="item in editedItem" :key="item.key">
                      <v-text-field
                        v-if="!item.type"
                        v-model="item.value"
                        :label="item.text"
                        :rules="[rules.required]"
                      ></v-text-field>
                      <v-autocomplete
                        v-if="item.type=='autocomplete'"
                        v-model="item.value"
                        :items="item.listValue"
                        dense
                        chips
                        small-chips
                        :label="item.text"
                        item-text="title"
                        item-value="id"
                        :rules="[rules.required]"
                      ></v-autocomplete>
                      <v-text-field
                        v-if="item.type=='number'"
                        v-model="item.value"
                        :label="item.text"
                        :rules="[rules.required]"
                        type="number"
                      ></v-text-field>
                      <v-text-field
                        v-if="item.type=='date'"
                        v-model="item.value"
                        :label="item.text"
                        :rules="[rules.required]"
                        type="date"
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
      circle
        v-model="page"
        :length="pageCount"
        color="#f58634"
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
          required: value => !!value || 'Vui lòng nhập đủ thông tin!',
      },
      listValue: [],
      notify: false,
      message: '',
      isShowDialogDate: false,
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? this.action.add : this.action.edit
    },
  },
 watch: {
    // dialog (val) {
    //   val || this.close()
    // },
    // dialogDelete (val) {
    //   val || this.closeDelete()
    // },
  },

  created () {
      this.defaultItem.map(index => {
        let data = {
            key: index.key,
            value:index.value,
            text: index.text
        }
        if(index.type){
          data.type =  index.type
        }
        if(index.type == 'autocomplete'){
          data.listValue = index.listValue
        }
        this.editedItem.push(data) 
      })
  },

  methods: {

    editItem (item) {
      this.editedItem = []

      this.editedIndex = this.listData.indexOf(item);

        for(let key in item){
            let obj = {
                key: key,
                value:item[key],
                text: ''
            }
            this.defaultItem.map(index => {
              if(index.key == key){
                obj.text = index.text
                if(index.type){
                  obj['type'] =  index.type
                }
                if(index.type == 'autocomplete'){
                  obj['listValue'] = index.listValue
                }
              }
            })
            if(obj.text != ''){
              this.editedItem.push(obj)              
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
        let data = {
            key: index.key,
            value:index.value,
            text: index.text
        }
        if(index.type){
          data.type =  index.type
        }
        if(index.type == 'autocomplete'){
          data.listValue = index.listValue
        }
        this.editedItem.push(data) 
      })
      this.editedIndex = -1
    },

    closeDelete () {
      this.dialogDelete = false
    },

    save () {
      let checkEmpty = true;
      this.editedItem.map(item =>{
        if(item.value == ''){
          checkEmpty = false
        }
      })
      if(checkEmpty){
        let checkValid = true;
        this.editedItem.map(item =>{
          if(item.key == 'email'){
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            checkValid = pattern.test(item.value)
          }
        })
        if(checkValid){
          if (this.editedIndex > -1) {
            this.$emit('update-item', {index: this.editedIndex, item: this.editedItem})
          } else {
            this.$emit('add-item', this.editedItem)
          }
          this.close()         
        }else {
          this.notify = true
          this.message = "Email không hợp lệ, vui lòng kiểm tra lại!"
        }
      }else {
        this.notify = true
        this.message = "Vui lòng nhập đủ thông tin!"
      }

    },
  }
}
</script>

<style>

</style>

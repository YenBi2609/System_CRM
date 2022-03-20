<template>
    <div >
    <v-snackbar
        top
        light
        v-model="notify"
        color="#f58634"
        :timeout="2000"
    >
        {{ message }}
    </v-snackbar>
        <Table
        :object="object"
        :titleObject="titleObject"
        :action="action"
        :headers="headers"
        :listData="listData"
        :defaultItem="defaultItem"
        @add-item="addItem"
        @update-item="updateItem"
        @delete-item="deleteItem"
        />
    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import { userApi } from '@/api/user';

export default {
    name: 'User',
    components: { 
        Table
    },
    props:{

    },
    data() {
        return {
            object: 'Nhân viên',
            titleObject: 'Danh sách nhân viên',
            action: {
                add: 'Tạo mới nhân viên',
                edit: 'Thông tin nhân viên',
                delete: 'Xóa nhân viên'
            },
            headers: [
                {
                    text: 'Mã nhân viên',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Tên nhân viên', value: 'name' },
                { text: 'Số điện thoại', value: 'phoneNumber' },
                { text: 'Địa chỉ', value: 'address' },
                { text: 'Tên đăng nhập', value: 'email' },
                { text: 'Mật khẩu', value: 'password' },
                { text: 'Vai trò', value: 'role' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ],
            defaultItem: [
                { text: 'Tên nhân viên',value: '', key: 'name' },
                { text: 'Số điện thoại',value: '', key: 'phoneNumber',type:'number' },
                { text: 'Địa chỉ',value: '', key: 'address' },
                { text: 'Tên đăng nhập ( email )',value: '', key: 'email' },
                { text: 'Mật khẩu',value: '', key: 'password' },
                { text: 'Vai trò',value: '', key: 'role' ,type:'number'},
            ],
            notify: false,
            message: ''
        }
    },
    computed: {
      listData(){
          return this.$store.state.allUser;
      }
    },
    watch: {

    },

    created () {
    },

    methods: {
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })
            try{
                await userApi.addUsers(object);
                object['id'] = this.listData[this.listData.length - 1].id + 1;
                this.listData.push(object)
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }
        },
        async updateItem(data){
            let object  = {}
            data.item.map(index=>{
                object[index.key] = index.value
            })
            Object.assign(this.listData[data.index], object)
            try{
                await userApi.updateUsers(this.listData[data.index].id, object);
                this.$store.commit('handleGetUser', this.listData);
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }            
        },
        async deleteItem(index){

            try{
                await userApi.deleteUsers(this.listData[index].id);
                this.listData.splice(index, 1)
                this.$store.commit('handleGetUser', this.listData);
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }
        }
    }
}
</script>

<style>

</style>

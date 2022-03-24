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
        @send-mail="sendMail"
        />
    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import { campainApi } from '@/api/campain';

export default {
    name: 'EmailMarketing',
    components: { 
        Table
    },
    props:{
        keySearch: { 
            type: String, 
            default: "" 
        },
    },
    data() {
        return {
            object: 'Chiến dịch Email',
            titleObject: 'Danh sách chiến dịch',
            action: {
                add: 'Tạo chiến dịch',
                edit: 'Thông tin chiến dịch',
                delete: 'Xóa chiến dịch'
            },
            headers: [
                {
                    text: 'Mã chiến dịch',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Tên chiến dịch', value: 'name' },
                { text: 'Mã người tạo', value: 'idUser' },
                { text: 'Tên người tạo', value: 'userName' },
                { text: 'Số email đã gửi', value: 'totalEmailSent' },
                { text: 'Ngày tạo', value: 'created_at' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ],
            defaultItem: [
                { text: 'Tên chiến dịch', value: '',key: 'name' },
                { text: 'Nội dung', value: '', key: 'content', type: 'textarea' },
            ],
            notify: false,
            message: '',
            listCampains: [],
        }
    },
    computed: {
        listData(){
            if (this.keySearch) {
                let s = this.keySearch.toLowerCase();
                return this.listCampains.filter((item) => {
                    return JSON.stringify(item).toLowerCase().includes(s);
                });
            } else {
                return this.listCampains;
            }
        },
    },
    watch: {

    },

    created () {
        this.getCampain();
    },

    methods: {
        async getCampain(){
            let res = await campainApi.getCampains();
            res.response.map((item) => {
                item.created_at = item.created_at.slice(0, 10)
            });
            this.listCampains = res.response;
        },
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })
            object['idUser'] = this.$store.state.currentUser.id;

            try{
                let res = await campainApi.addCampains(object);
                object['id'] = res.data.data.id;

                let allUser = this.$store.state.allUser;
                allUser.map(user=>{
                    if(user.id == object.idUser){
                        object['userName'] = user.name
                    }
                })
                object['created_at'] = new Date().toJSON().slice(0,10);

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
            object['idUser'] = this.$store.state.currentUser.id;
            try{
                await campainApi.updateCampains(this.listData[data.index].id, object);
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }            
        },
        async deleteItem(index){

            try{
                await campainApi.deleteCampains(this.listData[index].id);
                this.listData.splice(index, 1)
            }
            catch(err){
                console.log(err)
                this.notify = true
                this.message = "Có lỗi xảy ra, vui lòng xem lại thông tin!"
            }
        },
        async sendMail(item){
            try{
                await campainApi.sendMail(item.id);
                this.notify = true
                this.message = "Gửi email thành công!"
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

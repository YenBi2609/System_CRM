<template>
    <div >
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
import { taskApi } from '@/api/task';

export default {
    name: 'Task',
    components: { 
        Table
    },
    props:{

    },
    data() {
        return {
            object: 'Công việc',
            titleObject: 'Danh sách công việc',
            action: {
                add: 'Tạo công việc mới',
                edit: 'Thông tin công việc',
                delete: 'Xóa công việc'
            },
            headers: [
                {
                    text: 'Mã công việc',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                { text: 'Tên công việc', value: 'name' },
                { text: 'Trạng thái', value: 'status' },
                { text: 'Mức độ ưu tiên', value: 'priority' },
                { text: 'Người thực thi', value: 'user' },
                { text: 'Thời gian', value: 'duration' },
                { text: 'Ngày đến hạn', value: 'date' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ],
            listData: [],
            defaultItem: [
                { text: 'Tên công việc', value: '',key: 'name' },
                { text: 'Trạng thái', value: '',key: 'status' },
                { text: 'Mức độ ưu tiên', value: '',key: 'priority' },
                { text: 'Người thực thi', value: '',key: 'user' },
                { text: 'Thời gian', value: '',key: 'duration' },
                { text: 'Ngày đến hạn', value: '',key: 'date' },
            ],
        }
    },
    computed: {

    },
    watch: {

    },

    created () {
        this.getTask();
    },

    methods: {
        async getTask(){
            let res = await taskApi.getTasks();
            this.listData = res.response;
        },
        async addItem(item){
            let object  = {}
            item.map(index=>{
                object[index.key] = index.value
            })
            this.listData.push(object)
            try{
                await taskApi.addTasks(object);
            }
            catch(err){
                console.log(err)
            }
        },
        async updateItem(data){
            let object  = {}
            data.item.map(index=>{
                object[index.key] = index.value
            })
            Object.assign(this.listData[data.index], object)
            try{
                await taskApi.updateTasks(this.listData[data.index].id, object);
            }
            catch(err){
                console.log(err)
            }            
        },
        async deleteItem(index){

            try{
                await taskApi.deleteTasks(this.listData[index].id);
                this.listData.splice(index, 1)
            }
            catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>

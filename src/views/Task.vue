<template>
    <div >
        <Table
        :object="object"
        :titleObject="titleObject"
        :action="action"
        :headers="headers" 
        />
    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import { taskApi } from '@/api/task';

export default {
    name: 'Client',
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
                    value: 'name',
                },
                { text: 'Tên công việc', value: 'calories' },
                { text: 'Trạng thái', value: 'fat' },
                { text: 'Người thực thi', value: 'carbs' },
                { text: 'Thời gian', value: 'protein' },
                { text: 'Ngày đến hạn', value: 'protein' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ]


        }
    },
    computed: {

    },
    watch: {

    },

    async created () {
        let res = await taskApi.getTasks();
        console.log(res);
    },

    methods: {
    }
}
</script>

<style>

</style>

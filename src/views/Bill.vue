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

export default {
    name: 'Client',
    components: { 
        Table
    },
    props:{

    },
    data() {
        return {
            object: 'Cuộc gọi',
            titleObject: 'Danh sách hóa đơn',
            action: {
                add: 'Tạo mới cuộc gọi',
                edit: 'Thông tin cuộc gọi',
                delete: 'Xóa cuộc gọi'
            },
            headers: [
                {
                    text: 'Mã cuộc gọi',
                    align: 'start',
                    sortable: true,
                    value: 'name',
                },
                { text: 'Số điện thoại', value: 'calories' },
                { text: 'Mã khách hàng', value: 'fat' },
                { text: 'Tên khách hàng', value: 'carbs' },
                { text: 'Thời gian', value: 'protein' },
                { text: 'Nhân viên gọi điện', value: 'protein' },
                { text: 'Hành động', value: 'actions', sortable: false },                
            ]


        }
    },
    computed: {

    },
    watch: {

    },

    created () {

    },

    methods: {
    }
}
</script>

<style>

</style>

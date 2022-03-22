import { coreApi } from './api.js'

export const orderDetailApi = {
    getOrderDetails() {
        return coreApi.get('orderDetails')
    },
    addOrderDetails(data) {
        return coreApi.post('create/orderDetails',data)
    },
    getOrders(id, data) {
        return coreApi.get('show-orderDetail/'+ id,data)
    },
    updateOrderDetails(id, data) {
        return coreApi.put('update-orderDetail/'+ id,data)
    },
    deleteOrderDetails(id) {
        return coreApi.del('delete-orderDetail/'+ id)
    }, 
}
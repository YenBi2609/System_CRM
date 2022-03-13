import { coreApi } from './api.js'

export const orderApi = {
    getOrders() {
        return coreApi.get('orders')
    },
    addOrders(data) {
        return coreApi.post('create/orders',data)
    },
    updateOrders(id, data) {
        return coreApi.put('update-order/'+ id,data)
    },
    deleteOrders(id) {
        return coreApi.del('delete-order/'+ id)
    }, 
}
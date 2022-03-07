import { coreApi } from './api.js'

export const productApi = {
    getProducts() {
        return coreApi.get('products')
    },
    addProducts(data) {
        return coreApi.post('create/products',data)
    },
    updateProducts(id, data) {
        return coreApi.put('update-product/'+ id,data)
    },
    deleteProducts(id) {
        return coreApi.del('delete-product/'+ id)
    }, 
}
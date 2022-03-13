import { coreApi } from './api.js'

export const userApi = {
    getUsers() {
        return coreApi.get('users')
    },
    addUsers(data) {
        return coreApi.post('create/users', data)
    },
    updateUsers(id, data) {
        return coreApi.put('update-user/' + id, data)
    },
    deleteUsers(id) {
        return coreApi.del('delete-user/' + id)
    },
}
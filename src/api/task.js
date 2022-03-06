import { coreApi } from './api.js'

export const taskApi = {
    getTasks() {
        return coreApi.get('tasks')
    },
    addTasks(data) {
        return coreApi.post('create/tasks',data)
    },
    updateTasks(id, data) {
        return coreApi.put('update-task/'+ id,data)
    },
    deleteTasks(id) {
        return coreApi.del('delete-task/'+ id)
    }, 
}
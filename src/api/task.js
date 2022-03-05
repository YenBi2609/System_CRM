import { coreApi } from './api.js'

export const taskApi = {
    getTasks() {
        return coreApi.get('tasks')
    }, 
}
const handleAddTask = (state, params) =>{
    debugger

	Vue.set(state.listTask, params)
}

export {
    handleAddTask,
};
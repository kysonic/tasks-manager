
export function processTask(task) {
    if (!task) {
        return task;
    }
    task.status = task.status ? 10 : 0;
    return task;
}

export const ORDER_PRE_CONFIG_FETCH: number = 100;
export const ORDER_CONFIG_FETCH: number = 100;

export interface InitialTask {
    order: number,
    task: () => Promise<any>,
    name?: string
}

let initialTasks: InitialTask[] = []

export const registerInitialTask = (initialTask: InitialTask) => {
    console.debug(`registered for execution ${initialTask.name} with order (${initialTask.order})`)
    initialTasks.push(initialTask)
}

export const runInitialTasks = (): Promise<any> => {
    const orderedInitialTasks = initialTasks.sort((a, b) => a.order - b.order);
    let initPromis = Promise.resolve();
    for (const orderedInitialTask of orderedInitialTasks) {
        console.debug(`scheduled for execution ${orderedInitialTask.name} with order (${orderedInitialTask.order})`)
        initPromis = initPromis.then(() => orderedInitialTask.task())
    }
    initialTasks = []
    return initPromis
}

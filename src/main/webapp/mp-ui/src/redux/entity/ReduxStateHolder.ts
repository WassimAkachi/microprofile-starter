type ActionState = "Pending" | "Fulfilled" | "Error"

export interface ReduxStateHolder<T> {
  state?: T
  actionState: ActionState
  errorMessage?: string
}
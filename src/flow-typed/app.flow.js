export type TaskType = {
    id: number,
    username: string,
    email: string,
    text: string,
    status: number
}

export type UserValidationErrorType = {
    username: string,
    email: string,
    text: string
}

export type ErrorType = string | UserValidationErrorType

export type ResponseType = {
    status: string,
    message: TaskType | ErrorType
}

export type UserType = {
    email: string,
    profile: {
        firstName: string,
        lastName: string,
        age: number
    },
    isAdmin: boolean
}

export type GlobalsType = {
    loading: boolean,
    error: string,
    totalTasksCount: number,
    page: number,
    user: UserType,
    userError: string
}

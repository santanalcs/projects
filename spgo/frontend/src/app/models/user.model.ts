export interface User {
    name: string,
    email: string,
    password1: string,
    password2: string,
    success: any,
    error: any,
}

export interface AddUser {
    pageOrigin: boolean,
}
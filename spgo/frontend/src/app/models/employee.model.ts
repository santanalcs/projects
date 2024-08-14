export interface Employee{
    id?: number,
    name:string,
    cpf: string,
    cel_phone: string,
    success?: any,
    error?: any,
}

export interface AddEmployee {
    pageOrigin: boolean,
}

export interface EditEmployee{
    cpf: string,
    cel_phone: string,
}

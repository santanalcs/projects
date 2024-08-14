export interface Contractor {
    id?: number,
    name: string,
    type_person: string,
    cpf_cnpj: string,
    success?: any,
    error?: any,
}

export interface Contact {
    id?: number,
    id_contractor: any,
    name_contractor?: string,
    contact: string,
    cel_phone: string,
    email: string,
    success?: any,
    error?: any,
}

export interface Address {
    id?: number,
    id_contractor: any,
    name_contractor?: string,
    address: string,
    district: string,
    zip_code: string,
    city: string,
    uf: string,
    success?: any,
    error?: any,
}

export interface AddContractor {
    pageOrigin: boolean,
}
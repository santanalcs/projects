export interface Construction {
    id?: number,
    pattern_type: string,
    owner: string,
    owner_cpf: string,
    liable_engineer: string,
    engineer_registration: string,
    success?: any,
    error?: any,
}

export interface Address {
    id?: number,
    id_construction: any,
    name_construction?: string,
    address: string,
    district: string,
    zip_code: string,
    city: string,
    uf: string,
    success?: any,
    error?: any,
}
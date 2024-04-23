export interface Measure {
    id?: number,
    symbol: string,
    description: string,
    id_group_criterion: any,
    success: any,
    error: any,
}

export interface AddMeasure {
    pageOrigin: boolean,
}
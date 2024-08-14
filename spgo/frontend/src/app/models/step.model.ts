export interface Step {
    id?: number,
    step: string,
    success?: any,
    error?: any,
}

export interface AddStep {
    pageOrigin: boolean,
}
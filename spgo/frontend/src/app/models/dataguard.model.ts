export interface DataAuthGuard {
    id: number,
    name: string,
    email: string,
    token: string,
    allowable_level: any
}
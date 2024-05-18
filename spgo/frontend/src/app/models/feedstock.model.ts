export interface Feedstock {
    id?: number,
    description: string,
    rating: string,
    measure_unit?: string,
    id_measure_unit: any,
    success: any,
    error: any,
}

export interface AddFeedstock {
    pageOrigin: boolean,
}

export interface MeasureEdition {
    idMeasure: number,
    descriptionMeasure: string,
}

export interface RatingEdition {
    rating: string;
}
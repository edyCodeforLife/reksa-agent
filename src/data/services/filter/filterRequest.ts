export interface FilterRequest {
    filter: FilterOperator[];
    orFilter: FilterOperator[];
    sort: SortOperator[];
    take: number;
    skip: number;
}

export interface FilterOperator {
    operator: string;
    field: string;
    value: string;
    type: number;
}

export interface SortOperator {
    field: string;
    dir: string;
}
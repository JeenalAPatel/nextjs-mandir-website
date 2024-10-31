export interface ISlotSearchParams {
    slot?: string;
    startDate?: string;
    endDate?: string;
    region?: string;
    mandal?: string;
    wing?: string;
    page?: string;
    rowsPerPage?: string;
}

export const DefaultRowsPerPage = 10;
export const DefaultPage = 1;
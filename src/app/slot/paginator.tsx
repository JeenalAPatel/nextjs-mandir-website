'use client';

import {Paginator} from "primereact/paginator";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export interface ISlotPaginator {
    totalRecords: number;
    page: number;
    rowsPerPage: number;
}

export function SlotPaginator(props: ISlotPaginator) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const indexOfFirstRowInPage = (props.page - 1) * props.rowsPerPage;
    return (
        <Paginator first={indexOfFirstRowInPage} rows={props.rowsPerPage} totalRecords={props.totalRecords}
                   rowsPerPageOptions={[2, 10, 20, 30]} onPageChange={(e) => {
            const { rows, page } = e;

            const params = new URLSearchParams(searchParams);
            params.set("page", (page + 1).toString());
            params.set("rowsPerPage", rows.toString());
            replace(`${pathname}?${params.toString()}`)
        }}/>
    )

}
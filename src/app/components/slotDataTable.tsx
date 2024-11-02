import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {db} from '@/db';
import {slots} from "@/db/schema";
import {and, count, eq, gte, ilike, lte} from "drizzle-orm";
import {DefaultPage, DefaultRowsPerPage, ISlotSearchParams} from "@/models/slots";
import {SlotPaginator} from "@/app/slot/paginator";


export async function SlotDataTable(props: {
    filter?: ISlotSearchParams
}) {
    const page = Number(props.filter?.page || `${DefaultPage}`);
    const rowsPerPage = Number(props.filter?.rowsPerPage || `${DefaultRowsPerPage}`);

    let slotCountSQL = db.select({count: count()}).from(slots).$dynamic();
    let slotDataSQL = db.select().from(slots).$dynamic();

    if (props.filter) {
        const whereClause = [];
        if (props.filter.slot) {
            whereClause.push(ilike(slots.slotName, `%${props.filter.slot}%`));
        }
        if (props.filter.startDate) {
            whereClause.push(gte(slots.startDate, props.filter.startDate));
        }
        if (props.filter.endDate) {
            whereClause.push(lte(slots.endDate, props.filter.endDate));
        }
        if (props.filter.region) {
            whereClause.push(eq(slots.region, props.filter.region));
        }
        if (props.filter.mandal) {
            whereClause.push(eq(slots.mandal, props.filter.mandal));
        }
        if (props.filter.wing) {
            whereClause.push(eq(slots.wing, props.filter.wing));
        }
        slotDataSQL = slotDataSQL.where(and(...whereClause));
        slotCountSQL = slotCountSQL.where(and(...whereClause));
        slotDataSQL = slotDataSQL.limit(rowsPerPage).offset((page - 1) * rowsPerPage);
    }

    const slotCountResult = await slotCountSQL.execute();
    let data = await slotDataSQL.execute();

    const slot = data.map((slot) => ({
        ...slot,
        startDate: (slot.startDate as unknown as Date).toLocaleDateString(),
        endDate: (slot.endDate as unknown as Date).toLocaleDateString()
    }));

    return (
        <>
            <div>
                <DataTable value={slot} tableStyle={{minWidth: '50rem'}}>
                    <Column field="slotName" header="Slot Name"/>
                    <Column field="region" header="Region"/>
                    <Column field="wing" header="Wing"/>
                    <Column field="mandal" header="Mandal"/>
                    <Column field="capacity" header="Capacity"/>
                    <Column field="slotType" header="Slot Type"/>
                    <Column field="startDate" header="Start Date"/>
                    <Column field="endDate" header="End Date"/>
                    <Column field="notes" header="Notes"/>
                    <Column field="active" header="Active"/>
                </DataTable>
            </div>

            <SlotPaginator page={page} rowsPerPage={rowsPerPage} totalRecords={slotCountResult[0].count}/>
        </>
    );
}
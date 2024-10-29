import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {db} from '@/db';
import {slots} from "@/db/schema";
import {and, eq, gte, ilike, lte} from "drizzle-orm";
import {ISlotSearchParams} from "@/models/slots";

interface ISlotDataTableProps {
    filter?: ISlotSearchParams
}

export async function SlotDataTable(props: ISlotDataTableProps) {
    let query = db.select().from(slots).$dynamic();

    if (props.filter) {
        const {slot, startDate, endDate, region, mandal, wing} = props.filter;
        const whereClauses = [];

        if (slot) {
            whereClauses.push(ilike(slots.slotName, `%${slot}%`));
        }
        if (startDate) {
            whereClauses.push(gte(slots.startDate, startDate));
        }
        if (endDate) {
            whereClauses.push(lte(slots.endDate, endDate));
        }
        if (region) {
            whereClauses.push(eq(slots.region, region));
        }
        if (mandal) {
            whereClauses.push(eq(slots.mandal, mandal));
        }
        if (wing) {
            whereClauses.push(eq(slots.wing, wing));
        }

        query = query.where(and(...whereClauses));
    }

    let data = await query.execute();

    data = data.map((slot) => ({
        ...slot,
        startDate: (slot.startDate as unknown as Date).toLocaleDateString(),
        endDate: (slot.endDate as unknown as Date).toLocaleDateString()
    }));


    return (
       <div>
            <DataTable value={data} tableStyle={{minWidth: '50rem'}}>
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
    );
}
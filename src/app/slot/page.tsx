import {SlotForm} from "@/app/slot/form";
import {SlotDataTable} from "@/app/components/slotDataTable";
import {ISlotSearchParams} from "@/models/slots";


export default async function Page(props: {
    searchParams?: Promise<ISlotSearchParams>
}) {
const searchParams = await props.searchParams;
    return (
        <>
            <SlotForm/>
            <SlotDataTable filter={searchParams}/>
        </>
    );
}
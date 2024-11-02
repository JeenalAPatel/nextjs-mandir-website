import {Controller, useForm} from "react-hook-form";
import {Dropdown} from "primereact/dropdown";
import {mandals, regions, wing} from "@/app/components/variables";
import {useEffect} from "react";
import {ISlotSearchParams} from "@/models/slots";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export function SlotFilterOptions() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const defaultValues = {
        slot:searchParams.get("slot") || "",
        startDate: searchParams.get("startDate") || "",
        endDate: searchParams.get("endDate") || "",
        region: searchParams.get("region") || "",
        mandal: searchParams.get("mandal") || "",
        wing: searchParams.get("wing") || "",
    }
    const {control, resetField, handleSubmit, watch, register} = useForm<ISlotSearchParams>({
         defaultValues: defaultValues,
    })

    const startDate = watch("startDate");
    const endDate = watch("endDate");


    useEffect(() => {
            if (startDate) {
                if (endDate && startDate > endDate) {
                    resetField("endDate");
                }
            }
        }
        ,
        [startDate, endDate, resetField]
    );

    const onSubmit = (data: ISlotSearchParams) => {
        const params = new URLSearchParams(searchParams);

        for (const key in data) {
            const value = data[key as keyof ISlotSearchParams];

            if (!!value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        }


        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between mb-5 mx-2">
                        <div>
                            <label htmlFor="slot" className="inline-block mb-3">Search Slot</label>
                            <input type="text" id="slot" className="block rounded h-12 w-72" {...register("slot")} />
                        </div>
                        <div>
                            <label htmlFor="startDate" className="inline-block mb-3">Start Date</label>
                            <input type="date" className="block rounded h-12 "
                                   id="startDate" {...register("startDate")}/>
                        </div>
                        <div>
                            <label htmlFor="endDate" className="inline-block mb-3">End Date</label>
                            <input type="date" className="block rounded h-12" id="endDate"
                                   {...register("endDate")}/>
                        </div>

                        <div>
                            <label htmlFor="region" className="mb-3 inline-block">Region</label>
                            <Controller control={control} render={({field}) => (
                                <Dropdown options={regions} {...field} optionLabel="name"
                                          placeholder="Select" className="w-full md:w-14rem" showClear={true}/>)}
                                        name="region"/>

                        </div>
                        <div>
                            <label htmlFor="mandal" className="mb-3 inline-block">Mandal</label>
                            <Controller control={control} render={({field}) => (
                                <Dropdown options={mandals}  {...field} optionLabel="name"
                                          placeholder="Select" className="w-full md:w-14rem" showClear={true}/>)}
                                        name="mandal"/>

                        </div>
                        <div>
                            <label htmlFor="wing" className="mb-3 inline-block">Wing</label>
                            <Controller control={control} render={({field}) => (
                                <Dropdown options={wing} {...field} optionLabel="name" name={"searchWing"}
                                          placeholder="Select" className="w-full md:w-14rem" showClear={true}/>)}
                                        name="wing"/>

                        </div>
                        <button type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}


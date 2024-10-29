'use client';
import {useEffect, useState} from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {Controller, useForm} from "react-hook-form";
import {CreateSlot} from "@/db/schema";
import {insertSlotData} from "@/app/lib/action";
import {SlotDataInput} from "@/app/components/slotDataInput";
import {SlotDataMultiselect} from "@/app/components/slotDataMultiselect";
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {mandals, regions, slotType, wing} from "@/app/components/variables";
import {SlotFilterOptions} from "@/app/components/slotFilterOptions";


export function SlotForm() {
    const [isFormVisible, setFormVisible] = useState(false);
    const {register, watch, resetField, control, handleSubmit} = useForm({
        defaultValues: {
            slotName: "",
            region: "",
            wing: "",
            mandal: "",
            capacity: "",
            slotType: "",
            startDate: "",
            endDate: "",
            notes: "",
            active: true
        }
    });
    const [ischecked, setChecked] = useState(false);
    const toggleForm = () => {
        if (!isFormVisible) return;
        setFormVisible(false);
    }


    const startDate = watch("startDate");
    const endDate = watch("endDate");

    // Get the current date in 'YYYY-MM-DD' format
    function getCurrentDate() {
        const today = new Date();
        return today.toISOString().split("T")[0];
    }

    useEffect(() => {
        if (startDate) {
            if (endDate && startDate > endDate) {
                resetField("endDate");
            }
        }
    }, [startDate, endDate, resetField]);
    const onSubmit = async (data: CreateSlot) => {
        await insertSlotData(data);
    }
    return (
        <>
            <div className="flex justify-end">

                <Button label="+Slot" onClick={() => setFormVisible(true)}
                        className=" border-slate-400 p-2 space-x-2 text-xl bg-[#7a6855] text-[#fff] rounded-xl"/>

            </div>
            <SlotFilterOptions/>
            <Dialog visible={isFormVisible} style={{width: '50vw'}} onHide={() => toggleForm()} content={() => (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8">
                    <div>
                        <h1 className="flex justify-between font-bold text-xl">Add Slot
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <SlotDataInput control={control} htmlFor={"name"} name={"slotName"} label={"Name"}
                                       type={"text"}
                                       placeholder={"Name"}/>

                        <SlotDataMultiselect htmlFor={"region"} label={"Region"} control={control} name={"region"}
                                             options={regions} placeholder={"Select Region"}/>

                        <SlotDataMultiselect htmlFor={"wing"} label={"Wing"} control={control} name={"wing"}
                                             options={wing} placeholder={"Select Wing"}/>

                        <SlotDataMultiselect htmlFor={"mandal"} label={"Mandal"} control={control} name={"mandal"}
                                             options={mandals} placeholder={"Select Mandal"}/>
                        <SlotDataInput control={control} htmlFor={"capacity"} label={"Capacity"} name={"capacity"}
                                       type={"text"} placeholder={"Required Volunteer"}/>

                        <SlotDataMultiselect htmlFor={"slot type"} label={"Slot Type"} control={control}
                                             name={"slotType"} options={slotType} placeholder={"Select Slot Type"}/>
                        <SlotDataInput control={control} htmlFor={"start date"}
                                       name="startDate"
                                       label={"Start Date"}
                                       type={"date"} placeholder={"MM/DD/YYYY"}
                                       className={"text-gray-400"}
                                       min={getCurrentDate()}/>

                        <SlotDataInput control={control} htmlFor={"end date"} label={"End Date"}
                                       name="endDate"
                                       type={"date"} placeholder={"MM/DD/YYYY"}
                                       className={"text-gray-400"}
                                       min={startDate || getCurrentDate()}/>
                        <div className="col-start-1 col-end-3">
                            <label htmlFor="note" className="flex justify-between">Notes<span
                                className="text-gray-400">0/1000</span></label>
                            <Controller name="notes" control={control}
                                        render={({field}) => (
                                            <textarea {...field} name="note" placeholder="Note" rows={4}
                                                      className="w-full border border-2 p-2 rounded border-slate-400 p-2"/>)}/>
                        </div>
                        <div>

                            <input type="checkbox" name="active" className="mr-1" checked={ischecked}
                                   onChange={(e) => setChecked(e.target.checked)}/>
                            <label htmlFor="active">Active</label>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button type="button"
                                    className=" mt-2 p-1 border border-2 mr-4 rounded-xl border-slate-400   text-[#7a6855]"
                                    onClick={() => toggleForm()}>Cancel
                            </button>
                            <button type="submit"
                                    className=" mt-2 p-1 border border-2 rounded-xl border-slate-400 bg-[#7a6855] text-[#fff]"
                                    onClick={() => toggleForm()}>Save
                            </button>
                        </div>
                    </div>
                </form>
            )}>
            </Dialog>
        </>
    )
        ;
}



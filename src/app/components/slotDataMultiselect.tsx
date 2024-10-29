import {Controller} from "react-hook-form";
import {MultiSelect} from "primereact/multiselect";
interface iSlotDataMultiselectProps {
    htmlFor: string;
    label: string;
    control: any;
    name: string;
    options: any;
    placeholder: string;
}

export function SlotDataMultiselect(data: iSlotDataMultiselectProps) {
    return(
        <>
            <div>
                <label htmlFor={data.htmlFor} className="flex justify-start gap-1">{data.label}<span
                    className="text-red-600">*</span></label>
                <Controller name={data.name} render={({field}) => (
                    <MultiSelect
                        options={data.options} optionLabel="name"
                        placeholder={data.placeholder}
                        className="w-full h-10 border border-2 rounded border-slate-400"
                        {...field}
                    />
                )} control={data.control}/>
            </div>
        </>
    )
}
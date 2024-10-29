import {Controller} from "react-hook-form";

interface iSlotDataInputProps {
    control: any;
    htmlFor: string;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    className?: string;
    min?: string;
}

export function SlotDataInput(data: iSlotDataInputProps) {
    return (<>
        <div>
            <label htmlFor={data.htmlFor} className="flex justify-start gap-1">{data.label}<span
                className="text-red-600">*</span></label>
            <Controller name={data.name} control={data.control}
                        render={({field}) => <input {...field} type={data.type}
                                                    placeholder={data.placeholder} min={data.min}
                                                    className={`w-full h-10 border border-2 rounded border-slate-400 p-2 ? ${data.className}`}/>}/>


        </div>
    </>)
}
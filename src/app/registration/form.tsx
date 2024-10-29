import {insertUserData} from "@/app/lib/action";

export function RegistrationForm() {
    return (
        <div className="flex flex-col items-center">
            <form action={insertUserData}>

                <div className="pt-2">
                    <label htmlFor="firstname" className="block">FirstName</label>
                    <input type="text" name="firstname" id="firstname" placeholder="enter your firstname"
                           className="w-full border border-2 rounded border-slate-400"/>
                </div>
                <div className="pt-2">
                    <label htmlFor="lastname">LastName</label>
                    <input type="text" name="lastname" id="lastname" placeholder="enter your lastname"
                           className="w-full border border-2 rounded border-slate-400"/>
                </div>
                <div className="pt-2">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder="someone@example.com"
                           className="w-full border border-2 rounded border-slate-400"/>
                </div>
                <div className="pt-2">
                    <label htmlFor="cellphone">Cellphone</label>
                    <input type="text" name="cellphone" id="cellphone" placeholder="enter your cellphone"
                           className="w-full border border-2 rounded border-slate-400"/>
                </div>
                <div className="pt-2">
                    <label htmlFor="region">Region</label>
                    <select name="region" className="w-full border border-2 rounded border-slate-400">
                        <option value="">Select</option>
                        <option value="west">West</option>
                        <option value="southwest">Southwest</option>
                        <option value="northeast">Northeast</option>
                        <option value="midwest">Midwest</option>
                        <option value="canada">Canada</option>
                        <option value="southeast">Southeast</option>
                    </select>
                </div>
                <div className="pt-2">
                    <label htmlFor="center">Center</label>
                    <input type="text" name="center" className="w-full border border-2 rounded border-slate-400"/>
                </div>
                <div className="pt-2">
                    <label htmlFor="ageGroup">AgeGroup</label>
                    <select name="ageGroup" className="w-full border border-2 rounded border-slate-400">
                        <option value="">Select</option>
                        <option value="16-21">16-21</option>
                        <option value="22-25">22-25</option>
                        <option value="26-30">26-30</option>
                        <option value="31-35">31-35</option>
                    </select>

                </div>
                <div className="pt-2">
                    <label htmlFor="status">Status</label>
                    <select name="status" className="w-full border border-2 rounded border-slate-400">
                        <option value="">Select</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                    </select>

                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full mt-2 border border-2 rounded border-slate-400 bg-[#7a6855] text-[#fff]">Submit
                    </button>
                </div>



        </form>
        </div>
)
}
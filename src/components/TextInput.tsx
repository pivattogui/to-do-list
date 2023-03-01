import { Dispatch, SetStateAction } from "react"

function TextInput({title, value, setValue, hide = false, }:{title: string, value: string, setValue: Dispatch<SetStateAction<string>>, hide?: boolean}){
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {title}
            </label>
            <div className="mt-1">
                <input
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    type={hide ? "password" : "text"}
                />
            </div>
        </div>
    )
}

export default TextInput
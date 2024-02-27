import React from 'react';

export default function App({TodoUpdate, value, setValue}){

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return (
            <form onSubmit= {TodoUpdate} className="flex pt-3">
            <input type="text" name="value" 
            placeholder="해야 할 일을 입력하세요." value ={value} onChange = {onChange}
            className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
            />
            <input className="p-2 text-blue-400 border-2 border-blue-400 hover:text-white hover:bg-blue-200"
            type="submit" name="입력"/>

            </form>
    )
}
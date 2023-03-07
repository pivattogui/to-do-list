import React from 'react';

import { ButtonType, ButtonTheme } from '../types';

function Button({ theme = ButtonTheme.SOLID, icon, text, action }: ButtonType) {
    let buttonClassName = ""
    switch (theme) {
        case ButtonTheme.WHITE:
            buttonClassName = "border text-sm rounded-md shadow-sm bg-white text-slate-600 hover:bg-gray-100"
            break;
        case ButtonTheme.LIGHT_RED:
            buttonClassName = "rounded-md text-sm text-red-900 bg-red-200 hover:bg-red-300 min-w-[80px]"
            break;
        default:
            buttonClassName = "rounded-md text-xs text-white bg-gray-500 hover:bg-gray-600"
            break
    }

    return (
        <div
            className={`flex items-center py-2 px-4 justify-center cursor-pointer font-medium ${buttonClassName}`}
            onClick={() => action ? action() : {}}
        >
            {icon}
            {text ?
                <span className={`text-center text-sm ${icon ? 'ml-2' : ""}`}>
                    {text}
                </span>
                :
                <></>
            }
        </div>
    )
}

export default Button
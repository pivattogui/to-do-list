import React from 'react';
import Button from './Button';

function AddItemTabHeader({ name, buttonName, description, action }: { name: string, buttonName?: string, description: string, action?: () => void }) {
    return (
        <div className='flex mb-2 lg:flex-row flex-col items-center'>
            <div className="mr-4 mb-2">
                <label className="block text-lg font-medium">{name}</label>
                <span className="text-sm text-gray-400">{description}</span>
            </div>
            {action && buttonName &&
                <div className="lg:ml-auto">
                    <Button text={buttonName} action={action} />
                </div>
            }
        </div>
    )
}

export default AddItemTabHeader;

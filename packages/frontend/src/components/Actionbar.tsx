import { Bell } from 'feather-icons-react';

export function Actionbar() {
    return (
    <div className="hidden lg:block fixed z-50 w-fit h-16 max-w-lg  bg-white border border-gray-200 rounded-full bottom-4 right-4">
            <div className="grid h-full mx-auto">
                <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full group">
                    <Bell className={'text-gray-400 hover:text-blue-400'} />
                </button>
            </div>
        </div>


    )
}
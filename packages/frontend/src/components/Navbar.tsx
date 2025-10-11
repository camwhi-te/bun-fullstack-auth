import { useAuth } from "../contexts/AuthContext";
import { LogOut, User, Plus, List, Settings } from 'feather-icons-react';

export function Navbar() {
    const { logout } = useAuth();

    return (
        <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 group">
                    <Settings className={'text-gray-400 hover:text-blue-400'} />
                </button>
                <button data-tooltip-target="tooltip-wallet" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <List className={'text-gray-400 hover:text-blue-400'} />
                </button>
                <div className="flex items-center justify-center">
                    <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                        <Plus className={'text-gray-400 hover:text-blue-400'} />
                    </button>
                </div>
                <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <User className={'text-gray-400 hover:text-blue-400'} />
                </button>
                <button onClick={logout} data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 rounded-e-full group">
                    <LogOut className={'text-gray-400 hover:text-blue-400'} />
                </button>
            </div>
        </div>
    )
}

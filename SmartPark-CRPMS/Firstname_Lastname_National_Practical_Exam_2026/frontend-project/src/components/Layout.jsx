import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="ml-64 flex-1 p-8 overflow-y-auto h-screen w-full">
                <div className="max-w-7xl mx-auto animate-fadeIn">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

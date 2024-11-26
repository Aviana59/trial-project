import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-pink-600 text-white p-6">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link to="/" className="hover:text-gray-300">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/invite" className="hover:text-gray-300">
                            Invite Writers
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;

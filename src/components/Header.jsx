import React from 'react';

const Header = () => {
    return (
        <header className="bg-pink-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="text-sm">Welcome, Admin</div>
        </header>
    );
};

export default Header;

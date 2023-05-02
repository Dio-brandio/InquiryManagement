import React from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import Searchbar from "./Searchbar";
import AllScripts from "./AllScripts";
const Layout = ({ children }) => {
    return (
        <>
            <div className="min-height-300 bg-primary position-absolute w-100"></div>
            <Sidebar />
            <main className="main-content position-relative border-radius-lg ps">
                <div className="container-fluid py-4">
                    <Searchbar />
                {children}
                </div>
            </main>
            <AllScripts />
        </>
    );
};

export default Layout;

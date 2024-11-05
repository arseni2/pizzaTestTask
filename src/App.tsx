import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "@/pages/Main/Main";
import Edit from "@/pages/Edit/Edit";


export const App = () => {
    return (
        <Routes>
            <Route path="/" index element={<Main />} />
            <Route path="/:id" element={<Edit />} />
        </Routes>
    );
};


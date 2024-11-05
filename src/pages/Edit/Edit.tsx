import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getEmplById} from "@/redux/selector/EmplSelector";
import CreateUpdateEmplForm from "@/components/CreateUpdateEmplForm/CreateUpdateEmplForm";

const Edit = () => {
    let { id } = useParams();
    const empl = useSelector(getEmplById(+id))
    console.log(empl)
    return (
        <>
            <h2>Форма обновления</h2>
            <CreateUpdateEmplForm isUpdate {...empl} id={+id}/>
        </>
    );
};

export default Edit;
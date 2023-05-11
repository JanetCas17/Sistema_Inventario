import { useState, useEffect } from "react";

export const useForm = (initialState = {}, callback) => {

    const [dataForm, setDataForm] = useState(initialState);

    const handleOnChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        });
    }

    const onReset = () => {
        setDataForm(initialState);
    }

    return {
        ...dataForm, dataForm, handleOnChange, onReset
    };

}
import React, { useState, useEffect } from "react";
import "./Edit.scss";

const Edit = ({ seminar, onSave, onClose }) => {
    const [updatedSeminar, setUpdatedSeminar] = useState(seminar);

    useEffect(() => {
        setUpdatedSeminar(seminar);
    }, [seminar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSeminar((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(updatedSeminar);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Редактировать</h2>
                <label>
                    Название:
                    <input
                        type="text"
                        name="title"
                        value={updatedSeminar.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Описание:
                    <input
                        type="text"
                        name="name"
                        value={updatedSeminar.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Дата:
                    <input
                        type="text"
                        name="date"
                        value={updatedSeminar.date}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Время:
                    <input
                        type="text"
                        name="time"
                        value={updatedSeminar.time}
                        onChange={handleChange}
                    />
                </label>
                <div className="modal-actions">
                    <button onClick={handleSubmit}>Сохранить</button>
                    <button onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default Edit;

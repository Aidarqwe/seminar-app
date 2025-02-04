import React from 'react';
import './List.scss';

function SeminarList({ seminars, onDelete, onEdit }) {
    return (
        <div className="seminar-list">
            {seminars.map(seminar => (
                <div key={seminar.id} className="seminar-card">
                    <img src={seminar.photo} alt="img"/>
                    <h2 className="seminar-title">{seminar.title}</h2>
                    <p className="seminar-description">{seminar.description}</p>
                    <p className="seminar-description">{seminar.date} {seminar.time}</p>
                    <div className="actions">
                        <button className="edit-button" onClick={() => onEdit(seminar)}>
                            Редактировать
                        </button>
                        <button className="delete-button" onClick={() => onDelete(seminar.id)}>
                            Удалить
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SeminarList;

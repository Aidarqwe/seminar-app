import React, { useEffect, useState } from "react";
import axios from "axios";
import SeminarList from "./components/List/List";
import EditModal from "./components/Edit/Edit";
import Modal from "./components/DeleteModal/DeleteModal";
import "./App.css";

const API_URL = "http://localhost:5000/seminars";

function App() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editSeminar, setEditSeminar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState(null);

  useEffect(() => {
    axios
        .get(API_URL)
        .then((response) => {
          setSeminars(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
  }, []);

  const handleDelete = (id) => {
    setSeminarToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    axios.delete(`${API_URL}/${seminarToDelete}`).then(() => {
      setSeminars(seminars.filter((seminar) => seminar.id !== seminarToDelete));
      setIsModalOpen(false);
    });
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (seminar) => {
    setEditSeminar(seminar);
  };

  const handleSave = (updatedSeminar) => {
    axios.put(`${API_URL}/${updatedSeminar.id}`, updatedSeminar).then(() => {
      setSeminars(
          seminars.map((seminar) =>
              seminar.id === updatedSeminar.id ? updatedSeminar : seminar
          )
      );
      setEditSeminar(null);
    });
  };

  return (
      <div className="App">
        <h1>Список семинаров</h1>
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <SeminarList seminars={seminars} onDelete={handleDelete} onEdit={handleEdit} />
        {editSeminar && <EditModal seminar={editSeminar} onSave={handleSave} onClose={() => setEditSeminar(null)} />}
        {isModalOpen && (
            <Modal
                message="Вы уверены, что хотите удалить семинар?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        )}
      </div>
  );
}

export default App;

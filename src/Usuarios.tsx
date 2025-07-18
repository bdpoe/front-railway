import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
} 


const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${URL}/api/usuarios`)
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al obtener usuarios:", err));
      }, [URL]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registros guardados</h1>

      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul style={styles.list}>
          {usuarios.map((user) => (
            <li key={user.id} style={styles.item}>
              <strong>{user.nombre} {user.apellido}</strong> — DNI: {user.dni}
            </li>
          ))}
        </ul>
      )}

      <button style={styles.button} onClick={() => navigate("/")}>
        ← Regresar al formulario
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center" as const,
    color: "#0066cc",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  button: {
    marginTop: "30px",
    padding: "12px 20px",
    backgroundColor: "#0066cc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

export default Usuarios;
 
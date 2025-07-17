import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });
  const URL = process.env.REACT_APP_API_URL;
  const [formSuccess, setFormSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/api/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setFormSuccess(true);
        setUser({ nombre: "", apellido: "", dni: "" });
      } else {
        alert("Error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dni") {
      if (/^\d{0,8}$/.test(value)) {
        setUser({ ...user, dni: value });
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  if (formSuccess) {
    return (
      <div style={styles.centeredBox}>
        <div style={styles.card}>
          <h2 style={styles.title}>Tu formulario fue enviado con éxito.</h2>
          <h3 style={styles.subtitle2}>Gracias</h3>
          <button style={styles.buttonPrimary} onClick={() => setFormSuccess(false)}>
            Enviar otro
          </button>
          <button style={styles.buttonSecondary} onClick={() => navigate("/usuarios")}>
            Ver registros
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.centeredBox}>
      <div style={styles.card}>
        <h1 style={styles.title}>FORMULARIO</h1>
        <p style={styles.subtitle}>Ingresa tus datos por favor</p>

        <form onSubmit={handleSubmit}>
          <fieldset style={styles.fieldset}>
            <label htmlFor="nombre" style={styles.label}>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={handleInputChange}
              value={user.nombre}
              required
              style={styles.input}
            />
          </fieldset>

          <fieldset style={styles.fieldset}>
            <label htmlFor="apellido" style={styles.label}>Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              onChange={handleInputChange}
              value={user.apellido}
              required
              style={styles.input}
            />
          </fieldset>

          <fieldset style={styles.fieldset}>
            <label htmlFor="dni" style={styles.label}>DNI:</label>
            <input
              type="text"
              id="dni"
              name="dni"
              onChange={handleInputChange}
              value={user.dni}
              required
              style={styles.input}
            />
          </fieldset>

          <button type="submit" style={styles.buttonPrimary}>
            ENVIAR
          </button>
        </form>

        <button
          style={styles.buttonSecondary}
          onClick={() => setUser({ nombre: "", apellido: "", dni: "" })}
        >
          LIMPIAR
        </button>

        <button
          style={styles.buttonSecondary}
          onClick={() => navigate("/usuarios")}
        >
          VER REGISTROS
        </button>
      </div>
    </div>
  );
}

const styles = {
  centeredBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center" as const,
    color: "#0066cc",
    marginBottom: "10px",
    fontSize: "28px",
  },
  subtitle: {
    textAlign: "center" as const,
    color: "#333",
    marginBottom: "30px",
    fontSize: "16px",
  },
  subtitle2: {
    textAlign: "center" as const,
    color: "#fedc97",
    marginBottom: "10px",
    fontSize: "20px",
  },
  fieldset: {
    border: "none",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    boxSizing: "border-box" as const,
  },
  buttonPrimary: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0066cc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonSecondary: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#999",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default App;

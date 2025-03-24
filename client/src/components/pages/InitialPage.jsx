import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTodo } from "../../context/TodoContext.jsx";
import { useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";

function InitialPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tasks, setTask] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const { tasksFetch, loading: tasksLoading } = useTodo();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && tasksFetch) {
      setTask(tasksFetch);
    }
  }, [tasksLoading, tasksFetch]);

  const onSubmit = (data) => {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          localStorage.setItem("nombreUsuario", data.name);
          handleShowAlert();
          setLoading(false);
          navigate("/todo-app");
          return 100;
        }
        return oldProgress + 20;
      });
    }, 1000);
  };

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false); // Oculta el alerta después de 3 segundos
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 font-serif bg-gray-100">
        <h1 className="mb-2 text-5xl font-semibold text-black">
          TODO LIST APP 📑
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-black">
          Ingresa tu nombre
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Tu nombre"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
            })}
            className="p-2 mt-5 mb-2 text-black bg-white border rounded-md"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
          <button
            type="submit"
            className={`px-4 py-2 mt-2 text-white bg-blue-500 rounded-md ${
              tasks ? "hover:bg-blue-600" : "hover:bg-blue-500"
            }`}
          >
            {loading ? "Guardando..." : "Ingresar"}
          </button>
        </form>
        {loading && (
          <div className="w-full h-2 mt-4 overflow-hidden bg-gray-300 rounded-md">
            <div
              className="h-full transition-all bg-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        <p className="mt-5 text-black">Powered by mauro</p>
      </div>
      {showAlert && (
        <div role="alert" className="alert alert-success">
          <CircleCheck />
          <span>Nombre guardado exitosamente, ¡Bienvenido! </span>
        </div>
      )}
    </>
  );
}

export default InitialPage;

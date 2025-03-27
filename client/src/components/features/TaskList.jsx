import { useCallback, useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard.jsx";
import Footer from "../layout/Footer.jsx";
import { ClipboardPlus, LogOut, Search } from "lucide-react";
import TaskForm from "./TaskForm.jsx";
import { TodoContext } from "../../context/TodoContext.jsx";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const { tasksFetch, filteredTask, loading } = useContext(TodoContext);
  const [tasks, setTasks] = useState([]);
  const [allTask, setAllTasks] = useState([]);
  const [formTask, setFormTask] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      setAllTasks(tasksFetch);
    }
  }, [tasksFetch, loading]);

  useEffect(() => {
    if (!loading) {
      setTasks(filteredTask);
    }
  }, [filteredTask, loading]);

  const userName = localStorage.getItem("nombreUsuario");

  useEffect(() => {
    let timeoutId;
    if (formTask === false && isExiting) {
      timeoutId = setTimeout(() => {
        setIsExiting(false);
      }, 400);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [formTask, isExiting]);

  const formNewTask = useCallback(() => {
    if (formTask) {
      // Cuando se está cerrando
      setIsExiting(true);

      setTimeout(() => {
        setFormTask(false);
      }, 500);
    } else {
      // Cuando se está abriendo
      setFormTask(true);
    }
  }, [formTask]);

  const handleLogout = () => {
    localStorage.removeItem("nombreUsuario");
    navigate("/");
  };

  return (
    <section className="w-1/2 h-full p-5 mx-auto text-white border-2 border-white/5 rounded-xl bg-black/25 backdrop-blur-sm">
      <article className="flex justify-between">
        <div>
          <h2 className="pt-3 text-4xl">Todo List App</h2>
          <h3 className="py-2 text-lg">Bienvenido, {userName} 😺</h3>
        </div>
        <div className="flex flex-col items-end gap-2 m-6 my-4 justify-top">
          <ul className="text-xs bg-transparent menu menu-horizontal backdrop-blur-sm rounded-box">
            {loading ? (
              "Cargando... "
            ) : (
              <>
                <li>
                  <button
                    onClick={formNewTask}
                    className="tooltip tooltip-top"
                    data-tip="Nueva Tarea"
                  >
                    <ClipboardPlus size={16} />
                  </button>
                </li>
                <li>
                  <button className="tooltip tooltip-top" data-tip="Buscar">
                    <Search size={16} />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLogout()}
                    className="tooltip tooltip-top"
                    data-tip="Salir"
                  >
                    <LogOut size={16} />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </article>
      <div
        className={`${
          formTask
            ? "flex animate-scale-in-ver-top"
            : isExiting
            ? "flex animate-scale-out-ver-top"
            : "hidden"
        } gap-2 my-2 transition-all`}
      >
        <TaskForm setFormTask={setFormTask} setIsExiting={setIsExiting} />
      </div>
      <article className="overflow-y-scroll h-3/4">
        <TaskCard todos={tasks} loading={loading} />
      </article>
      <Footer items={tasks} allItems={allTask} />
    </section>
  );
}

export default TaskList;

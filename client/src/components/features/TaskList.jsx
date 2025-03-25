import { useEffect, useState } from "react";
import TaskCard from "./TaskCard.jsx";
import Footer from "../layout/Footer.jsx";
import { ClipboardPlus, LogOut, Search } from "lucide-react";
import TaskForm from "./TaskForm.jsx";
import { useTodo } from "../../context/TodoContext.jsx";

function TaskList() {
  const { tasksFetch, loading } = useTodo();
  const [tasks, setTasks] = useState([]);
  const [allTask, setAllTasks] = useState([]);
  const [formTask, setFormTask] = useState(false);

  useEffect(() => {
    if (!loading && tasksFetch) {
      setAllTasks(tasksFetch);

      const pendingTask = tasksFetch.filter((t) => !t.completed);
      setTasks(pendingTask);
    }
  }, [loading, tasksFetch]);

  const userName = localStorage.getItem("nombreUsuario");

  const formNewTask = () => {
    setFormTask(true);
  };

  if (loading) return <h2>Cargando...</h2>;
  return (
    <section className="w-1/2 h-full p-5 mx-auto text-white border-2 border-white/5 rounded-xl bg-black/25 backdrop-blur-sm">
      <article className="flex justify-between">
        <div>
          <h2 className="pt-3 text-4xl">Todo List App</h2>
          <h3 className="py-2 text-lg">Bienvenido, {userName} 😺</h3>
        </div>
        <div className="flex flex-col items-end gap-2 m-6 my-4 justify-top">
          <ul className="text-xs bg-transparent menu menu-horizontal backdrop-blur-sm rounded-box">
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
              <button className="tooltip tooltip-top" data-tip="Salir">
                <LogOut size={16} />
              </button>
            </li>
          </ul>
        </div>
      </article>
      <article className="overflow-y-scroll h-3/4">
        <div
          className={`${
            formTask ? "flex" : "hidden"
          } gap-2 mr-2 transition-all animate-scale-in-ver-top`}
        >
          <TaskForm setFormTask={setFormTask} />
        </div>
        <TaskCard todos={tasks} />
      </article>
      <Footer items={tasks} allItems={allTask} />
    </section>
  );
}

export default TaskList;

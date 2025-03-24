import { useEffect, useState } from "react";
import TaskCard from "./TaskCard.jsx";
import Footer from "../layout/Footer.jsx";
import { SquarePlus } from "lucide-react";
import TaskForm from "./TaskForm.jsx";
import { useTodo } from "../../context/TodoContext.jsx";

function TaskList() {
  const { tasksFetch, loading } = useTodo();
  const [tasks, setTasks] = useState([]);
  const [formTask, setFormTask] = useState(false);

  useEffect(() => {
    if (!loading && tasksFetch) {
      setTasks(tasksFetch);
    }
  }, [loading, tasksFetch]);

  const userName = localStorage.getItem("nombreUsuario");

  const handleRemove = ({ id }) => {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  };

  const formNewTask = () => {
    setFormTask(true);
  };

  const handleCompleted = ({ id, completed }) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed,
        };
      }
      return task;
    });
    setTasks(newTasks);
  };
  if (loading) return <h2>Cargando...</h2>;
  return (
    <section className="w-1/2 h-full p-5 mx-auto text-white border-2 border-white/5 rounded-xl bg-black/25 backdrop-blur-sm">
      <article className="flex justify-between">
        <div>
          <h2 className="pt-3 text-4xl">Todo List App</h2>
          <h3 className="py-2 text-lg">Bienvenido, {userName} 😺</h3>
        </div>
        <button
          className="flex items-center gap-2 px-4 m-4 border border-transparent rounded-md select-none backdrop-blur-sm"
          onClick={formNewTask}
        >
          <SquarePlus size={32} />
          Nueva tarea
        </button>
      </article>
      <article className="overflow-y-scroll h-3/4">
        <div
          className={`${
            formTask ? "flex" : "hidden"
          } gap-2 mr-2 transition-all animate-scale-in-ver-top`}
        >
          <TaskForm setFormTask={setFormTask} />
        </div>
        <TaskCard
          onToggleComplete={handleCompleted}
          onRemoveTodo={handleRemove}
          todos={tasks}
        />
      </article>
      <Footer />
    </section>
  );
}

export default TaskList;

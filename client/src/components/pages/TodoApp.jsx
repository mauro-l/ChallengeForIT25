import { ModalProvider } from "../../context/ModalContext.jsx";
import TaskItem from "../features/TaskItem.jsx";
import TaskList from "../features/TaskList.jsx";
import DateView from "../layout/DateView.jsx";

function TodoApp() {
  return (
    <div className="flex items-center justify-center w-full h-screen p-10">
      <DateView />
      <ModalProvider>
        <TaskItem />
        <TaskList />
      </ModalProvider>
    </div>
  );
}

export default TodoApp;

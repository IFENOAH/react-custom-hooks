import React, { useEffect, useState } from "react";
import useHttp from "./Hooks/use-http";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const transformTasks = (taskObj) => {
    const loadedTasks = [];
    for (const taskKey in taskObj) {
      loadedTasks.push({
        id: taskKey,
        text: taskObj[taskKey].text,
      });
    }
    setTasks(loadedTasks);
  };
  const {
    error,
    isLoading,
    sendRequest: fetchTasks,
  } = useHttp(
    {
      url: "https://react-http-16bd1-default-rtdb.firebaseio.com/tasks.json",
    },
    transformTasks
  );
  useEffect(() => {
    fetchTasks();
  }, []);
  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}
export default App;

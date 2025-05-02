const { useState, useEffect, createContext, useContext } = React;

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [theme, setTheme] = useState("light");

  return (
    <AppContext.Provider value={{
      users, setUsers,
      selectedUserIndex, setSelectedUserIndex,
      theme, setTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

const App = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

const MainApp = () => {
  const { theme } = useContext(AppContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app">
      <Sidebar />
      <Main />
    </div>
  );
};

const Sidebar = () => {
  const {
    users, setUsers,
    selectedUserIndex, setSelectedUserIndex,
    theme, setTheme
  } = useContext(AppContext);
  const [newUser, setNewUser] = useState("");

  const addUser = () => {
    const name = newUser.trim();
    if (!name) return;
    setUsers([...users, { name, tasks: [] }]);
    setNewUser("");
  };

  const deselectUser = () => setSelectedUserIndex(null);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const selectedUser = users[selectedUserIndex];
  const completed = selectedUser ? selectedUser.tasks.filter(t => t.completed).length : 0;

  return (
    <aside className="sidebar card">
      <h2>Usuarios</h2>
      <ul id="userList">
        {users.map((user, index) => (
          <li
            key={index}
            style={{ cursor: "pointer", fontWeight: selectedUserIndex === index ? "bold" : "normal" }}
            onClick={() => setSelectedUserIndex(index)}
          >
            {user.name}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newUser}
        onChange={e => setNewUser(e.target.value)}
        placeholder="Nuevo usuario..."
      />
      <button onClick={addUser}>Añadir Usuario</button>

      {selectedUser && (
        <div id="userInfo">
          <hr />
          <p id="userName">{selectedUser.name}</p>
          <p id="userStats">Tareas: {completed} / {selectedUser.tasks.length} completadas</p>
          <button onClick={deselectUser}>Deseleccionar</button>
        </div>
      )}

      <button onClick={toggleTheme} style={{ marginTop: "auto" }}>🌙/☀️ Tema</button>
    </aside>
  );
};

const Main = () => {
  const { selectedUserIndex } = useContext(AppContext);
  return (
    <main className="main">
      <div className="card">
        <h1 id="mainTitle">
          {selectedUserIndex === null ? "Selecciona un usuario" : `Tareas de usuario`}
        </h1>
        {selectedUserIndex !== null && <TaskSection />}
      </div>
    </main>
  );
};

const TaskSection = () => {
  const { users, setUsers, selectedUserIndex } = useContext(AppContext);
  const [newTask, setNewTask] = useState("");

  const user = users[selectedUserIndex];

  const updateTasks = (tasks) => {
    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex] = { ...user, tasks };
    setUsers(updatedUsers);
  };

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    updateTasks([...user.tasks, { text, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const tasks = [...user.tasks];
    tasks[index].completed = !tasks[index].completed;
    updateTasks(tasks);
  };

  const deleteTask = (index) => {
    const tasks = [...user.tasks];
    tasks.splice(index, 1);
    updateTasks(tasks);
  };

  const editTask = (index) => {
    const newText = prompt("Editar tarea:", user.tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
      const tasks = [...user.tasks];
      tasks[index].text = newText.trim();
      updateTasks(tasks);
    }
  };

  return (
    <div id="taskSection">
      <ul id="taskList">
        {user.tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(index)}>{task.text}</span>
            <div className="actions">
              <button onClick={() => editTask(index)}>✏️</button>
              <button onClick={() => deleteTask(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button onClick={addTask}>Añadir Tarea</button>
    </div>
  );
};

// Renderizado principal
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

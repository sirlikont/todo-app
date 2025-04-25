import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-80078344-8f61-4098-8142-97416f3bf844/default/listTodo');
    const data = await res.json();
    setTodos(data.todos);
  };

  const addTodo = async () => {
    await fetch('https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-80078344-8f61-4098-8142-97416f3bf844/default/addTodo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    setInput('');
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.text} {todo.done ? '✓' : ''}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
// App.tsx
import './App.css';
import Header from './components/Header';
import FileDialog from './components/FileDialog';
import FileCard from './components/FileCard';
import SideBar from './components/SideBar';
import { useState } from 'react';
import menuIcon from './assets/menu.png';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

interface File {
  id: string;
  title: string;
  color: string;
  todos: Todo[];
}

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [ambientColor, setAmbientColor] = useState('#ffffff');
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // For editing todos
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editTodoText, setEditTodoText] = useState('');


  const activeFile = files.find(file => file.id === activeFileId);

  const handleCreateFile = (title: string, color: string) => {
    const newFile: File = {
      id: crypto.randomUUID(),
      title,
      color,
      todos: [],
    };
    setFiles(prev => [...prev, newFile]);
    setAmbientColor(color);
    setShowDialog(false);
    setActiveFileId(newFile.id);
  };

  const handleOpenFile = (id: string) => {
    setActiveFileId(id);
    const file = files.find(f => f.id === id);
    if (file) setAmbientColor(file.color);
  };

  const handleCloseFile = () => {
    setActiveFileId(null);
    setAmbientColor('#ffffff');
    setNewTodo('');
  };

  const handleAddTodo = () => {
    if (!newTodo.trim() || !activeFile) return;

    const updatedFiles = files.map(file =>
      file.id === activeFile.id
        ? {
          ...file,
          todos: [...file.todos, { id: crypto.randomUUID(), text: newTodo.trim(), done: false }],
        }
        : file
    );

    setFiles(updatedFiles);
    setNewTodo('');
  };

  const handleToggleTodo = (todoId: string) => {
    if (!activeFile) return;

    const updatedFiles = files.map(file =>
      file.id === activeFile.id
        ? {
          ...file,
          todos: file.todos.map(todo =>
            todo.id === todoId ? { ...todo, done: !todo.done } : todo
          ),
        }
        : file
    );

    setFiles(updatedFiles);
  };

  const handleSaveTodoEdit = (todoId: string) => {
    if (!activeFile) return;

    const updatedFiles = files.map(file =>
      file.id === activeFile.id
        ? {
          ...file,
          todos: file.todos.map(todo =>
            todo.id === todoId ? { ...todo, text: editTodoText } : todo
          ),
        }
        : file
    );

    setFiles(updatedFiles);
    setEditingTodoId(null);
    setEditTodoText('');
  };

  const handleDeleteTodo = (todoId: string) => {
    if (!activeFile) return;

    const updatedFiles = files.map(file =>
      file.id === activeFile.id
        ? {
          ...file,
          todos: file.todos.filter(todo => todo.id !== todoId),
        }
        : file
    );

    setFiles(updatedFiles);
  };



  return (
    <>
      <div
        className="app-wrapper"
        style={{
          backgroundColor: ambientColor,
          filter: activeFile ? 'blur(4px)' : 'none',
          pointerEvents: activeFile ? 'none' : 'auto',
        }}
      >
        <Header ambientColor={ambientColor} />

        <div className="main-content">
          <div className="dialog-box" onClick={() => setShowDialog(true)}>
            Take a note...
          </div>

          {showDialog && (
            <FileDialog onClose={() => setShowDialog(false)} onCreate={handleCreateFile} />
          )}

          <div className="file-stack">
            {files.map(file => (
              <FileCard
                key={file.id}
                title={file.title}
                color={file.color}
                onClick={() => handleOpenFile(file.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* File Modal */}
      {activeFile && (
        <div className="file-modal-overlay" onClick={handleCloseFile}>
          <div
            className="file-modal"
            style={{ backgroundColor: activeFile.color }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top Section with Title and Close */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: '#222' }}>{activeFile.title}</h2>
              <button
                onClick={handleCloseFile}
                className="close-btn"
                style={{ padding: '4px 12px' }}
              >
                ✕
              </button>
            </div>

            {/* Todo Input */}
            <div style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
              <input
                type="text"
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                placeholder="Add a todo..."
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleAddTodo();
                }}
              />
            </div>

            {/* Todo List */}
            {/* Todo List with Edit Mode */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {activeFile.todos.map(todo => (
                <li key={todo.id} className="todo-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleToggleTodo(todo.id)}
                    style={{ marginRight: '10px' }}
                  />

                  {editingTodoId === todo.id ? (
                    <input
                      type="text"
                      value={editTodoText}
                      autoFocus
                      onChange={e => setEditTodoText(e.target.value)}
                      onBlur={() => handleSaveTodoEdit(todo.id)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSaveTodoEdit(todo.id);
                        if (e.key === 'Escape') setEditingTodoId(null);
                      }}
                      style={{
                        flex: 1,
                        padding: '6px',
                        borderRadius: '6px',
                        border: '1px solid #aaa',
                      }}
                    />
                  ) : (
                    <span
                      onDoubleClick={() => {
                        setEditingTodoId(todo.id);
                        setEditTodoText(todo.text);
                      }}
                      style={{
                        flex: 1,
                        textDecoration: todo.done ? 'line-through' : 'none',
                        color: '#333',
                        cursor: 'pointer',
                      }}
                    >
                      {todo.text}
                    </span>
                  )}

                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="todo-delete-btn"
                    aria-label="Delete todo"
                    style={{
                      marginLeft: '12px',
                      background: 'transparent',
                      border: 'none',
                      color: '#d32f2f',
                      fontSize: '20px',
                      cursor: 'pointer',
                      lineHeight: '1',
                    }}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>


            {/* Bottom Buttons Row */}
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <button onClick={handleAddTodo} className="close-btn">
                Add
              </button>
              <button
                onClick={() => {
                  if (!activeFile) return;
                  setFiles(files.filter(f => f.id !== activeFile.id));
                  handleCloseFile();
                }}
                className="close-btn"
                style={{ backgroundColor: '#d32f2f' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <img src={menuIcon} alt="Menu" width={24} />
      </button>

      {/* Sidebar Component */}
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

export default App;

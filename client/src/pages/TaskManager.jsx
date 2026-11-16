import React, { useState, useEffect } from 'react';

const initialTasks = [
  {
    id: '1',
    title: 'Implement MongoDB Indexes',
    description: 'Optimize query throughput for project catalog and resume collections.',
    category: 'Backend',
    priority: 'High',
    status: 'done',
  },
  {
    id: '2',
    title: 'Real-Time Resume PDF Styling',
    description: 'Ensure clean A4 print formatting with zero browser header noise.',
    category: 'Frontend',
    priority: 'High',
    status: 'done',
  },
  {
    id: '3',
    title: 'Build Interactive Kanban Board',
    description: 'Create responsive drag-free task cards with status transition workflows.',
    category: 'Application',
    priority: 'Medium',
    status: 'in-progress',
  },
  {
    id: '4',
    title: 'Stripe Webhook Integration',
    description: 'Handle asynchronous subscription billing events and transaction logs.',
    category: 'Backend',
    priority: 'High',
    status: 'todo',
  },
  {
    id: '5',
    title: 'Figma Token Export to CSS',
    description: 'Sync design system variables directly into Tailwind and custom properties.',
    category: 'UI/UX',
    priority: 'Low',
    status: 'todo',
  },
];

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('devtask_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Frontend',
    priority: 'Medium',
    status: 'todo',
  });

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    localStorage.setItem('devtask_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now().toString(),
      ...newTask,
      title: newTask.title.trim(),
      description: newTask.description.trim(),
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask({
      title: '',
      description: '',
      category: 'Frontend',
      priority: 'Medium',
      status: 'todo',
    });
    setIsAdding(false);
  };

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleReset = () => {
    setTasks(initialTasks);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#ff7b72';
      case 'Medium':
        return '#e3b341';
      default:
        return '#3fb950';
    }
  };

  const columns = [
    { key: 'todo', label: 'To Do', color: '#ff7b72' },
    { key: 'in-progress', label: 'In Progress', color: '#e3b341' },
    { key: 'done', label: 'Completed', color: '#3fb950' },
  ];

  return (
    <article className="task-manager active" data-page="task-manager">
      <header className="resume-builder-header">
        <div className="header-title-box">
          <h2 className="h2 article-title" style={{ margin: 0 }}>DevTask Manager</h2>
          <p style={{ color: 'var(--light-gray-70)', fontSize: 'var(--fs-6)', marginTop: '8px' }}>
            Interactive Agile Kanban workspace with instant priority sorting and state persistence.
          </p>
        </div>

        <div className="resume-builder-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleReset}
            title="Reset to sample tasks"
          >
            <ion-icon name="refresh-outline"></ion-icon>
            <span>Reset Board</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsAdding((prev) => !prev)}
            style={{
              background: 'var(--orange-yellow-crayola)',
              color: 'var(--eerie-black-1)',
              fontWeight: '600',
            }}
          >
            <ion-icon name={isAdding ? 'close-outline' : 'add-outline'}></ion-icon>
            <span>{isAdding ? 'Cancel' : 'New Task'}</span>
          </button>
        </div>
      </header>

      {/* Add Task Form Modal / Collapse */}
      {isAdding && (
        <form
          onSubmit={handleAddTask}
          className="builder-panel"
          style={{ marginBottom: '25px', animation: 'fade 0.3s ease' }}
        >
          <h4 className="builder-section-title">Create New Task</h4>

          <div className="builder-input-row">
            <div className="builder-input-group">
              <label>Task Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Implement OAuth2 Login"
                required
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>

            <div className="builder-input-group">
              <label>Category</label>
              <select
                className="form-input"
                style={{ background: 'var(--onyx)', color: 'var(--white-2)', padding: '10px' }}
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Application">Application</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Database">Database</option>
              </select>
            </div>
          </div>

          <div className="builder-input-row">
            <div className="builder-input-group">
              <label>Priority</label>
              <select
                className="form-input"
                style={{ background: 'var(--onyx)', color: 'var(--white-2)', padding: '10px' }}
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="builder-input-group">
              <label>Initial Column</label>
              <select
                className="form-input"
                style={{ background: 'var(--onyx)', color: 'var(--white-2)', padding: '10px' }}
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Completed</option>
              </select>
            </div>
          </div>

          <div className="builder-input-group">
            <label>Description</label>
            <textarea
              className="form-input"
              rows={2}
              placeholder="Task details and acceptance criteria..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
            <ion-icon name="checkmark-outline"></ion-icon>
            <span>Save Task to Board</span>
          </button>
        </form>
      )}

      {/* Kanban Columns Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);

          return (
            <div
              key={col.key}
              style={{
                background: 'var(--eerie-black-2)',
                border: '1px solid var(--jet)',
                borderRadius: '16px',
                padding: '18px',
                minHeight: '400px',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  paddingBottom: '10px',
                  borderBottom: `2px solid ${col.color}`,
                }}
              >
                <h4 style={{ color: 'var(--white-2)', fontSize: '15px', fontWeight: '600' }}>
                  {col.label}
                </h4>
                <span
                  style={{
                    background: 'var(--onyx)',
                    color: col.color,
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    border: '1px solid var(--jet)',
                  }}
                >
                  {colTasks.length}
                </span>
              </div>

              {/* Task Items in Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {colTasks.length === 0 ? (
                  <p
                    style={{
                      color: 'var(--light-gray-70)',
                      fontSize: '13px',
                      textAlign: 'center',
                      padding: '30px 10px',
                      fontStyle: 'italic',
                    }}
                  >
                    No tasks in {col.label.toLowerCase()}
                  </p>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      style={{
                        background: 'var(--onyx)',
                        border: '1px solid var(--jet)',
                        borderRadius: '12px',
                        padding: '14px',
                        position: 'relative',
                        transition: 'var(--transition-1)',
                      }}
                    >
                      {/* Priority tag & delete */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            color: getPriorityColor(task.priority),
                            background: 'rgba(0,0,0,0.3)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {task.priority}
                        </span>

                        <button
                          onClick={() => deleteTask(task.id)}
                          type="button"
                          style={{
                            color: 'var(--light-gray-70)',
                            cursor: 'pointer',
                            fontSize: '16px',
                          }}
                          title="Delete task"
                        >
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </div>

                      <h5
                        style={{
                          color: 'var(--white-1)',
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '6px',
                        }}
                      >
                        {task.title}
                      </h5>

                      {task.description && (
                        <p
                          style={{
                            color: 'var(--light-gray)',
                            fontSize: '12px',
                            lineHeight: '1.5',
                            marginBottom: '10px',
                          }}
                        >
                          {task.description}
                        </p>
                      )}

                      {/* Bottom actions: Category pill & Transition buttons */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginTop: '8px',
                          paddingTop: '8px',
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '10px',
                            color: 'var(--orange-yellow-crayola)',
                            background: 'rgba(255, 219, 112, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          {task.category}
                        </span>

                        <div style={{ display: 'flex', gap: '4px' }}>
                          {col.key !== 'todo' && (
                            <button
                              onClick={() =>
                                moveTask(task.id, col.key === 'done' ? 'in-progress' : 'todo')
                              }
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '3px 8px', fontSize: '10px' }}
                              title="Move backward"
                            >
                              ←
                            </button>
                          )}

                          {col.key !== 'done' && (
                            <button
                              onClick={() =>
                                moveTask(task.id, col.key === 'todo' ? 'in-progress' : 'done')
                              }
                              type="button"
                              className="btn-primary"
                              style={{ padding: '3px 8px', fontSize: '10px' }}
                              title="Move forward"
                            >
                              →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

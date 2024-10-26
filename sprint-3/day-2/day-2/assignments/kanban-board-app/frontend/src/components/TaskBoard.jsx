const TaskBoard = () => {
  return (
    <div style={styles.boardContainer}>
      <h2>Your Kanban Board</h2>
      <div style={styles.board}>
        <div style={styles.column}>
          <h3>To Do</h3>
          {/* Tasks will go here */}
        </div>
        <div style={styles.column}>
          <h3>In Progress</h3>
          {/* Tasks will go here */}
        </div>
        <div style={styles.column}>
          <h3>Done</h3>
          {/* Tasks will go here */}
        </div>
      </div>
    </div>
  );
};

// Styles for TaskBoard component
const styles = {
  boardContainer: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  board: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  column: {
    width: '30%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
  },
};

export default TaskBoard;

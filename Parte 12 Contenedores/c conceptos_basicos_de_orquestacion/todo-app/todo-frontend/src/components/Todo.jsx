const Todo = ({ todo }) => (
    <div>
        <h3>{todo.title}</h3>
        <p>{todo.completed ? "Completed" : "Pending"}</p>
    </div>
);

export default Todo;

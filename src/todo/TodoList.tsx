import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { data, type Schema } from "../../amplify/data/resource";

type Todo = Schema["Todo"]

type TodoA = {
    a: string
}

type TodoB = {
    b: string
}

export default function TodoList() {
    // generate your data client using the Schema from your backend
    const client = generateClient<Schema>();

    const [todos, setTodos] = useState<Todo[]>([]);

    function listTodos() {
        client.models.Todo.list()
            .then(({ data }) => setTodos(data));
    }

    function createTodo(type: Schema["Todo"]["type"]) {
        client.models.Todo.create({
            content: window.prompt("Todo"),
            isDone: false,
            priority: "low",
            type,
            additionalInfo: ["A", "B"]
        }).then(({ errors, data }) => console.log(errors, data))
    }

    function renderTodo(todo: Todo) {
        var color = "blue"
        var text = todo.content

        if(todo.type === "A") {
            const additionalInfo = todo.additionalInfo as TodoA
            color = "red"
            text = additionalInfo?.a
            console.log(additionalInfo)
        }

        return (<span style={{color}}>{text}</span>)
    }

    useEffect(() => {
        listTodos();
    }, []);

    return (
        <div>
            <h1>Todos</h1>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{renderTodo(todo)}</li>
                ))}
            </ul>
            <button onClick={() => createTodo("A")}>Create A</button>
            <button onClick={() => createTodo("B")}>Create B</button>
        </div>
    );
}
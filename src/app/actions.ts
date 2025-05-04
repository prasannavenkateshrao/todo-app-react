'use server';

let todos: string[] = [];

export async function addTodo(task: string) {
  todos.push(task);
  return todos;
}

export async function removeTodo(index: number) {
  todos.splice(index, 1);
  return todos;
}

export async function getTodos() {
  return todos;
}

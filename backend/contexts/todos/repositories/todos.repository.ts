const todos = [{ id: 1, text: 'Buy milk' }, { id: 2, text: 'Do laundry' }];

export const get = async () => todos;

export const create = async (text: string) => {
  const id = todos.length + 1;
  const newTodo = { id, text };
  todos.push(newTodo);
  return newTodo;
};

export const update = async (id: number, text: string) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    throw new Error('Todo not found');
  }
  todo.text = text;
  return todo;
};

export const remove = async (id: number) => {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error('Todo not found');
  }
  todos.splice(index, 1);
};

import * as TodosRepository from 'Repositories/todos';

type InsertTodoInput = {
  text: string
};

export const create = async (data: InsertTodoInput) => {
  const todo = await TodosRepository.insert(data);

  return {
    id: todo.id,
    text: todo.text,
  };
};

export default create;

import HttpError from 'Errors/http-error';
import * as TodosRepository from 'Repositories/todos';
import serviceWrapper from 'Wrappers/service-wrapper';

type InsertTodoInput = {
  text: string
};

type UpdateTodoInput = {
  id: string,
  text: string
};

export const get = async () => serviceWrapper('GET', 'TODOS', async () => {
  const result = await TodosRepository.fetch();
  const todo = result?.[0];
  if (!todo) throw new HttpError(404, 'GET.TODOS.NOT_FOUND', 'No Todos found in the database.');

  return result;
});

export const create = async (data: InsertTodoInput) => serviceWrapper('POST', 'TODOS', async () => {
  const result = await TodosRepository.insert(data);
  const todo = result![0];

  return {
    id: todo.id,
    text: todo.text,
  };
});

export const update = async (data: UpdateTodoInput) => serviceWrapper('PATCH', 'TODOS', async () => {
  const result = await TodosRepository.update(data);
  const todo = result?.[0];
  if (!todo) throw new HttpError(404, 'PATCH.TODOS.NOT_FOUND', 'Could not find a Todo with that id.');

  return {
    id: todo.id,
    text: todo.text,
  };
});

export const remove = async (id: string) => serviceWrapper('DELETE', 'TODOS', async () => {
  const result = await TodosRepository.remove(id);
  const todo = result?.[0];
  if (!todo) throw new HttpError(404, 'DELETE.TODOS.NOT_FOUND', 'Could not find a Todo with that id.');

  return {
    id: todo.id,
  };
});

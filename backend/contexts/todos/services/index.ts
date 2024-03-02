import HttpError from 'Contexts/lib/errors/http-error';
import parseDatabaseError from 'Contexts/lib/errors/parse-database-error';
import * as TodosRepository from 'Repositories/todos';
import DatabaseError from 'Repository/utils/errors/database.error';

type InsertTodoInput = {
  text: string
};

type UpdateTodoInput = {
  id: string,
  text: string
};

export const get = async () => {
  try {
    const result = await TodosRepository.fetch();
    const todo = result?.[0];
    if (!todo) throw new HttpError(404, 'GET.TODOS.NOT_FOUND', 'No Todos found in the database.');

    return result;
  } catch (error) {
    console.error('Context service error: ', error);
    if (error instanceof HttpError) throw error;
    throw new HttpError(500, 'GET.TODOS.SERVER_ERROR', 'Error while fetching Todos.');
  }
};

export const create = async (data: InsertTodoInput) => {
  try {
    const result = await TodosRepository.insert(data);
    const todo = result![0];

    return {
      id: todo.id,
      text: todo.text,
    };
  } catch (error) {
    console.error('Context service error: ', error);
    if (error instanceof HttpError) throw error;
    parseDatabaseError(error, 'POST', 'TODOS');
    throw new HttpError(500, 'POST.TODOS.SERVER_ERROR', 'Error while creating Todo.');
  }
};

export const update = async (data: UpdateTodoInput) => {
  try {
    const result = await TodosRepository.update(data);
    const todo = result?.[0];
    if (!todo) throw new HttpError(404, 'PATCH.TODOS.NOT_FOUND', 'Could not find a Todo with that id.');

    return {
      id: todo.id,
      text: todo.text,
    };
  } catch (error) {
    console.error('Context service error: ', error);
    if (error instanceof HttpError) throw error;
    parseDatabaseError(error as DatabaseError, 'PATCH', 'TODOS');
    throw new HttpError(500, 'PATCH.TODOS.SERVER_ERROR', 'Error while updating Todo.');
  }
};

export const remove = async (id: string) => {
  try {
    const result = await TodosRepository.remove(id);
    const todo = result?.[0];
    if (!todo) throw new HttpError(404, 'DELETE.TODOS.NOT_FOUND', 'Could not find a Todo with that id.');

    return {
      id: todo.id,
    };
  } catch (error) {
    console.error('Context service error: ', error);
    if (error instanceof HttpError) throw error;
    throw new HttpError(500, 'DELETE.TODOS.SERVER_ERROR', 'Error while deleting Todo.');
  }
};

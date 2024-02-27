import {
  get, create, update, remove,
} from './todos.repository';

describe.concurrent('Todos Repository', () => {
  let todos: { id: number; text: string }[];

  beforeEach(() => {
    todos = [{ id: 1, text: 'Buy milk' }, { id: 2, text: 'Do laundry' }];
  });

  describe('get', () => {
    it('should return all todos', async () => {
      const result = await get();
      expect(result).toEqual(todos);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const newTodoText = 'Clean the house';
      const result = await create(newTodoText);
      const expectedTodo = { id: 3, text: newTodoText };
      expect(result).toEqual(expectedTodo);
    });
  });

  describe('update', () => {
    it('should update an existing todo', async () => {
      const todoId = 1;
      const updatedTodoText = 'Buy eggs';
      const result = await update(todoId, updatedTodoText);
      const expectedTodo = { id: todoId, text: updatedTodoText };
      expect(result).toEqual(expectedTodo);
    });

    it('should throw an error if the todo does not exist', async () => {
      const nonExistingTodoId = 30;
      const updatedTodoText = 'Buy eggs';
      await expect(update(nonExistingTodoId, updatedTodoText)).rejects.toThrow('Todo not found');
    });
  });

  describe('remove', () => {
    it('should remove an existing todo', async () => {
      const todoId = 1;
      await remove(todoId);
    });

    it('should throw an error if the todo does not exist', async () => {
      const nonExistingTodoId = 30;
      await expect(remove(nonExistingTodoId)).rejects.toThrow('Todo not found');
    });
  });
});

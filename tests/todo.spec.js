import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('TodoMVC Automation Suite', () => {
  let todoPage;
  let addedTodos = [];

  test.beforeEach(async ({ page }) => {
    // Navigate fresh before each test
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    todoPage = new TodoPage(page);
    addedTodos = []; // track new todos for cleanup
  });

  test.afterEach(async ({}, testInfo) => {
    // Cleanup only if test failed
    if (testInfo.status !== testInfo.expectedStatus && todoPage) {
      await todoPage.cleanupTodos(addedTodos);
    }
  });

  test('TC-001 - Add three todos and delete second one', async () => {
    // Steps:
    // 1. Add three todo items
    // 2. Verify all three are visible
    // 3. Delete the second todo
    // 4. Verify only two remain with correct text

    const todos = ['Task One', 'Task Two', 'Task Three'];

    // Add todos
    for (let todo of todos) {
      await todoPage.addTodo(todo);
      addedTodos.push(todo); // track for cleanup
    }

    // Verify all 3 added
    await todoPage.verifyTodos(todos);

    // Delete the second todo
    await todoPage.deleteTodoByIndex(1);
    addedTodos.splice(1, 1); // keep cleanup tracker in sync

    // Verify only 2 remain
    await todoPage.verifyTodos([todos[0], todos[2]]);
  });
});

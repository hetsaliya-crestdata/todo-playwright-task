// TodoPage.js
// Page Object Model for TodoMVC Application
// Selectors are chosen to be stable and resilient against i18n and UI changes.

import { expect } from '@playwright/test';

export class TodoPage {
  constructor(page) {
    this.page = page;

    // Selectors:
    this.todoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
    // Role-based locator with accessible name: avoids fragile placeholder-based locators.

    this.todoItems = page.locator('.todo-list li');
    this.todoLabel = (index) => this.todoItems.nth(index).locator('label');
    this.todoDestroyButton = (index) => this.todoItems.nth(index).locator('.destroy');
  }

  /**
   * Add a todo item by typing text and pressing Enter
   * @param {string} text - Todo item text
   */
  async addTodo(text) {
    await this.todoInput.fill(text);
    await this.todoInput.press('Enter');
  }

  /**
   * Delete todo item by index
   * @param {number} index - Position of todo in list
   */
  async deleteTodoByIndex(index) {
    await this.todoItems.nth(index).hover();
    await this.todoDestroyButton(index).click();
  }

  /**
   * Verify count of todos
   * @param {number} expected - Expected count of todos
   */
  async expectTodoCount(expected) {
    await expect(this.todoItems).toHaveCount(expected);
  }

  /**
   * Verify todos text in sequence
   * @param {string[]} expectedTodos - Array of todo texts in order
   */
  async verifyTodos(expectedTodos) {
    await this.expectTodoCount(expectedTodos.length);
    for (let i = 0; i < expectedTodos.length; i++) {
      await expect(this.todoLabel(i)).toHaveText(expectedTodos[i]);
    }
  }

  /**
   * Cleanup only newly added todos (in reverse order)
   * @param {string[]} addedTodos - Todos that were added during test
   */
  async cleanupTodos(addedTodos) {
    for (let i = addedTodos.length - 1; i >= 0; i--) {
      try {
        await this.deleteTodoByIndex(i);
      } catch (e) {
        console.error(`Cleanup failed for: ${addedTodos[i]}`, e);
      }
    }
  }
}

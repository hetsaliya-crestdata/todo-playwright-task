# 📘 TodoMVC Playwright Automation

## 📌 Objective

This project demonstrates an **end-to-end automation test suite** for the [TodoMVC application](https://demo.playwright.dev/todomvc/#/) using **Playwright** with **JavaScript**.

The test suite covers adding, verifying, and deleting todos while ensuring the app is always restored to an ideal state after tests.

---

## ⚙️ Tech Stack

* **Playwright** (latest)
* **JavaScript (Node.js)**
* **Page Object Model (POM)** design
* **Cross-browser support** (Chromium, Firefox, WebKit)
* **Artifacts for debugging** (screenshots, video, traces)

---

## 📂 Project Structure

```
├── pages/
│   └── TodoPage.js         # POM class for TodoMVC page
├── tests/
│   └── todo.spec.js        # Main test suite
├── playwright.config.js    # Playwright configuration
└── README.md               # Documentation
```

---

## 🚀 Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hetsaliya-crestdata/todo-playwright-task.git
   cd todo-playwright-task
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run tests:

   ```bash
   npx playwright test
   ```

4. Run tests for a specific browser:

   ```bash
   npx playwright test --project=Firefox
   ```

5. View the test report:

   ```bash
   npx playwright show-report
   ```

---

## 🏗️ Approach & Design

### ✅ Page Object Model (POM)

* Encapsulates **locators** and **methods** in `pages/TodoPage.js`.
* Keeps test scripts **clean and readable**.
* Any UI change requires updating selectors only in the POM file.

### ✅ Selector Strategy

* **Todo Input** → `.new-todo`

  * More stable than placeholder text (`"What needs to be done?"`).
  * Prevents issues with **i18n/localization** or UI text changes.

* **Todo Items** → `.todo-list li`

  * Minimal and stable selector to fetch all todos.

* **Delete Button** → `.destroy` (revealed only on hover).

### ✅ Retry & Cross-Browser Support

Configured in `playwright.config.js`:

* Retries failed tests up to **2 times**.
* Runs across **Chromium, Firefox, WebKit**.
* Captures **screenshots**, **video**, and **traces** only on failure → efficient debugging without clutter.

### ✅ Cleanup Logic

* **After test**:

  * If **test fails** → clean up only the newly added todos (restore app to an ideal empty state).

This ensures:

* Tests remain **independent**.
* On Failures **leave a clean state** for the next test.

---

## 🧪 Test Case Details

### **TC-001 - Add three todos and delete second one**

**Steps:**

1. Add 3 new todos: `"Task One"`, `"Task Two"`, `"Task Three"`.
2. Verify that all 3 todos are added successfully.
3. Delete the second newly added todo (`"Task Two"`).
4. Verify only 2 todos remain: `"Task One"` and `"Task Three"`.

**Expected Result:**
Todos are added, verified, and deleted correctly. The state is restored after test completion.

---

## 📄 Example Config: `playwright.config.js`

```js
// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  retries: 2, // retry failed tests

  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } },
  ],

  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [['html'], ['list']],
};

module.exports = config;
```

---

## 📝 Why This Approach?

* **POM** → Scalable, maintainable, and clean.
* **Stable selectors** → Avoids fragile placeholder text → i18n-safe.
* **Retry logic** → Handles flaky tests gracefully.
* **Cross-browser** → Ensures app works consistently across environments.
* **Cleanup strategy** → Keeps the instance consistent, avoids leftover data pollution.
* **Artifacts** → Videos, screenshots, and traces improve debugging.


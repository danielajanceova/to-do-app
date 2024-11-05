import { Selector } from "testcafe";

fixture("ToDo app tests")
    .page("http://test.danielajanceova.com/todo/");

// Test for adding a ToDo item
test("Adding a ToDo item", async t => {
    // Arrange
    const todoText = "Finish BDE";

    // Act
    await t
        .typeText(Selector("#todo-input"), todoText)
        .click(Selector(".todo-form button[type='submit']"));

    // Assert
    await t
        .expect(Selector("#todo-list").childElementCount).eql(1) // Expect 1 item to be added
        .expect(Selector("#todo-list .todo-item").withText(todoText).exists).ok(); // Check if the item exists
});

// Test for updating priority
test("Updating a ToDo priority", async t => {
    // Arrange
    const todoText = "Priority task";
    const expectedPriority = "High";

    await t
        .typeText(Selector("#todo-input"), todoText)
        .click(Selector(".todo-form button[type='submit']"));

    const priorityDropdown = Selector("#todo-list .todo-item .priority-dropdown");

    // Act
    await t
        .click(priorityDropdown)
        .click(priorityDropdown.find("option").withText(expectedPriority)); // Select "High" priority
    
    // Assert
    await t.expect(priorityDropdown.value).eql(expectedPriority); // Verify the priority is set to "High"
});

// Test for Clear Completed button
test("Clearing completed ToDos", async t => {
    // Arrange
    const todoText = "Complete task";
    
    await t
        .typeText(Selector("#todo-input"), todoText)
        .click(Selector(".todo-form button[type='submit']"))
        .click(Selector("#todo-list .todo-item .toggle-checkbox")); // Mark task as completed

    // Act
    await t.click(Selector("#clearCompleted")); // Click Clear Completed

    // Assert
    await t.expect(Selector("#todo-list .todo-item").withText(todoText).exists).notOk(); // Verify the task is removed
});

// Test for progress bar reflecting completed tasks correctly
test("Progress bar reflects completed tasks correctly", async t => {
    // Arrange
    const tasks = ["Task 1", "Task 2", "Task 3"];
    for (const task of tasks) {
        await t
            .typeText(Selector("#todo-input"), task)
            .click(Selector(".todo-form button[type='submit']"));
    }

    // Mark some tasks as completed
    await t
        .click(Selector("#todo-list .todo-item").withText(tasks[0]).find(".toggle-checkbox")) // Mark "Task 1" as completed
        .click(Selector("#todo-list .todo-item").withText(tasks[1]).find(".toggle-checkbox")); // Mark "Task 2" as completed

    // Act
    const completedTasks = 2; // Completed tasks
    const totalTasks = tasks.length; // Total tasks
    const expectedPercentage = (completedTasks / totalTasks) * 100; // Calculate percentage
    const progressBarWidth = 400; // Maximum width of the progress bar in pixels
    const expectedWidthInPixels = (completedTasks / totalTasks) * progressBarWidth; // Expected width in pixels

    // Assert
    const progressBar = Selector("#progress-bar");
    const actualWidth = await progressBar.clientWidth;
    await t.expect(actualWidth).eql(expectedWidthInPixels); // Assert that the progress bar width is correct
});

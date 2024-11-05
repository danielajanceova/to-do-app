import { Selector } from "testcafe";

fixture("ToDo app tests")
    .page("http://test.danielajanceova.com/todo/");


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

// Test for Progress Bar
test("Progress bar reflects completed tasks correctly", async t => {
    // Arrange
    await t
        .typeText(Selector("#todo-input"), "Task 1")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Task 2")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Task 3")
        .click(Selector(".todo-form button[type='submit']"));

    // Act
    await t
        .click(Selector("#todo-list .todo-item").withText("Task 1").find(".toggle-checkbox")) // Mark "Task 1" as completed
        .click(Selector("#todo-list .todo-item").withText("Task 2").find(".toggle-checkbox")); // Mark "Task 2" as completed

    // Expected calculations
    const completedTasks = 2; // Completed tasks
    const totalTasks = 3; // Total tasks
    const expectedPercentage = (completedTasks / totalTasks) * 100; // Calculate percentage
    const progressBarWidth = 400; // Maximum width of the progress bar in pixels
    const expectedWidthInPixels = (completedTasks / totalTasks) * progressBarWidth; // Expected width in pixels

    // Wait for the progress bar to update
    await t.wait(100); // Adjust the wait time if necessary

    // Assert
    const progressBar = Selector("#progress-bar");
    const actualWidth = await progressBar.clientWidth;
    await t.expect(actualWidth).eql(expectedWidthInPixels); // Assert that the progress bar width is correct
});

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

// Test for progress bar
test("Progress bar reflects completed tasks correctly", async t => {
    // Arrange: Create 3 tasks
    await t
        .typeText(Selector("#todo-input"), "Task 1")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Task 2")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Task 3")
        .click(Selector(".todo-form button[type='submit']"));

    // Act: Mark two tasks as completed
    await t
        .click(Selector("#todo-list .todo-item").withText("Task 1").find(".toggle-checkbox"))
        .click(Selector("#todo-list .todo-item").withText("Task 2").find(".toggle-checkbox"));


    // Assert
    const completedTasks = 2; // Number of completed tasks
    const totalTasks = 3; // Total number of tasks
    const expectedWidthInPixels = (completedTasks / totalTasks) * 100; // Percentage (0 to 100%)


    // Log the actual width for debugging
    console.log("Actual Progress Bar Width Percentage:", progressBarWidthPercentage);
    console.log("Expected Progress Bar Width Percentage:", expectedWidthInPixels);

    // Check if the actual width matches the expected width
    await t.expect(progressBarWidthPercentage).eql(expectedWidthInPixels, "The progress bar width is not correct.");
});
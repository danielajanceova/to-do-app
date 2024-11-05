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
    // Arrange: Create 2 tasks
    await t
        .typeText(Selector("#todo-input"), "Task 1")
        .click(Selector(".todo-form button[type='submit']"))
        .typeText(Selector("#todo-input"), "Task 2")
        .click(Selector(".todo-form button[type='submit']"));

    // Act: Mark one task as completed
    await t
        .click(Selector("#todo-list .todo-item").withText("Task 1").find(".toggle-checkbox"));

    // Wait for UI to update
    await t.wait(100); 

    // Assert: Check the progress bar width
    const completedTasks = 1; // Number of completed tasks (1 completed)
    const totalTasks = 2; // Total number of tasks
    const expectedWidthInPercentage = (completedTasks / totalTasks) * 100; // Calculate expected width in percentage

    // Get the actual width of the progress bar
    const progressBar = Selector("#progress-bar"); // Select the progress bar
    const progressBarWidthPercentage = await progressBar.getAttribute('style').then(style => {
        const widthMatch = style.match(/width:\s*(\d+(\.\d+)?)%/);
        return widthMatch ? parseFloat(widthMatch[1]) : 0; // Extract and return the width value
    });

    // Log the actual and expected widths for debugging
    console.log("Actual Progress Bar Width Percentage:", progressBarWidthPercentage);
    console.log("Expected Progress Bar Width Percentage:", expectedWidthInPercentage);

    // Check if the actual width matches the expected width
    await t.expect(progressBarWidthPercentage).eql(expectedWidthInPercentage, "The progress bar width is not correct.");
});
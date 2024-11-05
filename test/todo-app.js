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
    // Arrange: 
    await t
        .typeText(Selector("#todo-input"), "Task 1") 
        .click(Selector(".todo-form button[type='submit']"));

    await t
        .typeText(Selector("#todo-input"), "Task 2") 
        .click(Selector(".todo-form button[type='submit']"));

    await t
        .typeText(Selector("#todo-input"), "Task 3") 
        .click(Selector(".todo-form button[type='submit']"));

    // Act: Mark two tasks as completed
    await t
        .click(Selector("#todo-list .todo-item").withText("Task 1").find(".toggle-checkbox")) 
        .click(Selector("#todo-list .todo-item").withText("Task 2").find(".toggle-checkbox")); 

    // Wait for UI to update
    await t.wait(100); 

    // Assert: Check the progress bar width
    const completedTasks = 2; // Number of completed tasks
    const totalTasks = 3; // Total number of tasks
    const progressBarWidth = 400; // Maximum width of the progress bar in pixels
    const expectedWidthInPixels = (completedTasks / totalTasks) * progressBarWidth; // Calculate expected width

    const progressBar = Selector("#progress-bar"); // Select the progress bar
    const actualWidth = await progressBar.clientWidth; // Get the actual width of the progress bar

    // Log the actual width for debugging
    console.log("Actual Width:", actualWidth);
    console.log("Expected Width:", expectedWidthInPixels);

    // Check if the actual width matches the expected width
    await t.expect(actualWidth).eql(expectedWidthInPixels, "The progress bar width is not correct.");
});

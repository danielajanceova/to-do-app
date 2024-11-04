import { Selector } from "testcafe";

fixture("ToDo app tests")
    .page("http://test.danielajanceova.com/todo/");

// Test for adding a ToDo item
test("Adding a ToDo item", async t => {
    await t
        .typeText(Selector("#todo-input"), "Finish BDE")
        .click(Selector(".todo-form button[type='submit']"))
        .expect(Selector("#todo-list").childElementCount).eql(1) // Expect 1 item to be added
        .expect(Selector("#todo-list .todo-item").withText("Finish BDE").exists).ok(); // Check if the item exists
});



// Test for updating priority
test("Updating a ToDo priority", async t => {
    await t
        .typeText(Selector("#todo-input"), "Priority task")
        .click(Selector(".todo-form button[type='submit']"));

    const priorityDropdown = Selector("#todo-list .todo-item .priority-dropdown");

    await t
        .click(priorityDropdown)
        .click(priorityDropdown.find("option").withText("High")) // Select "High" priority
        .expect(priorityDropdown.value).eql("High"); // Verify the priority is set to "High"
});

// Test pre tlačidlo Clear Completed
test("Clearing completed ToDos", async t => {
    await t
        .typeText(Selector("#todo-input"), "Complete task")
        .click(Selector(".todo-form button[type='submit']"))
        .click(Selector("#todo-list .todo-item .toggle-checkbox")) // Označí úlohu ako dokončenú
        .click(Selector("#clearCompleted")) // Klikne na Clear Completed
        .expect(Selector("#todo-list .todo-item").withText("Complete task").exists).notOk(); // Overí, že úloha je odstránená
});


// Test for progress bar reflecting completed tasks correctly
test("Progress bar reflects completed tasks correctly", async t => {
    // Add tasks
    await t
        .typeText(Selector("#todo-input"), "Task 1")
        .click(Selector(".todo-form button[type='submit']"))
        .expect(Selector("#todo-list").childElementCount).eql(1);

    await t
        .typeText(Selector("#todo-input"), "Task 2")
        .click(Selector(".todo-form button[type='submit']"))
        .expect(Selector("#todo-list").childElementCount).eql(2);

    await t
        .typeText(Selector("#todo-input"), "Task 3")
        .click(Selector(".todo-form button[type='submit']"))
        .expect(Selector("#todo-list").childElementCount).eql(3);

    // Mark some tasks as completed
    await t
        .click(Selector("#todo-list .todo-item").withText("Task 1").find(".toggle-checkbox")) // Mark "Task 1" as completed
        .click(Selector("#todo-list .todo-item").withText("Task 2").find(".toggle-checkbox")); // Mark "Task 2" as completed

    // Expected calculations
    const completedTasks = 2; // Completed tasks
    const totalTasks = 3; // Total tasks
    const expectedPercentage = (completedTasks / totalTasks) * 100; // Calculate percentage
    const progressBarWidth = 400; // Maximum width of the progress bar in pixels
    const expectedWidthInPixels = (completedTasks / totalTasks) * progressBarWidth; // Expected width in pixels

    // Verify progress bar width
    const progressBar = Selector("#progress-bar");
    await t
        .expect(progressBar.getStyleProperty("width")).eql(`${expectedWidthInPixels}px`); // Check if progress bar width matches expected value

    // Verify displayed percentage
    const percentageDisplay = Selector("#percentage-display"); // Update with the actual selector for the percentage display element
    await t
        .expect(percentageDisplay.innerText).eql(`${expectedPercentage.toFixed(2)}%`); // Check if displayed percentage matches expected value
});




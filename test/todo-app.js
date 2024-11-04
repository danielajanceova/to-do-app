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


// Test pre progress bar
test("Progress bar reflects completed tasks correctly", async t => {
    // Pridanie úloh
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

    // Označenie niektorých úloh ako dokončených
    await t
        .click(Selector("#todo-list .todo-item").withText("Task 1").find(".toggle-checkbox")) // Označ úlohu "Task 1" ako dokončenú
        .click(Selector("#todo-list .todo-item").withText("Task 2").find(".toggle-checkbox")); // Označ úlohu "Task 2" ako dokončenú

    // Očakávané percento dokončených úloh
    const completedTasks = 2; // Dokončené úlohy
    const totalTasks = 3; // Celkové úlohy
    const expectedPercentage = (completedTasks / totalTasks); // Vypočítaj percento
    const progressBarWidth = 400; // Maximálna šírka progress baru v pixeloch
    const expectedWidthInPixels = expectedPercentage * progressBarWidth; // Očakávaná šírka v pixeloch

    // Overenie šírky progress baru
    const progressBar = Selector("#progress-bar");
    await t
        .expect(progressBar.getStyleProperty("width")).eql(`${expectedWidthInPixels}px`); // Skontroluj, či sa šírka progress baru zhoduje s očakávanou hodnotou
});



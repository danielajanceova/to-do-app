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
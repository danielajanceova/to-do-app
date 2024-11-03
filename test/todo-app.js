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



// Test for removing a ToDo item
test("Removing a ToDo item", async t => {
    await t
        .typeText(Selector("#todo-input"), "Buy groceries")
        .click(Selector(".todo-form button[type='submit']"))
        .expect(Selector("#todo-list").childElementCount).eql(1) // Expect 1 item to be added
        .click(Selector("#todo-list .todo-item").withText("Buy groceries").find(".delete")) // Assuming there's a delete button
        .expect(Selector("#todo-list").childElementCount).eql(0); // Expect 0 items after deletion
});



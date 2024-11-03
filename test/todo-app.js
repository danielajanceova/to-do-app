import { Selector } from "testcafe";

fixture("ToDo app tests")
    .page("http://test.danielajanceova.com/todo/");

test("Adding items", async t => {
    // Arrange + Act
    await t
        .typeText(Selector("#todo-input"), "Finish BDE")
        .click(Selector(".todo-form button[type='submit']"));

    // Assert
    await t
        .expect(Selector("#todo-list").childElementCount).eql(2); // Corrected from `egl` to `eql`
});

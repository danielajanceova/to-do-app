import { Selector } from "testcafe"

fixture ("ToDo app tests")
.page("http://test.danielajanceova.com/todo/")

test ("Adding items",async t => {
    await t
    //Arrange + Act
    .typeText(Selector("#todo-input"), "Finish BDE")
    .click(Selector(".todo-form button[type='submit']"))
    typeText(Selector("#todo-input"), "Finish BDE")
    click(Selector(".todo-form button [type='submit']"))
    //Assert
    .expect(Selector("#todo-list").childElementCount).egl(2);
})
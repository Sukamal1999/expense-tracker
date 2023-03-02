const categoryElement = document.getElementById('category');
const amountElement = document.getElementById('amount');
const addExpenseButton = document.getElementById('add-expense');
const expenseTable = document.getElementById('expense-table');
const totalAmountElement = document.getElementById('total-amount');

let expenses = getExpensesFromStorage() || [];

function addExpenseToTable(expense) {
    const row = document.createElement('tr');

    const categoryCell = document.createElement('td');
    categoryCell.textContent = expense.category;
    row.appendChild(categoryCell);

    const amountCell = document.createElement('td');
    amountCell.textContent = expense.amount.toFixed(2);
    row.appendChild(amountCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        editExpense(expense);
    });
    actionsCell.appendChild(editButton);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteExpense(expense);
    });
    actionsCell.appendChild(deleteButton);
    
    row.appendChild(actionsCell);
    
    expenseTable.tBodies[0].appendChild(row);
}

function addExpense() {
const category = categoryElement.value;
const amount = parseFloat(amountElement.value);
if (!category || isNaN(amount)) {
    alert('Please enter a valid category and amount.');
    return;
}

const expense = {
    category,
    amount
};

expenses.push(expense);
addExpenseToTable(expense);
saveExpensesToStorage();
updateTotalAmount();

}

function editExpense(expense) {
const index = expenses.indexOf(expense);
if (index !== -1) {
const newAmount = prompt('Enter a new amount for this expense:', expense.amount);
if (newAmount !== null) {
const amount = parseFloat(newAmount);
if (!isNaN(amount)) {
expenses[index].amount = amount;
expenseTable.tBodies[0].innerHTML = '';
expenses.forEach((expense) => {
addExpenseToTable(expense);
});
saveExpensesToStorage();
updateTotalAmount();
} else {
alert('Please enter a valid amount.');
}
}
}
}

function deleteExpense(expense) {
const index = expenses.indexOf(expense);
if (index !== -1) {
expenses.splice(index, 1);
expenseTable.tBodies[0].removeChild(expenseTable.tBodies[0].children[index]);
saveExpensesToStorage();
updateTotalAmount();
}
}

function updateTotalAmount() {
const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
totalAmountElement.textContent = totalAmount.toFixed(2);
}

function saveExpensesToStorage() {
localStorage.setItem('expenses', JSON.stringify(expenses));
}

function getExpensesFromStorage() {
const expensesString = localStorage.getItem('expenses');
return expensesString ? JSON.parse(expensesString) : null;
}

addExpenseButton.addEventListener('click', addExpense);

expenses.forEach((expense) => {
addExpenseToTable(expense);
});

updateTotalAmount();

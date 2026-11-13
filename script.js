// ==========================================
// Premium Expense Tracker
// Part 3A
// ==========================================

const en = document.getElementById("en");
const a = document.getElementById("a");
const c = document.getElementById("c");
const date = document.getElementById("date");

const addexpenses = document.getElementById("addexpenses");

const te = document.getElementById("te");
const l = document.getElementById("l");

const toast = document.getElementById("toast");
const emptyRow = document.getElementById("emptyRow");

// ==========================================
// Variables
// ==========================================

let totalExpense = 0;
let editRow = null;

// Today's date

date.valueAsDate = new Date();

// ==========================================
// Button Event
// ==========================================

addexpenses.addEventListener("click", () => {

    const name = en.value.trim();
    const amount = Number(a.value);
    const category = c.value;
    const expenseDate = date.value;

    // Validation

    if (
        name === "" ||
        amount <= 0 ||
        expenseDate === ""
    ) {

        showToast("Please fill all fields.");

        return;
    }

    // ===========================
    // UPDATE EXISTING ROW
    // ===========================

    if (editRow) {

        const previousAmount = Number(
            editRow.children[2].dataset.amount
        );

        totalExpense -= previousAmount;
        totalExpense += amount;

        editRow.children[1].textContent = name;

        editRow.children[2].textContent = "₹ " + amount;
        editRow.children[2].dataset.amount = amount;

        editRow.children[3].textContent = category;

        editRow.children[4].textContent = expenseDate;

        te.textContent = totalExpense;

        te.classList.add("total-animation");

        setTimeout(() => {

            te.classList.remove("total-animation");

        }, 350);

        showToast("Expense Updated");

        addexpenses.textContent = "➕ Add Expense";

        editRow = null;

        clearForm();

        return;

    }

    // ===========================
    // CREATE ROW
    // ===========================

    const tr = document.createElement("tr");

    tr.classList.add("fade-up");

    const tdNo = document.createElement("td");

    const tdName = document.createElement("td");

    const tdAmount = document.createElement("td");

    const tdCategory = document.createElement("td");

    const tdDate = document.createElement("td");

    const tdAction = document.createElement("td");

    tdNo.textContent = l.querySelectorAll("tr").length;

    tdName.textContent = name;

    tdAmount.textContent = "₹ " + amount;

    tdAmount.dataset.amount = amount;

    tdCategory.textContent = category;

    tdDate.textContent = expenseDate;

    // ===========================
    // Edit Button
    // ===========================

    const editBtn = document.createElement("button");

    editBtn.textContent = "✏ Edit";

    editBtn.className = "edit-btn";

    editBtn.addEventListener("click", () => {

        en.value = tdName.textContent;

        a.value = tdAmount.dataset.amount;

        c.value = tdCategory.textContent;

        date.value = tdDate.textContent;

        editRow = tr;

        addexpenses.textContent = "💾 Update Expense";

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    // ===========================
    // Delete Button
    // ===========================

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "🗑 Delete";

    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {

        deleteExpense(
            tr,
            Number(tdAmount.dataset.amount)
        );

    });

    tdAction.append(editBtn);

    tdAction.append(deleteBtn);

    tr.append(
        tdNo,
        tdName,
        tdAmount,
        tdCategory,
        tdDate,
        tdAction
    );

    // Remove empty row

    if (emptyRow) {

        emptyRow.remove();

    }

    l.prepend(tr);

    totalExpense += amount;

    te.textContent = totalExpense;

    te.classList.add("total-animation");

    setTimeout(() => {

        te.classList.remove("total-animation");

    }, 350);

    clearForm();

    updateSerialNumbers();

    showToast("Expense Added");

});
// ==========================================
// Delete Expense
// ==========================================

function deleteExpense(row, amount) {

    if (!confirm("Are you sure you want to delete this expense?")) {
        return;
    }

    row.classList.add("remove");

    setTimeout(() => {

        row.remove();

        totalExpense -= amount;

        if (totalExpense < 0) {
            totalExpense = 0;
        }

        te.textContent = totalExpense;

        te.classList.add("total-animation");

        setTimeout(() => {
            te.classList.remove("total-animation");
        }, 350);

        updateSerialNumbers();

        // Show empty state if table is empty

        if (l.children.length === 0) {

            const tr = document.createElement("tr");

            tr.id = "emptyRow";

            const td = document.createElement("td");

            td.colSpan = 6;

            td.className = "empty-state";

            td.textContent = "📂 No expenses added yet.";

            tr.appendChild(td);

            l.appendChild(tr);

        }

        showToast("Expense Deleted");

    }, 350);

}

// ==========================================
// Clear Form
// ==========================================

function clearForm() {

    en.value = "";

    a.value = "";

    c.selectedIndex = 0;

    date.valueAsDate = new Date();

    en.focus();

}

// ==========================================
// Update Serial Numbers
// ==========================================

function updateSerialNumbers() {

    const rows = l.querySelectorAll("tr");

    let count = 1;

    rows.forEach((row) => {

        if (row.id === "emptyRow") return;

        row.children[0].textContent = count++;

    });

}

// ==========================================
// Toast Notification
// ==========================================

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// ==========================================
// Optional Keyboard Shortcut
// Press Enter to Add Expense
// ==========================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        addexpenses.click();

    }

});

// ==========================================
// Initial Focus
// ==========================================

window.addEventListener("load", () => {

    en.focus();

});
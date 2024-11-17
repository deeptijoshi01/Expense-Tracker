const balance = document.getElementById(
    "balance"
);

const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const Form = document.getElementById('Form');
const Text = document.getElementById('Text');
const Amount = document.getElementById('Amount');



const localStorageTransactions = JSON.parse(localStorage.getItem("Transactions"));

let Transactions =localStorage.getItem("Transactions") !== null ? localStorageTransactions: [];

//ADD TRANSACTION
function addTransaction(e){
    e.preventDefault();
    if(
        Text.value.trim() === "" || Amount.value.trim() === ""  
    ){
        alert("Please Enter Text and value");
    }else {
        const Transaction ={
            id:generateID(),
            Text:Text.value,
            Amount: +Amount.value,
        };
        Transaction.push(Transaction);
        addTransactionDOM(Transaction);
        updateLocalStorage();
        updateValues();
        Text.value = "";
        Amount.value = "";

    }
}

//GENERATE ID
function generateID(){
    return Math.floor(Math.random()*100000000);
}

function addTransactionDOM(Transaction) {
    const sign = Transaction.Amount < 0 ? "-" : "+";
    const item = document.createElement("li");

item.classList.add(
    Transaction.Amount < 0 ? "minus" : "plus"
);

item.innerHTML = `
${Transaction.Text}<span>${sign}${Math.abs(
    Transaction.Amount
)}</span>
   <button class ="delete-btn" onclick="removeTransaction(${
    Transaction.id
   })">x</button>
`;

list.appendChild(item);
}

//REMOVE TRANSACTION
function removeTransaction(id){
    Transactions = Transactions.filter(Transaction => Transaction.id !== id);
    updateLocalStorage();
    Init();
}

//UPDATE VALUES

function updateValues(){
    const AmountS = Transactions.map((Transaction) => Transaction.Amount);
    const total = Amounts.reduce((acc,item) => (acc +=item),0).toFixed(2);
    const income = Amounts.filter(item => item > 0).reduce((acc,item)=> (acc += item),0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc,item) => (acc += item), 0)* -1
    ).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
}
//UPDATE LOCAL STORAGE
function updateLocalStorage() {
localStorage.setItem(
    "transactions",
    JSON.stringify(Transactions)
);
}
//INIT APP
function Init(){
list.innerHTML="";
Transactions.forEach(addTransactionDOM);
updateValues();
}
addTransactionDOM(Transactions);

axios.defaults.headers.common['Authentication'] = localStorage.getItem('token')


const addBtn = document.querySelector('#add');

addBtn.addEventListener('click',async e=>{
    e.preventDefault();
    const expenseData = {
        expense : document.querySelector('#expense').value,
        description : document.querySelector('#description').value,
        category : document.querySelector('#category').value
    }

    if (expenseData.expense.length<1) {
        alert('Expense is required')
    }
    else if(expenseData.description.length<1){
        alert('Description is required')
    }
    else if(expenseData.category.length<1){
        alert('Category is required')
    }
    else{
        const {data }= await axios.post("http://localhost:5000/api/expense/addexpense",expenseData)
        console.log(data)
    }
    location.reload()
});


const deleteExpense = async (id) =>{
    await axios.delete(`http://localhost:5000/api/expense/deleteexpense/${id}`)
    console.log('delete')
    location.reload()
}

window.addEventListener("load", loadExpense)
const expenseTable = document.querySelector('#expenseTable')

async function loadExpense(){
    const {data} = await axios.get("http://localhost:5000/api/expense/getexpense")
    console.log(data)
    data.forEach(i=>{
       
        expenseTable.innerHTML += `<tr><td>${i.expense}</td><td>${i.description}</td><td>${i.category}</td><td><button onclick="deleteExpense(${i.id})" class="btn btn-close"></button></td></tr>`
    })

}




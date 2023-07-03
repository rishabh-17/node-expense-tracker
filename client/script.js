
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

const rzp = document.querySelector('#rzp')
rzp.onclick = async e =>{
    console.log('wertyuio')
    const response = await axios.get("http://localhost:5000/api/payment/premium")
    console.log(response)
    const options = {
        "key": response.data.key_id,
        order_id: response.data.order.id,
        handler : async function(response) {
            console.log(options.order_id)
            await axios.post("http://localhost:5000/api/payment/updatetransaction",{
                
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            })
            console.log('success')
            alert("YOu are Premium member now!")
            const user = parseJwt(localStorage.getItem('token'))
            const { data }= await axios.post("http://localhost:5000/api/auth/login",user)
            console.log(data.token)
            localStorage.setItem("token",data.token)
            rzp.style.display = "none"
            document.querySelector("#message").textContent = "you are premium user"
        }
    }


const rzp1 = new Razorpay(options)
rzp1.open()
e.preventDefault()


rzp1.on('payment.failure', (response) => {
    console.log(response)
    alert('Something went wrong')
})
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const showLeaderboard = async () =>{
    console.log('leaderboard')
    const users = await axios.get("http://localhost:5000/api/premium/leaderboard")
    users.data.forEach(user=>{
        document.querySelector('#leaderboard').innerHTML = `Name - ${user.name} || Expense - ${user.expense}`

    })
}

window.addEventListener('DOMContentLoaded',()=>{
    const decodedToken = parseJwt(localStorage.getItem('token'))
    console.log(decodedToken);
    if ( decodedToken.isPremiumUser){
        rzp.style.display = "none"
        document.querySelector("#message").textContent = "you are premium user"
        document.querySelector('body').innerHTML += '<button onclick="showLeaderboard()" id="">Leaderboard</button>'
        

    }
})



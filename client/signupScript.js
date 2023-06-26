const submitBtn = document.querySelector("#signup");

submitBtn.addEventListener("click",async e=>{
    e.preventDefault();
    const user = {
        name : document.querySelector('#name').value,
        email : document.querySelector('#email').value,
        password : document.querySelector('#password').value,
        confirmPassword : document.querySelector('#confirmPassword').value
    }
    if (user.password!==user.confirmPassword && user.password.length<1) {
        con
        alert('Password and Confirm Password should be the same')
    }
    else if(user.name.length<4){
        alert('User name must be at least 4 characters')
    }
    else{
        const {data }= await axios.post("http://localhost:5000/api/auth/signup",user)
        if (data.signup){
            alert(data.msg)
        }
        else{
            alert(data.msg)
            console.log(data.user)
        }

    }
})
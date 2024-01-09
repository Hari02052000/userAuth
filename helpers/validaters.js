

async function validateUser(username,password,email,phone){
    

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    const phoneRegex = /^[6-9]\d{9}$/;
    const isValidPhone = phoneRegex.test(phone);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   const isValidPassword = passwordRegex.test(password);



   return{isValidEmail,isValidPhone,isValidPassword}



}


module.exports = {validateUser}
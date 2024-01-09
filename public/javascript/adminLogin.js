const LoginForm = document.getElementById('LoginForm')

LoginForm.addEventListener('submit',async(e)=>{

    e.preventDefault()
    document.getElementById('err').innerHTML = ''

    const formdata = new FormData(LoginForm)
    const email = formdata.get('email');
    const password = formdata.get('password');

    let res = await fetch('/admin/login',{
        method:'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'    
       },
          body: new URLSearchParams({ email,password })
   
    })
    const resdata = await res.json()
    if(resdata.err){

        document.getElementById('err').innerHTML = resdata.err
    }
    else{
        
        window.location.href = '/admin'
    }
})

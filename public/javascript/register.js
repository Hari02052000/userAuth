
const registerForm = document.getElementById('registerForm')

registerForm.addEventListener('submit',async(e)=>{

    e.preventDefault()
    document.getElementById('err').innerHTML = ''

    const formdata = new FormData(registerForm)
    let res = await fetch('/register',{
        method:'POST',
        body:formdata
    })
    const resdata = await res.json()
    if(resdata.err){
        document.getElementById('err').innerHTML = resdata.err
    }
    else if(res.userCreated){
        window.location.href = '/'
    }
})



function test(){
    console.log('test')

}
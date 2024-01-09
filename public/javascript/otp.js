window.onload=resendOTP();

async function resendOTP() {

 document.getElementById("resend").disabled=true
  const COUNTDOWN_SECONDS = 10;
  let countdownInterval = null;
  let remainingSeconds = COUNTDOWN_SECONDS;
  countdownInterval = setInterval(async() => {
    remainingSeconds--;
    if (remainingSeconds === 0) {
      
      clearInterval(countdownInterval);
      document.getElementById("countdown-timer").innerHTML = "";
      await fetch('/resendOTP')
      document.getElementById("resend").disabled=false

    } else {

      
      document.getElementById("countdown-timer").innerHTML = `Resend OTP in ${remainingSeconds} seconds`;


    }
  }, 1000);
}

const otpForm = document.getElementById('otpForm')

otpForm.addEventListener('submit',async(e)=>{


    e.preventDefault()
    document.getElementById('err').innerHTML = ''
    const formdata = new FormData(otpForm)
    const otpValue = formdata.get('otp');
    const userid = document.getElementById('userId').innerHTML

    let res = await fetch('/verify-otp',{
        method:'POST',
        headers: {
         'Content-Type': 'application/x-www-form-urlencoded'       },
        body: new URLSearchParams({ otp: otpValue,userid })

    })
    const resdata = await res.json()
    if(resdata.err){
        document.getElementById('err').innerHTML=resdata.err
    }
    else if(resdata.verified) {
        window.location.href = '/'
    }
})

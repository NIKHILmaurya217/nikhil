const scriptURL='https://script.google.com/macros/s/AKfycbwF9JXLI3eiTq02WSRbsIQv7VW8tPTkH34b9AFUUY5nZXUb_X0HkevtIei8FfzOJfpTcw/exec'

const form = document.forms['coontact-form']

form.addEventListener('submit',e =>{
  e.preventDefault()
  fetch(scriptURL,{method:'POST' , body: new FormData(form)})
  .then(response => alert("Thank you! Your form is submitted successfully."))
  .then(() => {window.location.reload();})
  .catch(error => console.error('Error!',error.message))
})

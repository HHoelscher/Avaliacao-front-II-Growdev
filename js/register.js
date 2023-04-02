const form = document.getElementById("formRegister")
const validityEmail = document.getElementById("registerEmail")
const validityPassword = document.getElementById("registerPassword")
const validityRegPassword = document.getElementById("registerPassword")
//==

//==

function register(event) {
   event.preventDefault()

   const emailAcess = document.getElementById("registerEmail").value
   const passwordAcess = document.getElementById("registerPassword").value
   const confirmPassword = document.getElementById("confirmPassword").value

   if (!emailAcess || emailAcess.length < 12) {
      validityEmail.classList.add("is-invalid")
      return
   } else {
      validityEmail.classList.remove("is-invalid")
      validityEmail.classList.add("is-valid")
   }

   if (
      !passwordAcess ||
      !confirmPassword ||
      confirmPassword !== passwordAcess ||
      passwordAcess.length < 3
   ) {
      validityPassword.classList.add("is-invalid")
      validityRegPassword.classList.add("is-invalid")
      return
   }

   const user = {
      id: Math.floor((1 + Math.random()) * 0x10000)
         .toString(16)
         .substring(1),
      email: emailAcess,
      password: passwordAcess,
   }
   salvarUsuario(user)
}

function salvarUsuario(receivedUser) {
   let users = []

   const localStorageUsers = JSON.parse(localStorage.getItem("users"))

   if (!!localStorageUsers && localStorageUsers.length)
      users = localStorageUsers

   if (users.length) {
      const emailAlreadyExists = users.some(
         (user) => user.email === receivedUser.email
      )

      if (emailAlreadyExists) {
         alert("Este e-mail já foi cadastrado.")
         return
      }
   }

   users.push(receivedUser)
   localStorage.setItem("users", JSON.stringify(users))

   window.location.href = "index.html"
}

function backToLogin() {
   window.location.href = "/"
}
function showToast(modo, alerta) {
   const toastContainer = document.createElement("div")
   toastContainer.setAttribute(
      "class",
      "toast align-items-center border-0 show"
   )
   toastContainer.setAttribute("role", "alert")
   toastContainer.setAttribute("aria-live", "assertive")
   toastContainer.setAttribute("aria-atomic", "true")
   toastContainer.classList.add(`text-bg-${modo}`)

   const divFlex = document.createElement("div")
   divFlex.setAttribute("class", "d-flex")

   const toastBody = document.createElement("div")
   toastBody.setAttribute("class", "toast-body")
   toastBody.innerHTML = `${alerta}`

   const toastButton = document.createElement("button")
   toastButton.setAttribute("type", "button")
   toastButton.setAttribute("data-bs-dismiss", "toast")
   toastButton.classList.add("btn-close", "btn-close-white", "me-2", "m-auto")

   divFlex.appendChild(toastBody)
   divFlex.append(toastButton)
   toastContainer.appendChild(divFlex)

   notify.appendChild(toastContainer)
}

function accept() {
   showToast("success", "Cadastro efetuado com sucesso!")
   return
}
///

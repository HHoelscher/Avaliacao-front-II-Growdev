function signUp(event) {
   event.preventDefault()
   const email = document.getElementById("emailLogin").value
   const password = document.getElementById("passwordLogin").value

   if (!email) {
      alert("E-mail inválido!")
      return
   }
   if (!password) {
      alert("Senha inválida!")
      return
   }

   const user = getUserByEmail(email)

   if (password !== user.password) {
      return alert("Senha incorreta.")
   }
   window.location.href = "messages.html"
   localStorage.setItem("currentUser", JSON.stringify(user))
}

function getUserByEmail(email) {
   const users = JSON.parse(localStorage.getItem("users"))

   // users: null | [] | undefined
   // Boolean(users) = true | false
   // Boolean(null) = false | Boolean([]) = true

   if (Boolean(users) && users.length) {
      const userByEmail = users.find((user) => user.email === email)

      if (!userByEmail) {
         clearFields()
         return alert("Usuário não cadastrado.")
      }

      return userByEmail
   }

   return alert("Usuário não cadastrado.")
}

//// limpar campos
function clearFields() {
   const loginField = document.getElementById("emailLogin")
   const passwordField = document.getElementById("passwordLogin")

   loginField.value = ""
   passwordField.value = ""
}

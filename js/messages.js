//utilizar o email cadastrado como chave para os recados
let list = document.getElementById("listMessages")
const messages = JSON.parse(localStorage.getItem("messages")) || []
const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const rowCard = document.getElementById("messageCard")
const form = document.getElementById("formMessage")
//==
const titleEdit = document.getElementById("titleEdit")
const descriptionEdit = document.getElementById("descriptionEdit")

//criar mensagem ======================================================
function createMessage(event) {
   event.preventDefault()

   const title = document.getElementById("message").value
   const description = document.getElementById("description").value

   if (!currentUser) {
      window.location.href = "index.html"
      return alert("O usuário precisa estar logado para criar um recado!")
   }
   if (!form.checkValidity()) {
      form.classList.add("was-validated")
      return
   }

   if (title === "") {
      return alert("Você precisa preencher o campo obrigatório!")
   }

   const message = {
      id: nextID(),
      userId: currentUser.id,
      title,
      description,
   }
   // let messages = []
   // const localStorageMessages = JSON.parse(localStorage.getItem("messages"))

   // if (!!localStorageMessages && localStorageMessages.length)
   //   messages = localStorageMessages

   messages.push(message)
   saveMessage(messages)
   localStorage.setItem("lastID", message.id)
   clearFields()
   location.reload()
   accept()
}

listMessages()
///////////////////////////////////////////////

//limpar campos ===============================================================

function clearFields() {
   const title = document.getElementById("message")
   const description = document.getElementById("description")

   title.value = ""
   description.value = ""
}

function logOut() {
   window.location.href = "index.html"
}

///////////////////////////////////////////////

///createElement

function listMessages() {
   messages
      .filter((message) => message.userId === currentUser.id)
      .forEach((message) => {
         const newCard = document.createElement("div")
         newCard.classList.add("col-12", "col-md-6", "col-lg-4")

         const messageCard = document.createElement("div")
         messageCard.classList.add("card")

         const messageBody = document.createElement("div")
         messageBody.classList.add("card-body")

         const messageTitle = document.createElement("h5")
         messageTitle.classList.add("card-title")
         messageTitle.innerHTML = ` <i class="bi bi-pin-angle-fill"></i> ${message.id} - ${message.title}`

         const messageText = document.createElement("p")
         messageText.classList.add("card-text")
         messageText.innerHTML = `${message.description}`

         const buttonEdit = document.createElement("button")
         buttonEdit.classList.add("btn", "bg-success", "mx-2")
         buttonEdit.setAttribute("data-bs-toggle", "modal")
         buttonEdit.setAttribute("data-bs-target", "#editMessage")
         buttonEdit.setAttribute("onclick", `editMessage(${message.id})`)
         buttonEdit.innerHTML = `Editar <i class="bi bi-pencil-square"></i>`

         const buttonDelete = document.createElement("button")
         buttonDelete.classList.add("btn", "bg-danger")
         buttonDelete.setAttribute("onclick", `removeMessage(${message.id})`)
         buttonDelete.innerHTML = `Deletar <i class="bi bi-trash-fill"></i></i>`

         messageCard.appendChild(messageBody)
         messageBody.appendChild(messageTitle)
         messageBody.appendChild(messageText)
         messageBody.appendChild(buttonEdit)
         messageBody.appendChild(buttonDelete)
         newCard.appendChild(messageCard)
         rowCard.appendChild(newCard)
      })
}
// deletar mensagem ===========================================================
function removeMessage(messageId) {
   const index = getMessageID(messageId)
   console.log(index)
   if (index === -1) {
      alert("Não foi encontrada a mensagem que você deseja excluir")
      return
   }

   messages.splice(index, 1)

   saveMessage(messages)
   listMessages()
   deny()
   location.reload()
}

// editar mensagem ===========================================================
function editMessage(messageId) {
   const message = messages.find((message) => message.id === message.id)

   titleEdit.value = message.title
   descriptionEdit.value = message.description

   titleEdit.focus()
}
function update(event) {
   event.preventDefault()
   const message = messages.find((message) => message.id === message.id)

   const titleFieldValue = titleEdit.value
   const descriptionFieldValue = descriptionEdit.value

   if (titleFieldValue !== message.title) {
      message.title = titleFieldValue
   }
   if (descriptionFieldValue !== message.description) {
      message.description = descriptionFieldValue
   }

   localStorage.setItem("messages", JSON.stringify(messages))
   location.href = "messages.html"

   alert("Recado alterado com sucesso.")
}

//funcoes complementares ======================================================
function getMessageID(messageId) {
   return messages.findIndex((message) => message.id === messageId)
}

function nextID() {
   let lastID = Number(localStorage.getItem("lastID") || "0")
   return ++lastID
}

function saveMessage() {
   localStorage.setItem("messages", JSON.stringify(messages))
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
   showToast("success", "Recado criado com sucesso")
   return
}
function deny() {
   showToast("danger", "Recado excluído com sucesso!")
   return
}

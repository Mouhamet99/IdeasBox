import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTQxMzY5MCwiZXhwIjoxOTU0OTg5NjkwfQ._5hhSg_jA0QXVgB92S5f51M3vpfDKdnjJyHRstSDj0I';
// https://ixiwdzxiyrsjgjnrkqvi.supabase.co
const SUPABASE_URL = "https://vojmxofbencchhiyqmiu.supabase.co"

const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY);

window.onload = (e) => {

   const IDEAS_LIST = [
      { id: 1, title: "Brief", idea: " 2 jours de plus pour le brief X", validate: false },
      { id: 2, title: "organisation", idea: "Ne parler que sur discord en classe", validate: false },
      { id: 3, title: "softSkills", idea: "Parler en anglais ", validate: false },
   ];

   const createCard = (ideaObject) => {
      const element = ` <div class="col py-3  "><div class="card animate__animated animate__tada bg-light border-0 shadow-md rounded" data-id="${ideaObject.id}"><div class="card-body"><h6 class="card-subtitle mb-2 text-muted"> ${ideaObject.title}</h6><p class="card-text">${ideaObject.idea}</p><div class="d-flex align-items-center justify-content-between"><a href="#" class="btn btn-secondary btn-sm fs-x-small">Approuver</a><a href="#" class="btn btn-outline-secondary btn-sm fs-x-small">Refuser</a></div></div></div></div>`
      document.querySelector('#ideas_container').insertAdjacentHTML("beforeend", element)
   }
   IDEAS_LIST.forEach((ideaObject) => {
      createCard(ideaObject)
   })

   let form = document.querySelector('form')
   let proposition = document.querySelector('#propositions')
   let title = document.querySelector('#titre')

   /********************************/
   /*On submit form */
   /********************************/
   const titleInput = document.querySelector('#titre')
   const propositionTitle = document.querySelector('#proposition')
   form.addEventListener('submit', (event) => {
      event.preventDefault()

      if (titleInput.value.trim() != "" && propositionTitle.value.trim() != "") {

         const newIdeaObj = {
            id: IDEAS_LIST.length + 1,
            title: titleInput.value,
            idea: propositionTitle.value,
            validate: false
         }

         IDEAS_LIST.push(newIdeaObj)
         createCard(newIdeaObj)
         form.reset()

      }

   })
   propositionTitle.addEventListener('input', () => {
      const maxLength = 130
      let progress = document.querySelector('#text-progress')
      let indicator = document.querySelector('#text-limit')
      let submitButton = document.querySelector('[type="submit"]')
      submitButton.disabled = false
      progress.innerText = propositionTitle.value.length

      if (maxLength - propositionTitle.value.length <= 0) {
         progress.classList.remove('text-warning')
         indicator.classList.add('text-danger')
         submitButton.disabled = true

      } else if (maxLength - propositionTitle.value.length <= 16) {
         progress.classList.add('text-warning')
         submitButton.disabled = true

      } else {
         progress.classList.remove('text-warning')
         indicator.classList.remove('text-danger')
      }

   })




}
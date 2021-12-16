// import { createClient } from './@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
// const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM5NTg3NzY5LCJleHAiOjE5NTUxNjM3Njl9.UN1MoxDyGImGKfDdi5BJMTF85vEKCY2RzhgG12aF9Uo';
const SUPABASE_URL = "https://ixiwdzxiyrsjgjnrkqvi.supabase.co/rest/v1/ideas"

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.onload = () => {

   const IDEAS_LIST = [
      { title: "Brief", idea: " 2 jours de plus pour le brief X", evaluate: false },
      { title: "organisation", idea: "Ne parler que sur discord en classe", evaluate: false },
      { title: "softSkills", idea: "Parler en anglais ", evaluate: false },
   ];

   const createCard = (ideaObject) => {
      const element0 = ` <div class="col py-3  "><div class="card animate__animated animate__tada bg-light border-0 shadow-md rounded" data-id="${ideaObject.id}"><div class="card-body"><h6 class="card-subtitle mb-2 text-muted"> ${ideaObject.title}</h6><p class="card-text">${ideaObject.idea}</p><div class="d-flex align-items-center justify-content-between"><a href="#" class="btn btn-secondary btn-sm fs-x-small">Approuver</a><a href="#" class="btn btn-outline-secondary btn-sm fs-x-small">Refuser</a></div></div></div></div>`
      const element = 
      `<div class="col py-3">
      <div class="card animate__animated animate__tada bg-light border-0 shadow-md rounded" data-id="${ideaObject.id}">
      <div class="card-body"><h6 class="card-subtitle mb-2 text-muted"> ${ideaObject.title}</h6>
            <p class="card-text">${ideaObject.idea}</p>
            <div class="d-flex align-items-center justify-content-between">
               <a href="#" class="btn btn-success btn-sm accept-btn" id="accept-btn-${ideaObject.id}" title="accept button">
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
               </a>
               <a href="#" class="btn btn-danger btn-sm reject-btn" id="reject-btn-${ideaObject.id}" title="reject button">
                  <i class="fa fa-ban" aria-hidden="true"></i>
               </a>
            </div>
         </div>
      </div>
   </div>`
      document.querySelector('#ideas_container').insertAdjacentHTML("beforeend", element)
   }
   const InsertIdea = async (newIdeaObj) => {
      try {
         let response = await fetch(SUPABASE_URL, {
            method: "POST",
            headers: {
               "apiKey": SUPABASE_KEY,
               'Content-Type': "application/json;charset=utf-8",
               'Authorization': `Bearer ${SUPABASE_KEY}`,
               'Prefer': 'return=representation',
            },
            body: JSON.stringify(newIdeaObj),
         })
         return response

      } catch (error) {
         console.log("Error in Insert", error)
      }

   }
   const getAllIdeas = async (newIdeaObj) => {
      try {
         let response = await fetch(SUPABASE_URL, {
            method: "GET",
            headers: {
               "apiKey": SUPABASE_KEY,
               'Authorization': `Bearer ${SUPABASE_KEY}`,
            },
            body: JSON.stringify(newIdeaObj),
         })
         console.log(response);
         return response
      } catch (error) {
         console.log("Error in Insert", error)
      }

   }

   getAllIdeas().then(response => response.json()).then(data => {
      console.log(data);
      console.log(data);
      data.forEach((ideaObject) => {
         createCard(ideaObject)
      })
   })

   let form = document.querySelector('form')
   let proposition = document.querySelector('#propositions')
   let title = document.querySelector('#titre')

   /********************************/
   /*On submit form */
   /********************************/
   const titleInput = document.querySelector('#titre')
   const propositionTitle = document.querySelector('#proposition')
   const rejectButtons = document.querySelectorAll('.reject-btn')
   const acceptButtons = document.querySelectorAll('.accept-btn')
   form.addEventListener('submit', (event) => {
      event.preventDefault()

      if (titleInput.value.trim() != "" && propositionTitle.value.trim() != "") {

         const newIdeaObj = {
            title: titleInput.value,
            idea: propositionTitle.value,
            evaluate: false
         }

         IDEAS_LIST.push(newIdeaObj);
         InsertIdea(newIdeaObj).then(response => response.json()).then(data => {
            console.log(data[0]);
            console.log(data[0].id);
         })

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

   rejectButtons.forEach((element)=>{
      element.addEventListener('click', ()=>{
   })
   

   })
   acceptButtons.forEach((element)=>{
      element.addEventListener('click', ()=>{
   })

   })
}

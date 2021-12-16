// import { createClient } from './@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
// const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM5NTg3NzY5LCJleHAiOjE5NTUxNjM3Njl9.UN1MoxDyGImGKfDdi5BJMTF85vEKCY2RzhgG12aF9Uo';
const SUPABASE_URL = "https://ixiwdzxiyrsjgjnrkqvi.supabase.co/rest/v1/ideas"
let IDEAS = {}
// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.onload = () => {

   const createCard = (ideaObject) => {
      // const element0 = ` <div class="col py-3  "><div class="card animate__animated animate__tada bg-light border-0 shadow-md rounded" data-id="${ideaObject.id}"><div class="card-body"><h6 class="card-subtitle mb-2 text-muted"> ${ideaObject.title}</h6><p class="card-text">${ideaObject.idea}</p><div class="d-flex align-items-center justify-content-between"><a href="#" class="btn btn-secondary btn-sm fs-x-small">Approuver</a><a href="#" class="btn btn-outline-secondary btn-sm fs-x-small">Refuser</a></div></div></div></div>`
      let classAdded = ""
      if (ideaObject.evaluate === true) {
         if (ideaObject.status === "accepted") {
            classAdded = "border-success"
         } else if (ideaObject.status === "rejected") {
            classAdded = "border-danger"
         }
      }
      const element =
         `<div class="col py-3">
      <div class="card animate__animated animate__tada bg-light shadow-md rounded-3 border ${classAdded}" data-id="${ideaObject.id}">
      <div class="card-body"><h6 class="card-subtitle mb-2 text-muted"> ${ideaObject.title}</h6>
            <p class="card-text">${ideaObject.idea}</p>
            <div class="d-flex align-items-center justify-content-between">
               <btn  class="btn btn-success btn-sm accept-btn" id="accept-btn-${ideaObject.id}"  data-accept-id="${ideaObject.id}" title="accept button">
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
               </btn>
               <btn class="btn btn-danger btn-sm reject-btn" id="reject-btn-${ideaObject.id}" data-reject-id="${ideaObject.id}" title="reject button">
                  <i class="fa fa-ban" aria-hidden="true"></i>
               </btn>
            </div>
         </div>
      </div>
   </div>`;

      document.querySelector('#ideas_container').insertAdjacentHTML("beforeend", element);
   }



   const getAllIdeas = async () => {
      try {
         let response = await fetch(SUPABASE_URL, {
            method: "GET",
            headers: {
               "apiKey": SUPABASE_KEY,
               'Authorization': `Bearer ${SUPABASE_KEY}`,
            },
         })
         console.log(response);
         return response
      } catch (error) {
         console.log("Error in Get Request", error)
      }

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
   const UpdateIdea = async (id, statusValue) => {
      try {
         let response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
            method: "PATCH",
            headers: {
               "apiKey": SUPABASE_KEY,
               'Content-Type': "application/json",
               'Authorization': `Bearer ${SUPABASE_KEY}`,
               'Prefer': 'return=representation',
            },
            body: JSON.stringify({ status: statusValue, evaluate: true }),
         })
         return response

      } catch (error) {
         console.log("Error in Update", error)
      }

   }

   getAllIdeas().then(response => response.json()).then(data => {
      IDEAS = { ...data }
      data.forEach((ideaObject) => {
         createCard(ideaObject)
      })

      //Get All accept and reject buttons
      const rejectButtons = document.querySelectorAll('.reject-btn')
      const acceptButtons = document.querySelectorAll('.accept-btn')

      //Add EventLister to  All accept and reject buttons
      rejectButtons.forEach((element) => {
         element.addEventListener('click', (e) => {
            console.log(IDEAS);
            const id = parseInt(element.dataset.rejectId)
            // let currentIdea = IDEAS.id

            UpdateIdea(id, "rejected").then(response => response.json()).then(data => {
               let cardIdea = document.querySelector(`[data-id="${id}"]`);
               cardIdea.classList.remove("border-success")
               cardIdea.classList.add("border-danger")
               // element.classList.add('border border-danger')
               
            });
         })
      })
      acceptButtons.forEach((element) => {
         element.addEventListener('click', (e) => {
            const id = parseInt(element.dataset.acceptId)
            UpdateIdea(id, "accepted").then(response => response.json()).then(data => {
               let cardIdea = document.querySelector(`[data-id="${id}"]`);
               console.log(cardIdea);
               cardIdea.classList.remove("border-danger")
               cardIdea.classList.add("border-success")
            });

         })
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

   form.addEventListener('submit', (event) => {
      event.preventDefault()

      if (titleInput.value.trim() != "" && propositionTitle.value.trim() != "") {

         const newIdeaObj = {
            title: titleInput.value,
            idea: propositionTitle.value,
            evaluate: false
         }

         // IDEAS_LIST.push(newIdeaObj);
         InsertIdea(newIdeaObj).then(response => response.json()).then(data => {
            createCard(data[0])
            form.reset()
         })


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


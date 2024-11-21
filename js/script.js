/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const itemsPerPage = 9;

/*
   Uses a for loop to cycle through the array of students that should be shown on the current page and inserts the corresponding html for each student to the student list
*/
function showPage(list, page) {

   //Student List
   const startIdx = (page * itemsPerPage) - itemsPerPage;
   const endIdx = page * itemsPerPage;
   const ul = document.querySelector('.student-list');
   ul.innerHTML = ``;
   for (let i = 0; i < list.length; i++) {
      if (i >= startIdx && i < endIdx) {
         const student = list[i];
         const html = `
         <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
            <h3>${student.name.first} ${student.name.last}</h3>
            <span class="email">${student.email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${student.registered.date}</span>
          </div>
        </li>
        `;
         ul.insertAdjacentHTML('beforeend', html);
      }
   }
}


/*
   Creates buttons to cycle through the list of students
*/
function addPagination(list) {

   //Add buttons
   const numOfButtons = Math.ceil(list.length / itemsPerPage);
   const ul = document.querySelector('.link-list');
   ul.innerHTML = ``;
   for (let i = 0; i < numOfButtons; i++) {
      const html = `
      <li>
         <button type="button">${i + 1}</button>
      </li>
      `;
      ul.insertAdjacentHTML('beforeend', html);
   }

   if (list.length <= 0)
      return;

   //Pagination Button Handler
   ul.querySelector('button').classList.add('active');
   ul.addEventListener('click', (e) => {
      const activeButton = ul.querySelector('.active');
      const button = e.target.closest('button');
      if (button) {
         activeButton.classList.remove('active');
         button.classList.add('active');
         showPage(list, button.textContent);
      }
   });
}


/*
   Creates a search bar to dynamically update the list of students
*/
function addSearchBar(list) {
   //Search Bar
   const searchHtml = `
<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`;
   const header = document.querySelector('header');
   header.insertAdjacentHTML('beforeend', searchHtml);

   //Search Bar Handler
   const searchBar = document.querySelector('#search');
   searchBar.addEventListener('keyup', (e) => {
      const filteredStudents = [];
      for (let i = 0; i < list.length; i++) {
         let name = list[i].name.title + " " + list[i].name.first + " " + list[i].name.last;
         name = name.toLowerCase()
         if (name.includes(searchBar.value.toLowerCase()))
            filteredStudents.push(list[i]);
      }
      showPage(filteredStudents, 1);
      addPagination(filteredStudents);
      //Display error if no results
      if (filteredStudents.length <= 0) {
         const errorMessage = `<h2>Sorry, no results were found!</h2>`;
         document.querySelector('.student-list').insertAdjacentHTML('afterbegin', errorMessage);
      }
   });
}


// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar(data);
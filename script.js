// Author: Jay Patel, 000881881
const firstButton = document.querySelector('#first'); // get the first button element
const secondButton = document.querySelector('#second'); // get the second button element
const thirdButton = document.querySelector('#third'); // get the third button element
const container1 = document.querySelector('#container1'); // get the container1 element
const container2 = document.querySelector('#container2'); // get the container2 element
const container3 = document.querySelector('#container3'); // get the container3 element

firstButton.addEventListener('click', () => {
  const url1 = `https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php`; // create the AJAX request URL 

  // make the fetch request
  fetch(url1)
    .then(response => response.text())
    .then(data => {
      const h1 = document.createElement('h1'); // create a h1 element to hold the content
      h1.textContent = data + ' - 000881881'; // add "- 0008818881" to data 

      h1.style.textAlign = 'center'; 

      // clear the previous content of the container1
      container1.innerHTML = ''; 

      container1.appendChild(h1);  // add the h1 to the container element
      
      console.log("test 1 pass");      
    })
    .catch(error => console.log(error)); // display error on console if occurs
});


// add an event listener to the button
secondButton.addEventListener('click', () => {
  
  const inputValue = document.querySelector('#input').value.toLowerCase(); // get the input value
  
  const url2 = `https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php?choice=${inputValue}`; // create the AJAX request URL with the input value
  
  // make the fetch request
  fetch(url2)
    .then(response => response.json())
    .then(jsonResponse => {

      // clear the previous content of the container2
      container2.innerHTML = '';

      // calculate the width of the divs based on the number of elements in the response
      const numElements = jsonResponse.length;
      const widthPercentage = 100 / numElements;

      // loop through the JSON response and create a div for each object
      for (let i = 0; i < numElements; i++) {
        const obj = jsonResponse[i];

        // create a new div element to hold the content
        const div = document.createElement('div');
        div.className = "col";

        // set the width and float of the div to align them side-by-side
        div.style.width = `${widthPercentage}%`;

        // create an h2 element for the series string and add it to the div
        const h2 = document.createElement('h2');
        h2.textContent = obj.series;
        div.appendChild(h2);

        // create an img element for the image and add it to the div
        const img = document.createElement('img');
        img.src = obj.url;
        img.width = 400; // set the width of the image to 200px
        img.height = 400; // set the height of the image to 200px
        div.appendChild(img);

        // create a p element for the name and add it to the div
        const p = document.createElement('p');
        p.textContent = obj.name;
        div.appendChild(p);

        container2.appendChild(div); // add the div to the container2 element

      }
      console.log("test 2 pass");
    })
    .catch(error => console.log(error)); // display error on console if occurs
});


// add an event listener to the button
thirdButton.addEventListener('click', () => {

  const inputValue = document.querySelector('#input').value; // get the input value

  const url3 = 'https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php'; // create the fetch request URL

  // create the fetch request options object
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `choice=${inputValue}`
  };

  // make the fetch request
  fetch(url3, fetchOptions)
    .then(response => response.json())
    .then(jsonResponse => {

      // clear the previous content of the container3
      container3.innerHTML = '';
        
      const table = document.createElement('table'); // create a new table element
      table.style.border = '2px solid black';

      const row = document.createElement('tr'); // create a new row element
      row.style.backgroundColor = '#FFFFD2';

      // create a cell for each property of the object and add it to the row
      const cell1 = document.createElement('td');
      cell1.textContent = 'Series';
      row.appendChild(cell1);

      const cell2 = document.createElement('td');
      cell2.textContent = 'Name';
      row.appendChild(cell2);

      const cell3 = document.createElement('td');
      cell3.textContent = 'Link';
      row.appendChild(cell3);

      table.appendChild(row);


      
      // loop through the JSON response and create a row for each object
      for (let i = 0; i < jsonResponse.length; i++) {
        const obj = jsonResponse[i];

        const row = document.createElement('tr'); // create a new row element
        if (i % 2 == 0) {
          row.style.backgroundColor = '#C5FAD5';
        } else {
          row.style.backgroundColor = '#AA96DA';
        }

        // create a cell for each property of the object and add it to the row
        const cell1 = document.createElement('td');
        cell1.textContent = obj.series;
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = obj.name;
        row.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.textContent = obj.url;
        row.appendChild(cell3);
        
        table.appendChild(row); // add the row to the table
      }

      container3.appendChild(table); // add the table to the container3 element

      // create a new text node with the new string
      const notice = document.createElement('p');
      notice.style.textAlign="center";
      
      if (inputValue === 'starwars') {
        notice.textContent = 'Star Wars © & TM 2022 Lucasfilm Ltd. All rights reserved. Visual material © 2022 Electronic Arts Inc.';
       }     
      else {
        notice.textContent = 'Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo. © 2019 Nintendo.';
      } 
      
      container3.appendChild(notice);// add the notice to the container3 element

      console.log("test 3 pass");
      
    })
    .catch(error => {
      console.error(error); // display error on console if occurs
    });
});

'use strict';

// put your own value below!
const searchURL ='https://developer.nps.gov/api/v1/parks?';


function formatQueryParams(params) {
  const queryItems = 
   "&stateCode=" + params.statesSelected[0] + "," + params.statesSelected[1] + "," + params.statesSelected[2] + "&limit=" + (params.limit) + 
   "&fields=addresses&api_key=fAOCmMxDAMeF3PxkcoANCG7YFFpc0wu20X7LaaIa"; 
  
  return queryItems;
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#results-list').empty();
  // iterate through the items array and append results to display
  for (let i = 0; i < responseJson.data.length; i++){
    
    $('#results-list').append(
      `<li>
        <h3>${responseJson.data[i].fullname}</h3>
        <p>${responseJson.data[i].description}</p>
      
        <br>
        <p><a href="${responseJson.data[i].directionsurl} target="blank">${responseJson.data[i].url}</a></p>
        
        <br>
        
        <p>${responseJson.data[i].addresses[0].type} Address</p>
        <p>${responseJson.data[i].addresses[0].line1}</p>
        <p>${responseJson.data[i].addresses[0].line2}</p>
        <p>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].statecode}</p>
        <p>${responseJson.data[i].addresses[0].postalcode}</p>
      </li>`
    )};
  
  //display the results section  
  $('#results').removeClass('hidden');
};

function getStateParks(statesSelected, maxResults=10) {
  
  const params = {
    limit: maxResults,
    statesSelected,
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();

    const statesSelected = $('#js-state1').val();
  
    const maxResults = $('#js-max-results').val();
    getStateParks(statesSelected, maxResults);
  });
}

$(watchForm);
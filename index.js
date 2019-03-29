'use strict';

// put your own value below!
const searchURL = 'https://developer.nps.gov/api/v1/parks?';


function formatQueryParams(params) {
  const queryItems = 
   "&stateCode=" + params.stateCode[0] + "&stateCode=" + params.stateCode[1] + "&stateCode=" + params.stateCode[2] + "&limit=" + (params.limit-1) + 
   "&fields=addresses&api_key=fAOCmMxDAMeF3PxkcoANCG7YFFpc0wu20X7LaaIa"; 
  
  
  return queryItems;
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each object in the data
    //array, add a list item to the results 
    //list with the full name, description,
    //website and mailin gaddress
    
    
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullname}</h3>
      <p>${responseJson.data[i].description}</p>
      <br>
      <p><a href="${responseJson.data[i].url} target="blank">${responseJson.data[i].url}</a></p>
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

function getStateParks(state1, state2, state3, maxResults=10) {
  
  const params = {
    limit: maxResults,
    stateCode: [state1, state2, state3],
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
    const state1 = $('#js-state1').val();
    const state2 = $('#js-state2').val();
    const state3 = $('#js-state3').val();
    const maxResults = $('#js-max-results').val();
    getStateParks(state1, state2, state3, maxResults);
  });
}

$(watchForm);
var $inputTitle = $('.input-title');
var $inputBody = $('.input-body');
var $saveButton = $('.save-button');
var $searchInput = $('.search-ideas-input');
var $ideaList = $('.idea-list');

$inputTitle.on('keyup', enableSave);
$inputBody.on('keyup', enableSave);
$saveButton.on('click', generateIdea);
$searchInput.on('keyup', searchIdeas);
$ideaList.on('click', '.delete-button', deleteIdea);
$ideaList.on('click', '.upvote-button', upvoteIdea);
$ideaList.on('click', '.downvote-button', downvoteIdea);

$(document).ready(function() {
  for(var i = 0; i < localStorage.length; i++) {
    var storedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)))
    $('.idea-list').prepend(`<article id="${storedIdea.id}" class="idea">
      <h2 contenteditable="true" name="title">${storedIdea.title}</h2>
      <button class="delete-button"></button>
      <p class="body-text" contenteditable="true" name="body">${storedIdea.body}</p>
      <div>
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality:</h3>
        <p class="quality">${storedIdea.quality}</p>
      </div>  
      <hr />
    </article>`);
  }
   editIdea();

  
  // get array of items (idea cards)

  // use .filter() on the values
  // those will be === true
  // assign that boolean/value to the hidden attribute for each card
  // var ideaCardsArray = $('.idea')
  // console.log(ideaCardsArray.indexOf('peanut'))

  // console.log(matchingIdeaCards)
  // console.log(ideaCardsArray[i].innerText)
  // console.log($(ideaCards:contains('peanut')));

});


function enableSave() {
  if ($inputTitle.val().length > 0 && $inputBody.val().length > 0) {
    $saveButton.removeAttr('disabled')
  } else {
    $saveButton.attr('disabled', '')
  }
}

function IdeaFactory(title, body) {
  this.id = $.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill'
}


function generateIdea(e) {
  e.preventDefault();
  var newIdea = new IdeaFactory($inputTitle.val(), $inputBody.val());
  var userInputBody = $inputBody.val();
  var userInputTitle = $inputTitle.val();
  $('.idea-list').prepend(`<article id="${newIdea.id}" class="idea">
      <h2 contenteditable="true" name="title">${newIdea.title}</h2>
      <button class="delete-button"></button>
      <p class="body-text" contenteditable="true" name="body">${newIdea.body}</p>
      <div>
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality:</h3>
        <p class="quality">${newIdea.quality}</p>
      </div>  
      <hr />
    </article>`);

  setInLocalStorage(newIdea);
  resetForm();
}

//JSONify object and set in local storage
function setInLocalStorage(newStorage) {
    var ideaToStore = {
    id: newStorage.id,
    title: newStorage.title,
    body: newStorage.body,
    quality: newStorage.quality,
  };
  var stringifedIdeaToStore = JSON.stringify(ideaToStore);

  localStorage.setItem(newStorage.id, stringifedIdeaToStore);
}

function editIdea() {
  $('h2, .body-text').keydown(function(e) {
    if (e.which === 13) {
      $(this).blur();
     } 
    var changedTarget = $(this).attr('name');
    var userChange = e.target.innerText;  
    var ideaId = ($(this).parent('.idea'))[0].id;
    var retrievedIdea = localStorage.getItem(ideaId);
    var parsedIdea = JSON.parse(retrievedIdea);
    parsedIdea[changedTarget] = userChange;
    localStorage.setItem(ideaId, JSON.stringify(parsedIdea))
  });
}

function resetForm() {
  $inputTitle.val('');
  $inputBody.val('');
  $inputTitle.focus();
  $saveButton.attr('disabled', '')
}

function deleteIdea() {
  $(this).closest('.idea').remove();
  var ideaId = ($(this).parents('.idea'))[0].id;
  localStorage.removeItem(ideaId)
}

function upvoteIdea() {
  var setQuality = $(this).siblings('p');
  
  if (setQuality.text() === 'swill') {
    setQuality.text('plausible');
  } else if (setQuality.text() === 'plausible') {
    setQuality.text('genius');
  }
  var ideaId = ($(this).parents('.idea'))[0].id;
  var retrievedIdea = localStorage.getItem(ideaId);
  var parsedIdea = JSON.parse(retrievedIdea);
  var ideaQuality = parsedIdea.quality;
  ideaQuality = setQuality.text();
  parsedIdea.quality = ideaQuality;
  var updatedQuality = JSON.stringify(parsedIdea);
  localStorage.setItem(ideaId, updatedQuality);
}

function downvoteIdea() {
  var setQuality = $(this).siblings('p');

  if (setQuality.text() === 'genius') {
    setQuality.text('plausible');
  } else if (setQuality.text() === 'plausible') {
    setQuality.text('swill');
  }
  var ideaId = ($(this).parents('.idea'))[0].id;
  var retrievedIdea = localStorage.getItem(ideaId);
  var parsedIdea = JSON.parse(retrievedIdea);
  var ideaQuality = parsedIdea.quality;
  ideaQuality = setQuality.text();
  parsedIdea.quality = ideaQuality;
  var updatedQuality = JSON.stringify(parsedIdea);
  localStorage.setItem(ideaId, updatedQuality);
}

// searchIdeas function to run search on all 3 fields
function searchIdeas() {
  $('.idea').hide();
  searchTitles();
  searchBodies();
  searchQualities();
}
function searchTitles() {
  var $newSearchInput = $searchInput.val().toUpperCase();
  var $listOfTitles = $('h2');
  for (var i = 0; i < $listOfTitles.length; i++) {
    var $upperCaseTitle = $listOfTitles[i].innerText.toUpperCase()
    console.log($upperCaseTitle)
    if (($upperCaseTitle).includes($newSearchInput)) {
      $(($listOfTitles[i]).closest('.idea')).show();
    } 
  }
}
function searchBodies() {
  var $newSearchInput = $searchInput.val().toUpperCase();
  var $listOfBodies = $('.body-text');
  for (var i = 0; i < $listOfBodies.length; i++) {
    var $upperCaseBody = $listOfBodies[i].innerText.toUpperCase()
    console.log($upperCaseBody)
    if (($upperCaseBody).includes($newSearchInput)) {
      $(($listOfBodies[i]).closest('.idea')).show();
    } 
  }
}

function searchQualities() {
  var $newSearchInput = $searchInput.val().toUpperCase();
  var $listOfQualities = $('.quality');
  for (var i = 0; i < $listOfQualities.length; i++) {
    var $upperCaseQuality = $listOfQualities[i].innerText.toUpperCase()
    console.log($upperCaseQuality)
    if (($upperCaseQuality).includes($newSearchInput)) {
      $(($listOfQualities[i]).closest('.idea')).show();
    } 
  }
} 










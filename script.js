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
    prependIdea(storedIdea);
  }
  editIdea();
});

function enableSave() {
  if ($inputTitle.val().length > 0 && $inputBody.val().length > 0) {
    $saveButton.removeAttr('disabled')
  } else {
    $saveButton.attr('disabled', '')
  }
};

function IdeaFactory(title, body) {
  this.id = $.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill'
};

function generateIdea(e) {
  e.preventDefault();
  var newIdea = new IdeaFactory($inputTitle.val(), $inputBody.val());
  var userInputBody = $inputBody.val();
  var userInputTitle = $inputTitle.val();
  
  prependIdea(newIdea);
  editIdea();
  setInLocalStorage(newIdea);
  resetForm();
};

function prependIdea(input) {
  $('.idea-list').prepend(`<article id="${input.id}" class="idea">
      <h2 contenteditable="true" name="title" aria-label="Idea title">${input.title}</h2>
      <button class="delete-button" aria-label="Delete idea"></button>
      <p class="body-text" contenteditable="true" name="body" aria-label="Idea body">${input.body}</p>
      <div>
        <button class="upvote-button" aria-label="Upvote idea"></button>
        <button class="downvote-button" aria-label="Downvote idea"></button>
        <h3>quality:</h3>
        <p class="quality" aria-label="Idea quality">${input.quality}</p>
      </div>  
      <hr />
    </article>`);
};

function setInLocalStorage(newStorage) {
  var ideaToStore = {
    id: newStorage.id,
    title: newStorage.title,
    body: newStorage.body,
    quality: newStorage.quality,
  };
  console.log(ideaToStore)
  var stringifedIdeaToStore = JSON.stringify(ideaToStore);

  localStorage.setItem(newStorage.id, stringifedIdeaToStore);
};

function editIdea() {
  saveEdit();
  $('h2, .body-text').keydown(function(e) {
    if (e.which === 13) {
      $(this).blur();
    }
  });
};

function saveEdit() {
  $('h2, .body-text').on('blur', function(e) {
    var changedTarget = $(this).attr('name');
    var userChange = e.target.innerText;  
    var ideaId = ($(this).parent('.idea'))[0].id;
    var retrievedIdea = localStorage.getItem(ideaId);
    var parsedIdea = JSON.parse(retrievedIdea);
    
    parsedIdea[changedTarget] = userChange;
    localStorage.setItem(ideaId, JSON.stringify(parsedIdea))
  });
};

function resetForm() {
  $inputTitle.val('');  
  $inputBody.val('');
  $inputTitle.focus();
  $saveButton.attr('disabled', '');
};

function deleteIdea() {
  $(this).closest('.idea').remove();
  var ideaId = ($(this).parents('.idea'))[0].id;
  localStorage.removeItem(ideaId)
};

function upvoteIdea() {
  var setQuality = $(this).siblings('p');
  var ideaId = ($(this).parents('.idea'))[0].id;
  
  if (setQuality.text() === 'swill') {
    setQuality.text('plausible');
  } else if (setQuality.text() === 'plausible') {
    setQuality.text('genius');
  }

  voteIdea(ideaId, setQuality);
};

function downvoteIdea() {
  var setQuality = $(this).siblings('p');
  var ideaId = ($(this).parents('.idea'))[0].id;

  if (setQuality.text() === 'genius') {
    setQuality.text('plausible');
  } else if (setQuality.text() === 'plausible') {
    setQuality.text('swill');
  }

  voteIdea(ideaId, setQuality);
};

function voteIdea(ideaId, setQuality) {
  var retrievedIdea = localStorage.getItem(ideaId);
  var parsedIdea = JSON.parse(retrievedIdea);
  var ideaQuality = parsedIdea.quality;
  ideaQuality = setQuality.text();
  parsedIdea.quality = ideaQuality;
  var updatedQuality = JSON.stringify(parsedIdea);
  localStorage.setItem(ideaId, updatedQuality);
};

function searchIdeas() {
  $('.idea').hide();
  searchTitles();
  searchBodies();
  searchQualities();
};

function searchTitles() {
  searchHelper('h2');
};

function searchBodies() {
 searchHelper('.body-text');
};

function searchQualities() {
  searchHelper('.quality');
};

function searchHelper(location) {
  var $newSearchInput = $searchInput.val().toUpperCase();
  var $listOfQualities = $(location);
  
  for (var i = 0; i < $listOfQualities.length; i++) {
    var $upperCaseQuality = $listOfQualities[i].innerText.toUpperCase()
    if (($upperCaseQuality).includes($newSearchInput)) {
      $(($listOfQualities[i]).closest('.idea')).show();
    } 
  }
};

//look into function for getting id and setting id and then updating properties in local storage using it's id








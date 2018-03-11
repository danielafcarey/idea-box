loacCardsFromStorage();

$('.input-title').on('keyup', enableSave);
$('.input-body').on('keyup', enableSave);
$('.save-button').on('click', generateIdea);
$('.search-ideas-input').on('keyup', searchIdeas);
$('.idea-list').on('click', '.delete-button', deleteIdea);
$('.idea-list').on('click', '.upvote-button', upvoteIdea);
$('.idea-list').on('click', '.downvote-button', downvoteIdea);

function loacCardsFromStorage() {
  for(var i = 0; i < localStorage.length; i++) {
    var storedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)))
    prependIdea(storedIdea);
  }
  editIdea();
};

function enableSave() {
  if ($('.input-title').val().length > 0 && $('.input-body').val().length > 0) {
    $('.save-button').removeAttr('disabled')
  } else {
    $('.save-button').attr('disabled', '')
  }
};

function Idea(title, body) {
  this.id = $.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill'
};

function generateIdea(e) {
  e.preventDefault();
  var newIdea = new Idea($('.input-title').val(), $('.input-body').val());
  
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
  var stringifedIdeaToStore = JSON.stringify(ideaToStore);

  localStorage.setItem(newStorage.id, stringifedIdeaToStore);
};

function resetForm() {
  $('.input-title').val('');  
  $('.input-body').val('');
  $('.input-title').focus();
  $('.save-button').attr('disabled', '');
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
  var parsedIdea = JSON.parse(localStorage.getItem(ideaId));
  parsedIdea.quality = setQuality.text();
  localStorage.setItem(ideaId, JSON.stringify(parsedIdea));
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
  var $newSearchInput = $('.search-ideas-input').val().toUpperCase();
  var $listOfMatchingCards = $(location);
  
  for (var i = 0; i < $listOfMatchingCards.length; i++) {
    var $upperCaseMatch = $listOfMatchingCards[i].innerText.toUpperCase()
    if (($upperCaseMatch).includes($newSearchInput)) {
      $(($listOfMatchingCards[i]).closest('.idea')).show();
    } 
  }
};





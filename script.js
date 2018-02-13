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
  console.log(newIdea)
  var userInputBody = $inputBody.val();
  var userInputTitle = $inputTitle.val();
  $('.idea-list').prepend(`<article id="${newIdea.id}" class="idea">
      <h2 contenteditable="true">${newIdea.title}</h2>
      <button class="delete-button"></button>
      <p class="body-text" contenteditable="true">${newIdea.body}</p>
      <div>
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality:</h3>
        <p class="quality">${newIdea.quality}</p>
      </div>  
      <hr />
    </article>`);

  var ideaToStore = {
    id: newIdea.id,
    title: newIdea.title,
    body: newIdea.body,
    quality: newIdea.quality,
  };
  var stringifedIdeaToStore = JSON.stringify(ideaToStore);

  localStorage.setItem(newIdea.id, stringifedIdeaToStore);

  resetForm();
  editIdea();
}

//JSONify object and set in local storage
// function setInLocalStorage() {
//   var ideaToStore = {
//     id: 
//   }
// }

//get from local storage and de-JSONify object

function editIdea() {
  $('h2, .body-text').keydown(function(e) {
    console.log(e.which);
    if (e.which === 13) {
      $(this).blur();
      return false;
    }
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
}

function upvoteIdea() {
  var setQuality = $(this).siblings('p');

  if (setQuality.text() === 'swill') {
    setQuality.text('plausible');
  } else if (setQuality.text() === 'plausible') {
    setQuality.text('genius');
  }
  
}

function downvoteIdea() {
  var setQuality = $(this).siblings('p');

  if (setQuality.text() === 'genius') {
    setQuality.text('plausible');
  } else if (setQuality.text() === 'plausible') {
    setQuality.text('swill');
  }
}

function searchIdeas() {
  var newSearchInput = $searchInput.val();
}


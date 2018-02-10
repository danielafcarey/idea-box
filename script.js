var $inputTitle = $('.input-title');
var $inputBody = $('.input-body');
var $saveButton = $('.save-button');
var $searchInput = $('.search-ideas-input');
var $ideaList = $('.idea-list');

$inputTitle.on('keyup', enableSave);
$inputBody.on('keyup', enableSave);
$saveButton.on('click', createIdea);
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

function createIdea(e) {
  e.preventDefault();
  var userInputBody = $inputBody.val();
  var userInputTitle = $inputTitle.val();
  $('.idea-list').prepend(`<article class="idea">
      <h2 contenteditable="true">${userInputTitle}</h2>
      <button class="delete-button"></button>
      <p class="body-text" contenteditable="true">${userInputBody}</p>
      <div>
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality:</h3>
        <p class="quality">swill</p>
      </div>  
      <hr />
    </article>`);
  resetForm();
  editIdea();
}

// $(document).ready(function() {
function editIdea() {
  $('h2, .body-text').keydown(function(e) {
    console.log(e.which);
    if (e.which === 13) {
      $(this).blur();
      return false;
    }
  });
}
// });

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
  var setQuality = $('.quality').html();
  console.log(setQuality);

  if (setQuality === 'swill') {
    $('.quality').html('plausible');
  } else if (setQuality === 'plausible') {
    $('.quality').html('genius');
  }
  
}

function downvoteIdea() {
  var setQuality = $('.quality').html();

  if (setQuality === 'genius') {
    $('.quality').html('plausible');
  } else if (setQuality === 'plausible') {
    $('.quality').html('swill');
  }
}

function searchIdeas() {
  var newSearchInput = $searchInput.val();
  console.log(
}


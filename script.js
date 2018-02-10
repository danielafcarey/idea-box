var $inputTitle = $('.input-title');
var $inputBody = $('.input-body');
var $saveButton = $('.save-button');
var $searchInput = $('.search-ideas');
var $ideaList = $('.idea-list');

$inputTitle.on('keyup', enableSave);
$inputBody.on('keyup', enableSave);
$saveButton.on('click', createIdea);
$searchInput.on('keyup',  )
$ideaList.on('click', '.delete-button', deleteIdea);

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
  $('.idea-list').append(`<article class="idea">
      <h2>${userInputTitle}</h2>
      <button class="delete-button"></button>
      <p class="body-text">${userInputBody}</p>
      <div>
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality:</h3>
        <p class="quality">swill</p>
      </div>  
      <hr />
    </article>`);
  resetForm();
}

function resetForm() {
  $inputTitle.val('');
  $inputBody.val('');
  $inputTitle.focus();
}

function deleteIdea() {
  // remove .closest with class 'idea'
  console.log($(this).closest('.idea'));
  $(this).closest('.idea').remove();
}

var $inputTitle = $('.input-title');
var $inputBody = $('.input-body');
var $saveButton = $('.save-button');
var $searchInput = $('.search-ideas');

$inputTitle.on('keyup', enableSave);
$inputBody.on('keyup', enableSave);
$saveButton.on('click', createIdea);
$searchInput.on('keyup',  )

function enableSave() {
  if ($inputTitle.val().length > 0 && $inputBody.val().length > 0) {
    $saveButton.removeAttr('disabled')
    console.log('clicked')
  } else {
    $saveButton.attr('disabled', '')
  }
}

function createIdea(e) {
  e.preventDefault();
  console.log('hello');
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
    </article>`)
}

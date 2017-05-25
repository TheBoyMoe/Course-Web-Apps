// Puppy images fade in
$('main img').css('display', 'none').fadeIn(1600);

// 'Selected' puppies are visually different from unselected puppies
$('.card').on('click', function() {
  $(this).toggleClass('selected');
});

// Not a necessary feature, but shows the use of hover()
$('.loc').hover(
  function(){
    $(this).html("<strong>Location:</strong> Your house?!");
  }, function() {
    $(this).html("<strong>Location:</strong> Treehouse Adoption Center");
});

// Adds a pet to the page with user input
$('#add-pet').on('click', function() {
  // Grab info from the form
  var $name = $('#pet-name').val();
  var $species = $('#pet-species').val();
  var $notes = $('#pet-notes').val();

  // It would be cool to toss some conditional logic in here that displayed an icon based on the input species, but not necessary.

  // Assemble the HTML of our new element with the above variables
  var $newPet = $(
    '<section class="six columns"><div class="card"><p><strong>Name:</strong> ' + $name +
    '</p><p><strong>Species:</strong> ' + $species +
    '</p><p><strong>Notes:</strong> ' + $notes +
    '</p><span class="close">&times;</span></div></section>'
  );
  // Attach the new element to the page
  $('#posted-pets').append($newPet);

  // Make the 'x' in the corner remove the section it's contained within
  $('.close').on('click', function() {
    $(this).parent('.card').parent('section').remove();
  });

  // Reset form fields
  $('#pet-name').val("");
  $('#pet-species').val("Dog");
  $('#pet-notes').val("");
});

// Possible bonus goals:
  // Make the "Adopt!" buttons on the homepage open a modal?
  // Require the checkbox on the form
  // Only enable the checkbox once its link has been clicked

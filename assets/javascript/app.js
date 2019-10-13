$(document).ready(function() {

var topics = ["Darth Vader", "Bart Simpson", "The Rock", "John Snow", "Harry Potter", "Rocky", "Rambo", "Michael Mayers", "Freddy Kruger", "Damien Thorn", "Maleficent", "Homer Simpson", "Rick Grimes", "Mad Max"];


function renderButtons() {

    $("#buttonsView").empty();
    for (var i = 0; i < topics.length; i++) {

      var a = $("<button>");
      a.addClass("character btn btn-primary");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttonsView").append(a);
    }
}

$(document).on("click", "button", displayGifs);
function displayGifs() {         
  $("#gifDisplay").empty();  
  var character = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    character + "&api_key=bMJGcTJQ1lGMeQtEaK2PAjMeUZL4CSL5&limit=10";
  console.log(character);
  $.ajax({
    url: queryURL,
    method: "GET"
  })
      .then(function(response) {
          var results = response.data;
        console.log(results);
        console.log(response);
          for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var characterImage = $("<img>");
          characterImage.attr("src", results[i].images.original_still.url);

          characterImage.attr("data-still", results[i].images.original_still.url);
          characterImage.attr("data-gif", results[i].images.fixed_width.url); 
          characterImage.attr("data-status", "still"); 

          gifDiv.prepend(p);
          gifDiv.prepend(characterImage);
          $("#gifDisplay").prepend(gifDiv);
          }
      });
};

$(document).on("click", "img", function() {
  var state = $(this).attr("data-status");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-gif"));
    $(this).attr("data-status", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-status", "still");
  }
});

$("#add-character").on("click", function(event) {
  event.preventDefault();
  var character = $("#character-input").val().trim();   // Ojo nombre de variable

  topics.push(character);

  renderButtons();
  $("#character-input").val("");
});

$(document).on("click", ".character", displayGifs);


renderButtons();

})
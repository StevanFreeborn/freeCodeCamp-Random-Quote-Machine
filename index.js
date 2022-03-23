$(document).ready(function(){
    getQuotes().then(() => displayQuoteAndAuthorText());
    $("#new-quote").on('click', displayQuoteAndAuthorText);
});

// Get quotes from json file in github repository.
let data = [];
function getQuotes(){
    return $.ajax({
        headers: {
            Accept: "application/json"
        },
        url: "https://raw.githubusercontent.com/StevanFreeborn/freeCodeCamp-Random-Quote-Machine/master/quotes.json",
        success: function(json) {
            data = JSON.parse(json);
            console.log(data);
        }
    });
}

// Get quote text and author text.
function displayQuoteAndAuthorText() {
    let randomValue = Math.floor(Math.random() * data.quotes.length);
    let quote = data.quotes[randomValue];
    $("#text").fadeOut("slow", function() {
        $(this).fadeIn("slow");
        $(this).text(quote.quote);
    });
    $("#author").fadeOut("slow", function() {
        $(this).fadeIn("slow");
        $(this).text("- " + quote.author);
    });
}
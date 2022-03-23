$(document).ready(function(){
    getQuotes().then(() => displayQuoteAndAuthorText());
    $("#new-quote").on('click', getNewQuoteAndAuthorText);
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

// Get quote and author text on initial load.
function displayQuoteAndAuthorText() {
    let randomValue = Math.floor(Math.random() * data.quotes.length);
    let quote = data.quotes[randomValue];
    $("#text").text(quote.quote);
    $("#author").text(quote.author);
    $("#wrapper").fadeIn("slow");
}

// Get new quote and author text when new quote button is clicked.
function getNewQuoteAndAuthorText() {
    let randomValue = Math.floor(Math.random() * data.quotes.length);
    let quote = data.quotes[randomValue];
    $("#text").fadeToggle("slow", function() {
        $(this).text(quote.quote);
        $(this).fadeIn("slow");
    });

    $("#author").fadeToggle("slow", function() {
        $(this).text(quote.author);
        $(this).fadeIn("slow");
    });
}
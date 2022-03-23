$(document).ready(function(){
    getQuotes().then(() => displayQuoteAndAuthorText());
    $("#new-quote").on('click', getNewQuoteAndAuthorText);
});

let data = [];

// Get quotes from json file in github repository.
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

// Select a quote randomly.
function getQuote(){
    let randomValue = Math.floor(Math.random() * data.quotes.length);
    return data.quotes[randomValue];
}

function getImagePath(authorName){
    let name = authorName.toLowerCase().replace(/\s/g, "-");
    return `images/authors/${name}.jpg`;
}

// Get quote and author text on initial load.
function displayQuoteAndAuthorText() {
    let quote = getQuote();
    let imagePath = getImagePath(quote.author);
    $("#background").css("background-image", `url(${imagePath})`);
    $("#text").text(quote.quote);
    $("#author").text("- " + quote.author);
    $("#wrapper").fadeIn("slow");
}

// Get new quote and author text when new quote button is clicked.
function getNewQuoteAndAuthorText() {
    let quote = getQuote();
    let imagePath = getImagePath(quote.author);
    console.log(imagePath);
    $("#background").fadeOut("slow", function() {
        $(this).css("background-image", `url(${imagePath})`);
        $(this).fadeIn("slow");
    });

    $("#text").fadeOut("slow", function() {
        $(this).text(quote.quote);
        $(this).fadeIn("slow");
    });

    $("#author").fadeOut("slow", function() {
        $(this).text("- " + quote.author);
        $(this).fadeIn("slow");
    });
}
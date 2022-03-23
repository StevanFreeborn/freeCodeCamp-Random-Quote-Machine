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

// build image path.
function getImagePath(authorName){
    let name = authorName.toLowerCase().replace(/\s/g, "-");
    return `images/authors/${name}.jpg`;
}

// Build image tumblr sharing link.
function getTumblrLink(quoteText, authorName){
    const baseUrl = "https://www.tumblr.com/widgets/share/tool?posttype=quote&canonicalUrl=https%3A%2F%2Fstevanfreeborn.github.io%2FfreeCodeCamp-Random-Quote-Machine&content=";
    let textToShare = encodeURIComponent(quoteText) + "&title=" + encodeURIComponent(authorName);
    let link = baseUrl + textToShare;
    $("#tumblr-quote").attr("href", `${link}`);
}

// Build twitter sharing link.
function getTwitterLink(quoteText, authorName) {
    const baseUrl = "https://twitter.com/intent/tweet?text=";
    let textToShare = encodeURIComponent('"' + quoteText + '"' + " - " + authorName);
    let link = baseUrl + textToShare;
    $("#tweet-quote").attr("href", `${link}`);
}

let imagePath = null;
let quote = null;

// Select a quote randomly.
function getQuote(){
    let randomValue = Math.floor(Math.random() * data.quotes.length);
    quote = data.quotes[randomValue]
    imagePath = getImagePath(quote.author);
    getTumblrLink(quote.quote, quote.author);
    getTwitterLink(quote.quote, quote.author);
}

// Get quote and author text on initial load.
function displayQuoteAndAuthorText() {
    getQuote();
    $("#background").css("background-image", `url(${imagePath})`);
    $("#text").text(quote.quote);
    $("#author").text("- " + quote.author);
    $("#wrapper").fadeIn("slow");
}

// Get new quote and author text when new quote button is clicked.
function getNewQuoteAndAuthorText() {
    getQuote();
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
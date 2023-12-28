const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')


let apiQuotes=[];

function loading (){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete (){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//New Quote 
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;
    //Check quote length to determine font size
    if(quote.text.length > 80){
        quoteText.classList.add('long-quote')
    }else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    complete();
}
//Get Quote
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error){

    }

};

//Tweet Quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
};

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuotes();


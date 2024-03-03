let apiQuotes = [];

// Show new function
const new_quote = function () {
  // Get a random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
};
// Get Quotes from API
async function get_quotes() {
  const api_url = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(api_url);
    apiQuotes = await response.json();
    new_quote();
  } catch (error) {
    // Catch error here
  }
}

// On Load
get_quotes();

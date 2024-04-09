// Define the URL of the Final Space API endpoint
const apiUrl = 'https://finalspaceapi.com/api/v0';

// Function to fetch characters from the Final Space API
function fetchCharacters() {
    // Make a GET request to the /character endpoint
    return fetch(`${apiUrl}/character`)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch operation
            console.error('There was a problem fetching characters:', error);
            throw error; // Re-throw the error for further handling
        });
}

// Function to render characters list
function renderCharacters(characters) {
    // Get the container element where you want to append the list
    const container = document.getElementById('characterList');
    
    // Create an unordered list element
    const ul = document.createElement('ul');
    
    // Loop through the characters array and create list items
    characters.forEach(character => {
        // Create a list item for each character
        const li = document.createElement('li');
        li.textContent = `${character.name} - ${character.species}`;
        
        // Append the list item to the unordered list
        ul.appendChild(li);
    });
    
    // Append the unordered list to the container
    container.appendChild(ul);
}

// Fetch characters from the API and render the list
fetchCharacters()
    .then(characters => {
        // Render the characters list
        renderCharacters(characters);
    });







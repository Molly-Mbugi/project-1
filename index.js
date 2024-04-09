//  fetching character data
const apiUrl = 'https://finalspaceapi.com/api/v0/character';

// Function to display characters
function display(characters) {
    const char = document.getElementById('characterList');

    characters.forEach(character => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${character.name}</td>
            <td>${character.species}</td>
            <td><img src="${character.img_url}" alt="${character.name}" ></td>
        `;
        char.appendChild(row);
    });
}

// Function to fetch character data from the API
function fetchCharacters() {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching characters:', error);
        });
}

// Fetch character data and display it in the table
fetchCharacters()
    .then(characters => {
        display(characters);
    });

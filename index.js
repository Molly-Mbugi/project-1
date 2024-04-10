// Define API URL for fetching character data
const characterUrl = 'https://finalspaceapi.com/api/v0/character';

// Function to fetch character data from the API
async function fetchCharacterData() {
    try {
        const response = await fetch(characterUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch character data');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Function to display characters in the table
function displayCharacters(characters) {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = 'not found'; // Clear previous content

    characters.forEach(character => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${character.name}</td>
            <td>${character.species}</td>
            <td>${character.status}</td>
            <td>${character.gender}</td>
            <td>${character.origin}</td>
            <td>${character.abilities.join(', ')}</td>
            <td><img src="${character.img_url}" alt="${character.name}" style="width: 100px;"></td>
        `;
        characterList.appendChild(row);
    });
}

// Function to filter characters by name
function filterCharactersByName(characters, name) {
    return characters.filter(character => character.name.toLowerCase().includes(name.toLowerCase()));
}

// Function to handle search button click
document.getElementById('searchButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    const characters = await fetchCharacterData();
    const filteredCharacters = filterCharactersByName(characters, searchInput);
    displayCharacters(filteredCharacters);
});

// Initial display of all characters
fetchCharacterData()
    .then(characters => displayCharacters(characters))
    .catch(error => console.error('Error fetching character data:', error));

// Function to handle refresh button click
document.getElementById('refreshButton').addEventListener('click', async () => {
    try {
        const characters = await fetchCharacterData();
        displayCharacters(characters);
    } catch (error) {
        console.error('Error fetching character data:', error);
    }
});


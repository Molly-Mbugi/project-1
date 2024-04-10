document.addEventListener("DOMContentLoaded", function() {
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

    // Function to create a table row for a character
    function createCharacterRow(character) {
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
        return row;
    }

    // Function to display characters in the table
    function displayCharacters(characters) {
        const characterList = document.getElementById('characterList');
        characterList.innerHTML = ''; // Clear previous content

        if (characters.length === 0) {
            characterList.innerHTML = '<tr><td colspan="7">No characters found</td></tr>';
            return;
        }

        characters.forEach(character => {
            const row = createCharacterRow(character);
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

    // Function to toggle dark mode
    document.getElementById('toggleModeButton').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
});


document.addEventListener("DOMContentLoaded", async function() {
    // Define API URL for fetching episode data
    const episodeUrl = 'https://finalspaceapi.com/api/v0/episode';

    // Function to fetch episode data from the API
    async function fetchEpisodeData() {
        try {
            const response = await fetch(episodeUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch episode data');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Function to create list items for each episode
    function createEpisodeListItem(episode) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${episode.name}</strong>: ${episode.air_date}`;
        return listItem;
    }

    // Function to display episodes in the list
    function displayEpisodes(episodes) {
        const episodeList = document.getElementById('episodeList');
        episodeList.innerHTML = ''; // Clear previous content

        if (episodes.length === 0) {
            episodeList.innerHTML = '<li>No episodes found</li>';
            return;
        }

        episodes.forEach(episode => {
            const listItem = createEpisodeListItem(episode);
            episodeList.appendChild(listItem);
        });
    }

    try {
        // Fetch episode data from the API
        const episodes = await fetchEpisodeData();
        // Display episodes in the list
        displayEpisodes(episodes);
    } catch (error) {
        console.error('Error fetching episode data:', error);
    }
});



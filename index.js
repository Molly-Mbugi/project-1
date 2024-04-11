document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch character data from the Final Space API
    function fetchCharacterData() {
        const charurl = 'https://finalspaceapi.com/api/v0/character';
        return fetch(charurl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch character data');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching character data:', error);
                throw error;
            });
    }

    // Function to create a table row for each character
    function createCharacterRow(character) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${character.name}</td>
            <td>${character.species}</td>
            <td>${character.status}</td>
            <td>${character.gender}</td>
            <td>${character.origin}</td>
            <td>${character.alias}</td>
            <td>${character.abilities.join(', ')}</td>
            <td><img src="${character.img_url}" alt="${character.name}" style="width: 80px;"></td>
        `;
        return row;
    }

    // Function to display characters in the table
    function displayCharacters(characters) {
        const characterList = document.getElementById('characterList');
        characterList.innerHTML = '';

        if (characters.length === 0) {
            characterList.innerHTML = '<tr><td colspan="8">No characters found</td></tr>';
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

    // Function to fetch episode data from the Final Space API

    function fetchEpisodeData() {
        const episodeUrl = 'https://finalspaceapi.com/api/v0/episode';
        
        return fetch(episodeUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch episode data');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching episode data:', error);
                throw error;
            });
    }
    

    // Function to create list items for each episode
    function createepisodelistItem(episode) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Episode ID:</strong> ${episode.id}<br>
            <strong>Name:</strong> ${episode.name}<br>
            <strong>Air Date:</strong> ${episode.air_date}<br>
        `;
        return listItem;
    }

    // Function to display episodes in a list
    function displayEpisodes(episodes) {
        const episodeList = document.getElementById('episodeList');
        episodeList.innerHTML = '';//This clears content to empty string

        if (episodes.length === 0) {
            return; episodeList.innerHTML = '<li>No episodes found</li>';
            
        }

        episodes.forEach(episode => {// loop over each episode of array
            const listItem = createepisodelistItem(episode);
            episodeList.appendChild(listItem);
        });
    }

    // Fetch and display characters and episodes when the page loads
    fetchCharacterData()
    .then(characters => {
        displayCharacters(characters);
        return fetchEpisodeData(); // Fetch episodes after characters are displayed
    })
    .then(episodes => {
        displayEpisodes(episodes);
    })
    .catch(error => {
        console.log('Error:', error);
    });



// Event listener for the search button to filter characters by name
document.getElementById('searchButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();//.values removes whitespace and  to lowercase ensures that the search functionality is case-insensitive.
    const characters = document.querySelectorAll('#characterList tr');

    characters.forEach(function (character) {// loop that iterates over each element in the characters
        const characterName = character.querySelector('td:first-child').textContent.toLowerCase();//selectfirst child to next element in <td>
// if condition if character is  available or not
        if (characterName.includes(searchInput)) {
            character.style.display = 'table-row';
        } else {
            character.style.display = 'none ';
        }
    });
});


    // Event listener for the refresh button to fetch and display characters again
    document.getElementById('refreshButton').addEventListener('click', () => {
        fetchCharacterData()
            .then(characters => {
                displayCharacters(characters);
            })
            .catch(error => {
                console.log('Error refreshing characters:', error);
            });
    });
    

    // Event listener for the dark mode button to switch between dark and light mode
    document.getElementById('toggleModeButton').addEventListener("click", () => { document. documentElement. classList. toggle("dark-mode"); });
         
    });




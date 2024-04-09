// Define API URL for fetching character data
const characterUrl = 'https://finalspaceapi.com/api/v0/character';
// Function to display character data in a table
function displayCharacterData(characters) {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = ''; // Clear previous content

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


// Fetch character data and display it in a table
fetchCharacterData()
    .then(characters => displayCharacterData(characters))
    .catch(error => console.error('Error fetching character data:', error));

    // Function to fetch episode data from the API
    async function fetchEpisodeData() {
        const episodeUrl = 'https://finalspaceapi.com/api/v0/episode';
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

    // Function to display episode summaries
    function displayEpisodeSummaries(episodes) {
        const selectElement = document.getElementById('episodeSelect');
        const summaryElement = document.getElementById('episodeSummary');

        episodes.forEach(episode => {
            const option = document.createElement('option');
            option.value = episode.id;
            option.textContent = `${episode.title} - ${episode.number}`;
            selectElement.appendChild(option);
        });

        selectElement.addEventListener('change', (event) => {
            const selectedEpisodeId = event.target.value;
            const selectedEpisode = episodes.find(episode => episode.id === selectedEpisodeId);
            summaryElement.textContent = selectedEpisode ? selectedEpisode.summary : '';
        });
    }

    // Fetch episode data and populate the dropdown
    fetchEpisodeData()
        .then(episodes => displayEpisodeSummaries(episodes))
        .catch(error => console.error('Error fetching episode data:', error));


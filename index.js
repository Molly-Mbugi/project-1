document.addEventListener("DOMContentLoaded", async function() {
    async function fetchCharacterData() {
        const characterUrl = 'https://finalspaceapi.com/api/v0/character';
        try {
            const response = await fetch(characterUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch character data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching character data:', error);
            throw error;
        }
    }

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
            <td><img src="${character.img_url}" alt="${character.name}" style="width: 100px;"></td>
        `;
        return row;
    }

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

    function filterCharactersByName(characters, name) {
        return characters.filter(character => character.name.toLowerCase().includes(name.toLowerCase()));
    }

    async function fetchEpisodeData() {
        const episodeUrl = 'https://finalspaceapi.com/api/v0/episode';
        try {
            const response = await fetch(episodeUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch episode data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching episode data:', error);
            throw error;
        }
    }

    function createEpisodeListItem(episode) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Episode ID:</strong> ${episode.id}<br>
            <strong>Name:</strong> ${episode.name}<br>
            <strong>Air Date:</strong> ${episode.air_date}<br>
        `;
        return listItem;
    }

    function displayEpisodes(episodes) {
        const episodeList = document.getElementById('episodeList');
        episodeList.innerHTML = '';

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
        const characters = await fetchCharacterData();
        displayCharacters(characters);

        const episodes = await fetchEpisodeData();
        displayEpisodes(episodes);
    } catch (error) {
        console.error('Error:', error);
    }

    document.getElementById('searchButton').addEventListener('click', async () => {
        const searchInput = document.getElementById('searchInput').value.trim();
        const characters = await fetchCharacterData();
        const filteredCharacters = filterCharactersByName(characters, searchInput);
        displayCharacters(filteredCharacters);
    });

    document.getElementById('refreshButton').addEventListener('click', async () => {
        try {
            const characters = await fetchCharacterData();
            displayCharacters(characters);
        } catch (error) {
            console.error('Error refreshing characters:', error);
        }
    });

    document.getElementById('toggleModeButton').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
});




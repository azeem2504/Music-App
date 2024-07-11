window.onload = function() {
    fetchSongs();
};

async function fetchSongs() {
    const artists = ['Arijit Singh', 'Bilal Saeed', 'Shafqat Amanat Ali'];
    const allSongs = [];

    for (const artist of artists) {
        const response = await fetch(`https://itunes.apple.com/search?term=${artist}&limit=3`);
        const data = await response.json();
        allSongs.push({ artist, songs: data.results });
    }

    displayArtists(allSongs);
}

function displayArtists(artists) {
    const artistsContainer = document.getElementById('artists');
    artistsContainer.innerHTML = '';

    artists.forEach(artistData => {
        const artistElement = document.createElement('div');
        artistElement.className = 'artist';

        const artistName = document.createElement('h3');
        artistName.textContent = artistData.artist;
        artistElement.appendChild(artistName);

        artistData.songs.forEach(song => {
            const songElement = document.createElement('div');
            songElement.className = 'song';

            const songInfo = document.createElement('div');
            songInfo.className = 'audio-control';
            songInfo.innerHTML = `
                <audio controls src="${song.previewUrl}"></audio>
                <h3>${song.trackName}</h3>
            `;
            onlyPlayOneIn(songInfo)

            

            const addToPlaylistButton = document.createElement('button');
            addToPlaylistButton.innerText = 'Add to Playlist';
            addToPlaylistButton.onclick = () => addToPlaylist(song);

            songElement.appendChild(songInfo);
            songElement.appendChild(addToPlaylistButton);
            artistElement.appendChild(songElement);
        });

        artistsContainer.appendChild(artistElement);
    });
}
function onlyPlayOneIn(container) {
    container.addEventListener("play", function(event) {
    audio_elements = container.getElementsByTagName("audio")
      for(i=0; i < audio_elements.length; i++) {
        audio_element = audio_elements[i];
        if (audio_element !== event.target) {
          audio_element.pause();
        }
      }
    }, true);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    onlyPlayOneIn(document.body);
  });

function addToPlaylist(song) {
    const playlistContainer = document.getElementById('playlist');
    
    const playlistItem = document.createElement('div');
    playlistItem.className = 'playlist-item';
    playlistItem.innerHTML = `
        <h3>${song.trackName}</h3> by ${song.artistName}
        <audio controls src="${song.previewUrl}"></audio>
    `;

    playlistContainer.appendChild(playlistItem);
}

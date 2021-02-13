const searchSongs = async () => {
    const searchText = document.getElementById("search-field").value;
    try {
        const url = `https://api.lyrics.ovh/suggest/${searchText}`;
        toggleSpinner(); 
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        displayError(error);
        // 'Something went wrong!! Please try again later!'
    }
}


document.getElementById("search-field")
    .addEventListener("keypress", function(event) {
    
    if (event.key == 'Enter'){
        document.getElementById("search-button").click();
    }
});

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    // console.log(songs);
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
      <div class="col-md-9">
             <h3 class="lyrics-name">${song.title}</h3>
             <p class="author lead">Album by <span>${song.artist.name}</span></p>
             <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
             </audio>
      </div>
      <div class="col-md-3 text-md-right text-center">
           <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
      </div>
      `;
        songContainer.appendChild(songDiv);
        toggleSpinner(); 
    });
}
const getLyric = async (artist, title) => {
    try {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }catch (error) {
            displayError("Something went wrong!! Try again later");
    }
}
// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`; 
//     console.log(url);
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics))
//     .catch(error => displayError(error)); 
// }

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
    if(lyrics== ''){
        lyricsDiv.innerText = 'Cannot Load Lyric';
    }
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner'); 
    const songs = document.getElementById('song-container'); 
    spinner.classList.toggle('d-none'); 
    songs.classList.toggle('d-none'); 
}
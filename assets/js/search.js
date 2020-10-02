const form = document.querySelector("#searchForm");
const search = document.querySelector("#search");
const result = document.querySelector("#result");
const more = document.querySelector("#more");

const apiUrl = "https://api.lyrics.ovh";

//Search for song or artist
async function searchSongs(term){
    const resp = await fetch(`${apiUrl}/suggest/${term}`);
    const data = await resp.json();
    console.log(`Search suggestions for ${term}`);
    showData(data)
}

// When submitting search term
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if(!searchTerm){
        alert("Please type a search term")
    } else {
        searchSongs(searchTerm)
    }
});

//show song and artist in DOM
function showData(data){
    let output = "";
    data.data.forEach(function (song){
        output += `
        <li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="lyricBtn" data-artist="${song.artist.name}" data-songtitle="${song.title}" data-audio="${song.preview}">Get Lyrics</button>
        </li>
        `
    })
    result.innerHTML = `
    <ul class="songs">
        ${output}
    </ul>
    `;

    if(data.prev || data.next){
        more.innerHTML = `
        ${data.prev ? `<button class="pageBtn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
        ${data.next ? `<button class="pageBtn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `;
    }
}


// Get prev and next songs
async function getMoreSongs(url) {
    const resp = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await resp.json();

    showData(data);
}

//'Get Lyrics' button click
result.addEventListener("click", (e) => {
    if(e.target.className === "lyricBtn"){
        const artist = e.target.getAttribute('data-artist');
        const songTitle = e.target.getAttribute('data-songtitle');
        const preview = e.target.getAttribute('data-audio');

        getLyrics(artist, songTitle, preview);
    }
})

// Get lyrics for song
async function getLyrics(artist, songTitle, preview){
    const resp = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
    const data = await resp.json();

    const lyrics = data.lyrics.replace(/(\r\r|\n)/g, '<br>');
    if(lyrics == ""){
        result.innerHTML = `<h2>No lyrics found</h2>`
    }else{
        result.innerHTML = `
        <audio controls>
            <source src="${preview}" type="audio/mp3">
        </audio>
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>`;
    }
    if(preview == ""){
        result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>`;
    }

    more.innerHTML = '';
}
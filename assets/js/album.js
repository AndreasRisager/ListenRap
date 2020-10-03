let url = new URLSearchParams(window.location.search);

if(url.get("albumId")){
    showAlbum();
}
async function showAlbum() {
    const resp = await fetch(`./assets/js/data.json`);
    const data = await resp.json();
    let artists = data.artists;
    id = url.get("id")
    let artistIndex = artists.findIndex(function (artist) {
        return artist.id == id;
    })
    let albums = artists[artistIndex].albums;
    albumId = url.get("albumId")
    let albumIndex = albums.findIndex(function (album) {
        return album.albumId == albumId;
    })
    let album = artists[artistIndex].albums[albumIndex];
    document.querySelector("#album h1").innerHTML = album.album
    document.querySelector("#album img").src = album.cover

    let albumSongs = document.querySelector(".albumSongs");
    album.songs.forEach(function(song){
        const albumSong = document.createElement('div');
        albumSong.classList.add('albumSong');
        albumSong.innerHTML = `
            <span class="trackId">${song.trackId}</span>
            <div>
                <h3>${song.track}</h3>
                <h5 class="feat"> ${song.feat}</h5>
            </div>
            <div class="like">
                <i class="far fa-heart"></i>
            </div>
            <a href="" target="_blank" class="play">
                <i class="far fa-play-circle"></i>
            </a>
        `
        albumSongs.appendChild(albumSong)
    })
}
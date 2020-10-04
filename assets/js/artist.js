let url = new URLSearchParams(window.location.search);

if(url.get("id")){
    showArtist();
}
async function showArtist(id) {
    const resp = await fetch(`./assets/js/data.json`);
    const data = await resp.json();
    let artists = data.artists;
    //console.log(data);
    id = url.get("id")
    let index = artists.findIndex(function (artist) {
        return artist.id == id;
    })
    let artistName = document.querySelector(".artistHeader h1");
    let artistImg = document.querySelector(".artistHeader img");
    let artistAlbums = document.querySelector("#albumsUl");
    let artistSingles = document.querySelector("#singlesUl");

    let albumList = artists[index].albums;
    for(let i = 0; i<albumList.length; i++){
        let li = document.createElement("li");
        li.innerHTML = `<a href="album.html?id=${url.get("id")}&albumId=${albumList[i].albumId}">${albumList[i].album}</a>`
        artistAlbums.appendChild(li)
    }
    let singleList = artists[index].singles;
    for(let i = 0; i<singleList.length; i++){
        let li = document.createElement("li");
        li.innerHTML = `${singleList[i].track}`
        artistSingles.appendChild(li)
    }

    artistName.innerHTML = artists[index].name;
    artistImg.src = artists[index].img;
}



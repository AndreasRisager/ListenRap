


function showArtist(){
    fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=rap&api_key=615b0297208e101fbc822a42b7acfe90&format=json`)
    .then(response => response.json())
    .then(function(data){
        //console.log(artists);
        let result = data.topartists.artist;
        
        let container = document.querySelector(".glider-track");
        let template = document.querySelector("template");
        for(let i=0; i<5; i++){
            console.log(result[i]);

            let clone = template.content.cloneNode(true);
            let img = clone.querySelector("img");
            let name = clone.querySelector("h2");
            
    
            img.src = result[i].image[4]['#text'];
            name.innerText = result[i].name;
            
    
            container.appendChild(clone);
        }
        // result.forEach(function(artist){
            
        // })
    })
        
}
showArtist();

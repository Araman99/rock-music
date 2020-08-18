//get document in variable
const searchSong= document.getElementById("searchSong");
const lyricsShow = document.getElementById("lyricsShow");
const apiUrl = `https://api.lyrics.ovh`;

//check valid search
document.getElementById("searchBtn").addEventListener("click",e=>{
    e.preventDefault();
    const searchValue = searchSong.value.trim();
    if(!searchValue){
        alert("Nothing Searched");
    }
    else{
        getSong(searchValue);
    }
})

//get promise
async function getSong(searchValue) {
    const res = await fetch(`${apiUrl}/suggest/${searchValue}`)
    const data = await res.json();

    displayData(data);

}

//display song list
function displayData(data) {
    lyricsShow.innerHTML = `
    <ul class="song-list">
    ${data.data.slice(0,10).map(song => `<li>
                        <div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-3 my-2 p3">
                        <img src="${song.album.cover}">
                    </div>
                    <div class="col-md-6">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success"> <span data-artist="${song.artist.name}" data-songTitle="${song.title}"> Get Lyrics </span> </button>
                    </div>
                </div>
                </li>
    `).join('')
}
    `
}

//lyrics button
lyricsShow.addEventListener("click", e=>{
    const clickedElement = e.target;
    if (clickedElement.tagName === "span" || "button") {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songTitle');

        getLyrics(artist, songTitle);
    }
})

//display lyrics
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
    const data = await res.json(); 
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    lyricsShow.innerHTML =    ` <div class="d-flex justify-content-end">
                            <button class="btn btn-success" id="reload" onclick="reload()"> Search New Song Lyrics </button>
                            </div>
                            <br>
                            <div class="single-lyrics text-center">
                                <h2 class="text-success mb-4"><strong>${songTitle}</strong><br>- ${artist}</h2>
                                 <pre class="lyric text-white" id="textCopy"><span  id="textCopy">${lyrics}</span></pre>
                             </div>
                             `
}

            function reload() {
            window.location.reload(true);
        }
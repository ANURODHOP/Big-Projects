//Adding playlist inside rside
const cardContainer = document.querySelector(".cardContainer");

async function fetchdata() {
    const response = await fetch("playlists/info.json");
    const data = await response.json()
    const keys = Object.keys(data.playlists)
    for (let i = 0; i < keys.length; i++) {
        let name = keys[i];
        cardContainer.innerHTML = cardContainer.innerHTML + `
        <div class="card">
            <img src="${data.playlists[name].thumbnail}">
            <h2>${data.playlists[name].ptext}</h2>
            <h4>${data.playlists[name].stext}</h4>
            <span><svg><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg></span>
      </div> `
    }
}
fetchdata()

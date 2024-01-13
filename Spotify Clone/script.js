//Convert Sec into Minutes and seconds
function convertSec(seconds) {
    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    // Return the result as a string
    return `${formattedMinutes}:${formattedSeconds}`;
}

//Prev and Next btn
const prev = document.querySelector(".down .fa-arrow-left")
const next = document.querySelector(".down .fa-arrow-right")



//Adding playlist inside rside
const cardContainer = document.querySelector(".cardContainer");
const currSong = new Audio;
const playmute = document.querySelector(".fa-play")

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

    //Function to playSong
    function playsong(lis,i) {
        lis.forEach(li2 => { li2.classList.remove("blueviolet") })
        lis[i].classList.add("blueviolet")
        let songName = lis[i].dataset.song;
        currSong.src = `playlists/${songName}.mp3`
        currSong.play()
        playmute.classList.remove("fa-play");
        playmute.classList.add("fa-pause")
    }

    //Adding The Playlist's song when clicked
    const cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        const ul = document.querySelector(".II .songsContainer")
        let name = keys[i]
        cards[i].addEventListener("click", () => {
            ul.innerHTML = "";
            const songs = data.playlists[name].songs;
            songs.forEach(element => {
                let val = `${name}/${element}`;
                ul.innerHTML += `
                <li style="margin-left: 30px;" class="hover" data-song="${val}">
                <i class="fa-solid fa-music"></i>
                <h4>${element} - ${data.playlists[name].ptext}</h4>
              </li>`
            });
            const lis = ul.querySelectorAll("li");
            var arr = Array.from(lis);
            for (let i = 0; i < lis.length; i++) {
                let index = arr.indexOf(lis[i]);
                lis[i].addEventListener("click", () => {
                    playsong(lis,i)
                })
                prev.addEventListener("click", () => {
                    if(index == 0){
                        index = lis.length;
                    }
                    index--;
                    playsong(lis,index)
                })
                next.addEventListener("click", () => {
                    index++;
                    if(index == lis.length){
                        index = 0;
                    }
                    playsong(lis,index)
                })
                currSong.addEventListener("ended",()=>{
                    index++;
                    if(index == lis.length){
                        index = 0;
                    }
                    playsong(lis,index)
                })
            }

        })
    }

}
fetchdata()
function range() {
    const slider = document.querySelector(".down .slider");
    const currTime = document.querySelector(".time .currTime");
    const duration = document.querySelector(".time .duration");
    const volume = document.querySelector(".down .vol");
    const muteIcon = document.querySelector(".down .fa-volume-high");
    muteIcon.addEventListener("click", () => {
        muteIcon.classList.toggle("fa-volume-xmark")
        if (muteIcon.classList.contains("fa-volume-xmark")) {
            currSong.volume = 0;
        } else {
            currSong.volume = volume.value;
        }
    })
    currSong.addEventListener("loadedmetadata", () => {
        slider.max = currSong.duration;
        slider.value = currSong.currentTime;
        duration.textContent = convertSec(currSong.duration)
        var timerId = setInterval(() => {
            slider.value = currSong.currentTime;
            currTime.textContent = convertSec(slider.value);
        }, 500)
    })
    slider.addEventListener("mouseup", (e) => {
       
        currSong.currentTime = slider.value
    })
    playpause(slider, currTime);


    //Volume
    currSong.volume = volume.value
    volume.addEventListener("mouseup", (e) => {
        e.preventDefault()
        currSong.volume = volume.value
    })
}
range()


//Play and Pause feature
function playpause(slider, currTime) {
    const play = document.querySelector(".playpause");
    play.addEventListener("click", () => {
        if (play.classList.contains("fa-play")) {
            play.classList.remove("fa-play");
            play.classList.add("fa-pause");
            currSong.play()
            clearInterval(timerId)
        }
        else {
            currSong.pause()
            timerId = setInterval(() => {
                slider.value = currSong.currentTime;
                currTime.textContent = convertSec(slider.value);
            }, 500)
            play.classList.add("fa-play");
            play.classList.remove("fa-pause");
        }

    })
}






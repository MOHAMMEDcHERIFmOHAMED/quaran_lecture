let play_btn = document.querySelector(".play_btn i");
let play_btn2 = document.querySelector(".play_btn");
let bar = document.querySelector(" #progress");
let song = document.querySelector(" .song");
let lectur_name = document.querySelector(" #name");
let surah = document.querySelector(" #title");
let  lectur_img = document.querySelector(" #img");
let  lectur_src = document.querySelector(" #sound");


let progress = 0 , index = 0  , data , play = false ;  

//   ________ THE ADDED CHANGES ________________________________________

let file = "quaran.json";

async function getData(){
     let response = await fetch(file) ;
      data = await response.json() ;
     console.log(data);
     lectur_img.src = data[0].img ;
     lectur_name.textContent = data[0].the_lecture ; 
     surah.textContent = data[0].suraht ; 
     lectur_src.src = `${data[0].audio }`;
     song.load();
}
getData();
//   ________ MOVE TO THE NEXT SURAH ________

function nextSurah(){
    index++ ;
    if(index >= data.length)
            index = 0 ; 
    lectur_img.src = data[index].img ;
    lectur_name.textContent = data[index].the_lecture ; 
    surah.textContent = data[index].suraht ; 
    lectur_src.src = `${data[index].audio }`;
    song.load();
    if (play_btn.classList.contains('bx-stop-circle')) {
        song.play();
    } 
}
//   ________ MOVE TO THE PREVIOUS SURAH ________

function prvcSurah(){
    index-- ;
    if(index == data.length || index < 0)
            index = 0 ; 
    lectur_img.src = data[index].img ;
    lectur_name.textContent = data[index].the_lecture ; 
    surah.textContent = data[index].suraht ; 
    lectur_src.src = `${data[index].audio }`;
    song.load();
    if (play_btn.classList.contains('bx-stop-circle')) {
        song.play();
    } 
}

//   ________ END OF CHANGES ________________________________________

function playStop() {
if (play == false ) {
    play_btn.classList.remove('bx-play-circle');
    play_btn.classList.add('bx-stop-circle');
    play = true ;
    song.play();
} else {
    play_btn.classList.remove('bx-stop-circle');
    play_btn.classList.add('bx-play-circle');
    play = false ;
    song.pause();
}
}

song.onloadedmetadata = function(){
bar.max = song.duration ;
bar.value = song.currentTime ;
}
bar.onchange = function playing(){
song.value = bar.currentTime ;
play_btn.classList.add('bx-stop-circle');
song.play();
song.currentTime = bar.value ;
}

let interval = setInterval(function progressBar(){
    bar.value = song.currentTime ;
    if(song.currentTime   === song.duration){
         clearInterval(interval);
     }
},500);

song.onended = function() {
play_btn.classList.remove('bx-stop-circle');
play_btn.classList.add('bx-play-circle');
bar.value = 0;
};

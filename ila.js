var popupsound = document.getElementById("song");

function autoNotify() {
    popupsound.loop = true;
   popupsound.play(); //play the audio file
}

document.getElementById("giftbtn").onclick = function () {
    location.href = "quiz.html";
};



var url = "https://www.skrzypczyk.fr/slideshow.php";
var speed = 4000;
var play_pause_button = $('#play-pause');
var next_button = $("#next");
var previous_button = $("#previous");
var container = $('#rail');
var play = false;
var title = [];
var desc = [];
var current = 0;

$.get(url, {}, function (data) {

    var images = JSON.parse(data);

    for (var i = 0 ; i < images.length ; i ++) {

        container.append('<img src="'+ images[i]['url'] +'" alt="'+ images[i]['title'] +'" width="300px">')

        title[i] = images[i]['title'];
        desc[i] = images[i]['desc'];
    }

    $('#slideshow h2').text(title[current]);
    $('#slideshow p').text(desc[current]);

});

// Next

next_button.click(nextImage);

function nextImage() {
    container.animate({"margin-left":"-300px"}, 2000, changeFirstImg);
    current ++;
    if (current == 3) current = 0;
    $('#slideshow h2').text(title[current]);
    $('#slideshow p').text(desc[current]);
}

function changeFirstImg() {
    container.css('margin-left', '0px');
    $('#rail img:last').after($('#rail img:first'))
}

// Previous

previous_button.click(previousImage);

function previousImage() {
    container.animate({"margin-left":"300px"}, 2000, changeLastImg);
    current --;
    if (current == -1) current = 2;
    $('#slideshow h2').text(title[current]);
    $('#slideshow p').text(desc[current]);
}

function changeLastImg() {
    $('#rail img:first').before($('#rail img:last'));
    container.css('margin-left', '0px');

}

// Play and pause caroussel

if (play) {

    var auto = setInterval(function(){ nextImage() }, speed);
    play_pause_button.html('<i class="fa fa-pause" aria-hidden="true"></i> Pause');

}

else {

    var auto = null;
    play_pause_button.html('<i class="fa fa-play" aria-hidden="true"></i> Play');
}


$(play_pause_button).click(function () {

    if (play) {

        clearInterval(auto);
        play = false;
        $(this).html('<i class="fa fa-play" aria-hidden="true"></i> Play');
    }

    else {

        auto = setInterval(function(){ nextImage() }, speed);
        play = true;
        $(this).html('<i class="fa fa-pause" aria-hidden="true"></i> Pause');
    }

});


// Hover

$(document).on('mouseover' , 'img' , function(){
    clearInterval(auto);
    play = false;
    play_pause_button.html('<i class="fa fa-play" aria-hidden="true"></i> Play');
});

$(document).on('mouseout' , 'img' , function(){
    auto = setInterval(function(){ nextImage() }, speed);
    play = true;
});






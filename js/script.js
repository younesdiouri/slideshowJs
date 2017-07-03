
var speed = 4000;
var play_pause_button = $('#play-pause');
var next_button = $("#next");
var previous_button = $("#previous");
var container = $('#rail');
var play = false;
var title = [];
var desc = [];
var first = 1;

var current = 0;


function getImages() {
    var url = "https://www.skrzypczyk.fr/slideshow.php";
    $.get(url, {}, function (data) {

        var images = JSON.parse(data);

        for (var i = 0 ; i < images.length ; i ++) {

            container.append('<div class = "imageImport" data-id = "'+ i +'" style=\'background-image: url(\"'+ images[i]['url'] +'\");\' title="'+ images[i]['title'] +'">');
            $(".pastillesList").append('<li class = "pastilles" id = "'+ i +'" onclick = "goToImage('+i+')" ></li>');
            title[i] = images[i]['title'];
            desc[i] = images[i]['desc'];
        }
        $('.pastilles:first-child').toggleClass("isActive");
        $('#slideshow h2').text(title[current]);
        $('#slideshow p').text(desc[current]);

    });
}



function disable_buttons (status) {

    if (status) {

        play_pause_button.addClass('disabled');
        next_button.addClass('disabled');
        previous_button.addClass('disabled');
    }

    else {

        play_pause_button.removeClass('disabled');
        next_button.removeClass('disabled');
        previous_button.removeClass('disabled');
    }

}

// Next

next_button.click(nextImage);

function nextImage() {

    if (!next_button.hasClass('disabled')) {

        disable_buttons(true);
        container.animate({"margin-left":"-900px"}, speed, changeFirstImg);
        current ++;
        if (current == 3) current = 0;
        $('#slideshow h2').text(title[current]);
        $('#slideshow p').text(desc[current]);
    }
}

function changeFirstImg() {

   setPastilles();
    container.css('margin-left', '0px');
    $('#rail div.imageImport:last').after($('#rail div.imageImport:first'));
    disable_buttons(false);
    // alert(imageImportId);

}
function setPastilles(){
    var listPastilles = [];
    var imageImportId = $('#rail .imageImport:first').attr('data-id');
    $('.pastilles').each(function() {
        listPastilles.push($(this).attr('id'));
    });
    for (var j = 0; j<listPastilles.length; j++) {

        if (imageImportId == listPastilles[j]) {
            // console.log(j);
            if(first== 1)
            {
                $('.pastilles[id="'+listPastilles[j+1]+'"]').toggleClass("isActive");
                first = false;

            }
            else
            {
                if(j==(listPastilles.length-1))
                {
                    $('.pastilles[id="'+listPastilles[0]+'"]').toggleClass("isActive");
                }
                else
                {
                    $('.pastilles[id="'+listPastilles[j+1]+'"]').toggleClass("isActive");
                }
            }

        }
    }

}

function goToImage(destination)
{
    var source = $('#rail .imageImport:first').attr('data-id');
    // console.log("Destination : " + destination + "Source : " + source);
    if(destination - source > 0)
    {
        var count = destination - source;
        while(count>0)
        {
            nextImage();
            count--;

        }
    }


}
// Previous

previous_button.click(previousImage);

function previousImage() {

    if (!previous_button.hasClass('disabled')) {

        disable_buttons(true);
        changeLastImg();
        container.animate({"margin-left": "0px"},{ duration : speed ,complete: function() { disable_buttons(false); }});
        current--;
        if (current == -1) current = 2;
        $('#slideshow h2').text(title[current]);
        $('#slideshow p').text(desc[current]);
    }
}

function changeLastImg() {
    $('#rail').css('margin-left', '-900px');
    $('#rail div.imageImport:last-child').insertBefore($('#rail div.imageImport:first-child'));

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


play_pause_button.click(function () {

    if (!play_pause_button.hasClass('disabled')) {


        if (play) {

            clearInterval(auto);
            play = false;
            $(this).html('<i class="fa fa-play" aria-hidden="true"></i> Play');
        }

        else {

            auto = setInterval(function () {
                nextImage()
            }, speed);
            play = true;
            $(this).html('<i class="fa fa-pause" aria-hidden="true"></i> Pause');
        }
    }

});


// Hover

$(document).on('mouseover' , '.imageImport' , function(){
    clearInterval(auto);
    play = false;
    play_pause_button.html('<i class="fa fa-play" aria-hidden="true"></i> Play');
});

$(document).on('mouseout' , '.imageImport' , function(){
    auto = setInterval(function(){ nextImage() }, speed);
    play = true;
});





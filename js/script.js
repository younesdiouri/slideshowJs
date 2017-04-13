//var objet = jQuery();
//var objetJquery = $("selecteur css").action();
// Selecteurs css possibles
// #pour ID
// . pour class
// * pour tout
// $("button:first").click( function () {
//     $('p').hide();
// });
// $("button").eq(1).click( function () {
//   $("p").show();
// });
// $("button:last").click( function () {
//     $("p").toggle();
// });
// next.click next image

// fonction nextImage : animate(margin-left : -300px , 2000(time), changeFirstImgcakkback)
//function changeirstimg^rail.css(margin-left,0px)
//je selectione ma derniere image et apres la dernière image je viens y mettre la première.
// COMPLEXITE SUPPLEMENTAIRE : SI ON DESACTIVE LE JS DANS LE NAVIGATEUR, METTRE UN MESSAGE "il n'y a pas de js dans le nav"
$("#next").click(nextImage);

function nextImage() {
    $('#rail').animate({"margin-left":"-300px"}, 2000, changeFirstImg)
}

function changeFirstImg() {
    $('#rail').css('margin-left', '0px');
    $('#rail img:last').after($('#rail img:first'))
}
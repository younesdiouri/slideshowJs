/* Commentaires */
// Commentaires
var nb, premier = true, i=2;
do {
    do {
        nb = prompt("Saisir un entier");
    }while( !Number.isInteger(parseFloat(nb)) );
    for(var cpt=2;cpt<= Math.sqrt(nb);cpt++)
    {
        if(nb%i == false)
        {
            premier = false;
            break;
        }
    }
    if(premier == true && nb >= i)
    {
        alert("Le nombre "+ nb +" est premier");
    }
    else
    {
        alert("Le nombre "+ nb +" n'est pas premier");
    }
    var bool = confirm("Voulez-vous continuer à jouer?");
}while (bool == true);
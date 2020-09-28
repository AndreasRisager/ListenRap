// JavaScript Document

//Array med fotos og caption tekst og title
const fotoArray = ["slideshow0", "slideshow1", "slideshow2"];
const titleArray = ["The Circle", "The Bored Ranger", "Get in!"]
const textArray = ["I 2044 arbejder 30-årige Joe for et Kansas City-kriminalsyndikat som en looper. Siden fremtidens teknologi...", "En American Indian spirit kriger, Tonto (Depp), beretter om de utallige historier, der forvandlede...", "En sort mand, Andre Hayworth, bliver bortført, mens han går gennem en forstad sent om aftenen...."];
//selecter det store billede
const bigImg = document.querySelector("#bigImg");
//laver en "tæller" og laver variblen 'nyFoto' som vi laver om på senere.
let index = 0;
let nyFoto;

//selecter fontawesome pile og laver en nodelist og tilføjer eventlistener som kalder funktionen change.
const arrows = document.querySelectorAll("#gallery i");
for (let i = 0; i < arrows.length; i++) {
	arrows[i].addEventListener("click", change);
}

function change(e) {
	if (e.target.getAttribute("id") === "next") {
		if (index < fotoArray.length - 1) {
			index++;
		} else {
			index = 0;
		}
	} else {
		if (index > 0) {
			index--;
		} else {
			index = fotoArray.length - 1;
		}
	}
	//ændr billedstien
	nyFoto = "images/" + fotoArray[index] + ".jpg";
	bigImg.setAttribute("src", nyFoto);
	//ændr caption via 'textArray'.
	document.querySelector(".caption-title").textContent = titleArray[index];
	document.querySelector(".caption").textContent = textArray[index];
}


//READ MORE
const knap = document.querySelectorAll(".more");
for (let i = 0; i < knap.length; i++) {
    knap[i].addEventListener("click", more);
}

function more(e) {
    let btn = e.target;
    let tekst = btn.parentNode.querySelector(".moreText");

    if(tekst.style.display!=="inline-block"){
        tekst.style.display = "inline-block";
        btn.textContent="Læs Mindre...";
    }else{
        tekst.style.display = "none";
        btn.textContent="Læs mere...";
    }
}


//HAMBURGER MENU
if (document.querySelector("#burger")) {
	document.querySelector("#burger").addEventListener("click", hamburger);
}

function hamburger() {
	var nav = document.querySelector("nav ul");
	if (nav.style.display !== "block") {
		nav.style.display = "block";
	} else {
		nav.style.display = "none";
	}
}

//FORM VALIDATION
const besked = document.querySelector("#besked");

document.querySelector("#form").addEventListener("submit", valider);

function valider(){
    //hvis der ikke står noget skal den ikke sende formularen men skrive "skriv et navn" osv.
    if(this.name.value === ""){
        this.name.focus();
        besked.textContent = "Skriv et navn!";
        event.preventDefault();
        return false;
	}
    if(this.email.value === ""){
        this.email.focus();
        besked.textContent = "Skriv din email!";
        event.preventDefault();
        return false;
	}
	if(this.comment.value === ""){
        this.comment.focus();
        besked.textContent = "Skriv din besked!";
        event.preventDefault();
        return false;
	}
	
    var atpos = this.email.value.indexOf("@");
    var dotpos = this.email.value.lastIndexOf(".");
    if(atpos <= 0){
        this.email.focus();
        besked.textContent = "Skal indeholde et @ som ikke må være det første tegn i en mailadresse";
        event.preventDefault();
        return false;
    }
    if(dotpos < atpos +2){
        this.email.focus();
        besked.textContent = "Der skal være minimum ét tegn mellem @ og det sidste punktum";
        event.preventDefault();
        return false;
    }
    if(this.email.value.length <= dotpos + 2){
        this.email.focus();
        besked.textContent = "Der skal være minimum to tegn efter det sidste punktum";
        event.preventDefault();
        return false;
	}
}




//THUMBNAIL GALLERY
const thumbs = document.querySelectorAll(".thumb");
const thumbArray = Array.from(thumbs);

for (let i=0; i<thumbs.length; i++){
    thumbs[i].addEventListener("click", skift);
}
function skift(e){
    let foto=e.target.getAttribute("src");
    bigImage.setAttribute("src", foto);
};

import {encryption} from "./encryption.js";
import {showHide} from "./showHideElement.js";

const getResetBtn = document.querySelector("#rstBtn");// dugme "ponisti"
function handleResetBtn(){
    showHide("show","#btnIzaberiFajl")// prikazi dugme "izaberite fajl" nakon sto je pritisnuto "ponisti"
    showHide("hide","#fileUploadedName")//sakrij ime fajla
    showHide("hide",".inlnBlck")// sakrij ikonicu fajla
    showHide("hide", "#resetDiv")
    showHide("hide","#startEncryption")
}
getResetBtn.addEventListener("click",handleResetBtn);

const startEncryptionBtn = document.querySelector("#startEncryption")
startEncryptionBtn.addEventListener("click",encryption); // pokreni enkripciju i nakon uspesno obavljene enkripcije prikazi dugme za skidanje enkriptovanog fajla i podataka neophodnih za dekripciju
// sada bi trebalo da se poyove funkcija koja preuima 
//vec postojeci kljuc za enkripciju podataka ako je cekirano "Unesite postojece zadatke za enkripciju"

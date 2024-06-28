import {encryption} from "./encryption.js";
import {showHide} from "./showHideElement.js";

const getResetBtn = document.querySelector("#rstBtn");// dugme "ponisti"
function showFileUploadBtn(){
    showHide("show","#btnIzaberiFajl")// prikazi dugme "izaberite fajl" nakon sto je pritisnuto "ponisti"
    showHide("hide", "#rstBtn")
}
getResetBtn.addEventListener("click",showFileUploadBtn);

const startEncryption = document.querySelector("#startEncryption")
startEncryption.addEventListener("click",encryption);
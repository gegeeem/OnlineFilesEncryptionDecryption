import {encryption} from "./encryption.js";
import {showHide} from "./showHideElement.js";
//enkripcija
const getCheckBoxForUploadingData = document.querySelector("#userKeyIVch")// checked button " unesite postojece poadtake"
window.addEventListener("load",()=>{getCheckBoxForUploadingData.checked = false}) // reset checked btn
const getResetBtnEnc = document.querySelector("#rstBtn");// dugme "ponisti"
function handleResetBtn(){
    showHide("show","#btnIzaberiFajl")// prikazi dugme "izaberite fajl" nakon sto je pritisnuto "ponisti"
    showHide("hide","#fileUploadedName")//sakrij ime fajla
    showHide("hide",".inlnBlck")// sakrij ikonicu fajla
    showHide("hide", "#resetDiv")
    showHide("hide","#startEncryption")
    showHide("hide","#nakonEnkripcije")// sakrij rezultate enkripcije 
    getCheckBoxForUploadingData.checked = false;// resetuj checked btn "Unesite postojece podatke za enkripciju"
}
getResetBtnEnc.addEventListener("click",handleResetBtn);

const startEncryptionBtn = document.querySelector("#startEncryption")
startEncryptionBtn.addEventListener("click",encryption); // pokreni enkripciju i nakon uspesno obavljene enkripcije prikazi dugme za skidanje enkriptovanog fajla i podataka neophodnih za dekripciju
// sada bi trebalo da se poyove funkcija koja preuima 
//vec postojeci kljuc za enkripciju podataka ako je cekirano "Unesite postojece zadatke za enkripciju"
function handleGetChechBoxForUploadingData (){
    showHide("hide","#startEncryption")
}
getCheckBoxForUploadingData.addEventListener("click",handleGetChechBoxForUploadingData)

// dekripcija

const getRstBtnForDec = document.querySelector("#resetBtnForDec");

function handleRstBtnForDec(){
    const getFileUploadedNameForDec = document.querySelector("#textForDecFile");
    showHide("show","#fileUploadedDec");// prikazi dugme "Izaberi fajl"
    showHide("hide","#fileUploadedNameDec")//sakrij ime fajla
    showHide("hide",".keyAndIVDec")// sakrij podatke za enkripciju
    showHide("hide", ".btnForDecEndHeaderLine")// sakrij "pokreni dekripciju" dugme
    showHide("hide",".displayEncryptedTxtDEC")
    showHide("hide","#resetBtnForDec"); // sakrij "ponisti" dugme, tj ovo dugme na kojem je eventListener pozvan

}
getRstBtnForDec.addEventListener("click", handleRstBtnForDec)

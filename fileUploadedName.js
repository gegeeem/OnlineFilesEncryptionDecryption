import {showHide} from "./showHideElement.js"
function scrollToElement (id){
    const getElToScroll = document.querySelector(id);
    const rect = getElToScroll.getBoundingClientRect();
    window.scrollTo({
        top:rect.top,
        left:0,
        behavior:"smooth"
    })

}
function  displayFileUploadedName(idOfInpuFile, idSpan, displayFileType){
    const file = document.querySelector(idOfInpuFile);
    const getSpanDisplayFileName = document.querySelector(idSpan)
    
   
    


    const getFileUploadedNam = ()=>{
        getSpanDisplayFileName.innerHTML = file.files[0].name.slice(0,15)+"...";
         //prikazi tip fajla na ikoni
        const getIconFileToDisplayType = document.querySelector(displayFileType)
        if(getIconFileToDisplayType){
            const fileType = file.files[0].type;// file type, example "image/png"
            const dashIndex = file.files[0].type.indexOf("/")// find index of dash "/"
            const extensionFile = fileType.slice(dashIndex + 1, dashIndex + 5)// slice string and get png
            getIconFileToDisplayType.textContent = extensionFile; // dodeli format "png"

        }
    showHide("show","#fileUploadedName")//sakrij ime fajla
       
        showHide("show", ".inlnBlck")// prikazi ikonicu fajla
        showHide("hide","#btnIzaberiFajl")// sakrij dugme "izaberite fajl"
        showHide("show","#resetDiv"); // prikazi "ponisti" dugme
        showHide("show","#startEncryption") // prikazi "Pokreni enkripciju dugme"
        scrollToElement("#startEncryption")
        showHide("show", ".userKeyIVLabel")
        showHide("show", "#btnForDec")

    }
    
    file.addEventListener("change",getFileUploadedNam)
}

displayFileUploadedName("#textForEncFile", "#displayNameOfUploadedFile","#fileExtension")
displayFileUploadedName("#textForDecFile","#encryptedFileUploadedName")
displayFileUploadedName("#dataForDec","#dataForDecryption")




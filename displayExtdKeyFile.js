export function dispalyExstdKeyFileIconAndName(fileName, fileFormat){
    
    const getSpanTxt = document.querySelector("#displayNameOfUploadedKeyFile")// get span to display name of key file
    getSpanTxt.innerHTML = fileName
    const getSpanIcon = document.querySelector("#fileExtensionForExstKey")// get span to display extension
    getSpanIcon.innerHTML = fileFormat
}
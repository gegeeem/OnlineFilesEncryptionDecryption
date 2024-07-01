import {showHide} from "./showHideElement.js"
import {salt, wrapCryptoKey} from "./wrapingKey.js"
import {createFileForDownload} from "./workingWithFiles.js"
import{_arrayBufferToBase64,base64ToArrayBuffer} from "./convertingDataTypes.js"
import {spin} from "./spinner.js"

export function encryption(){
    spin(".spinnerEnc","addSpinner");
    let  key, iv, ciphertext, wrappedKey;
    const getUploadedFile = document.querySelector("#textForEncFile");
    const reader = new FileReader();
    reader.readAsArrayBuffer(getUploadedFile.files[0]);// ucitaj uploadovani fajl kao arrayOfBuffer
    reader.onload = async ()=>{// nakon zavrsetka ocitavanja fajla
        iv =  window.crypto.getRandomValues(new Uint8Array(12)) // generisanje iv-a
        key =  await window.crypto.subtle.generateKey( // gerisanje kljuca
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt","decrypt"]
        );
        console.log("generisani kljuc key=>",key)
        ciphertext = await window.crypto.subtle.encrypt(// enkripcija uploadovanog fajla
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            reader.result).then(res=>{
               
                // ciphertext = res; // dodeli reyultat sifrovanja
                // console.log(ciphertext)
                createFileForDownload("#dowloadEncFile","data:application/octet-stream;base64,"+_arrayBufferToBase64(res),getUploadedFile.files[0].name+".enc");
                wrapCryptoKey(key).then(res=>{
                    console.log("wrapovani kljuc"+res[0]+" salt vrednost: "+res[1])
                    wrappedKey = res[0].toString();
                    console.group("wrappedKey", wrappedKey)
                    const DataForDecryption = {
                        type: getUploadedFile.files[0].type,
                        key:  wrappedKey, //mora export as funkcija
                        iv: iv.toString(),
                        salt: res[1].toString(),
                    }
                    console.log("DataForDec> ",DataForDecryption)
            
                    createFileForDownload("#dataFromEncryption","data:application/json;utf8,"+JSON.stringify(DataForDecryption),"podaci za dekripciju");
        
                    showHide("show","#nakonEnkripcije");
                    showHide("hide",".userKeyIVLabel")
                    const getDataEncryptionHeader = document.querySelector("#encFileHeader");
                    const rect = getDataEncryptionHeader.getBoundingClientRect();

                    const bodyy =document.body.getBoundingClientRect()
                    // window.scroll(rect.top - bodyy.bottom, 0);
                     spin(".spinnerEnc","removeSpinner");

                    window.scroll({
                        top: rect.top,
                        left:0,
                        behavior:"smooth"
                    });

                    

                });
                
                

            }).catch(e=>{alert("Greška! Netačni parametri za enkripciju ili greška u aplikaciji.")})
    
    
        
        
    
    
    }
}


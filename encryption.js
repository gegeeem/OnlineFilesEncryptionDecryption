import {showHide} from "./showHideElement.js"
import {salt, wrapCryptoKey} from "./wrapingKey.js"
import {createFileForDownload} from "./workingWithFiles.js"
import{_arrayBufferToBase64,base64ToArrayBuffer} from "./convertingDataTypes.js"

function encryption(){
    let  key, iv, ciphertext, wrappedKey;
    const getUploadedFile = document.querySelector("#textForEncFile");
    const reader = new FileReader();
    reader.readAsArrayBuffer(getUploadedFile.files[0]);// ucitaj uploadovani fajl kao arrayOfBuffer
    reader.onload = async ()=>{// nakon zavrsetka ocitavanja
        iv =  window.crypto.getRandomValues(new Uint8Array(12)) // generisanje iv-a
        key =  await window.crypto.subtle.generateKey( // gerisanje kljuca
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt","decrypt"]
        );
        ciphertext = await window.crypto.subtle.encrypt(// enkripcija uploadovanog fajla
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            reader.result).then(res=>{
                                        // ciphertext = res; // dodeli reyultat sifrovanja
                                        // console.log(ciphertext)
                                        showHide("show","#nakonEnkripcije")
                                        createFileForDownload("#dowloadEncFile","data:"+getUploadedFile.files[0].type+";base64,"+_arrayBufferToBase64(res),"enkriptovani_fajl");
                                        wrapCryptoKey(key).then(res=>{
                                                                console.log("wrapovani kljuc"+res[0]+" salt vrednost: "+res[1])
                                                                wrappedKey = res.toString();
                                                                console.group("wrappedKey", wrappedKey)
                                                                const DataForDecryption = {
                                                                    key:  wrappedKey, //mora export as funkcija
                                                                    iv: iv.toString(),
                                                                    salt: salt.toString(),
                                                                }
                                                                console.log("DataForDec> ",DataForDecryption)
                                                                createFileForDownload("#dataForDecryption","data:application/json;utf8,"+JSON.stringify(DataForDecryption),"podaci_za_dekripciju");
                                                            }
                                                        );
                

                                })
    
    
        
        
    
    
    }
}
const startEncryption = document.querySelector("#startEncryption")
startEncryption.addEventListener("click",encryption);

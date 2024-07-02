import {unwrappingKey} from "./unwrapingKey.js"
import {_arrayBufferToBase64} from "./convertingDataTypes.js"
import {createFileForDownload} from "./workingWithFiles.js"
import { showHide } from "./showHideElement.js";
import {spin} from "./spinner.js"

function decryption(){
    spin(".spinnerDec","addSpinner")// start spinnig btn
    let plainTxt, key, salt, iv;
    const getUploadedFile = document.querySelector("#textForDecFile");
    const readerForEncryptedFile = new FileReader();
    readerForEncryptedFile.readAsArrayBuffer(getUploadedFile.files[0])
    readerForEncryptedFile.onload =  ()=>{
        const dataFromEnc = document.querySelector("#dataForDec")
        const readerDataForDec = new FileReader();
        readerDataForDec.readAsText(dataFromEnc.files[0])
        readerDataForDec.onload = async ()=>{
            const DataForDec = JSON.parse(readerDataForDec.result)
            console.log("dataFromEnc",DataForDec);
            const fileType = DataForDec.type;
            const  keyWrapped = DataForDec.key;
            const  rawKey = keyWrapped.split(",").map((el) =>Number(el));
            salt = DataForDec.salt.split(",").map((el)=>Number(el));
            iv = new Uint8Array(DataForDec.iv.split(",").map((el)=>Number(el)));

            // console.log("wrapped key", keyWrapped)
            // console.log("rawKey",rawKey);
            // console.log("salt",salt);
            //  unwrappingKey([198,125,128,95,208,132,125,155,5,215,248,73,240,117,182,235,140,17,111,197,181,220,165,146,123,97,52,23,15,205,170,212,67,205,25,202,169,227,92,237],[188,138,204,91,32,176,54,22,129,188,5,145,181,236,253,104]).then(res=>{console.log(res)})

            key = await unwrappingKey(rawKey,salt).catch(e=>{
                alert("Pogrešno uneti podaci! Pokušajte ponovo.");
                spin(".spinnerDec","removeSpinner")

            });
            await window.crypto.subtle.decrypt({
                name:"AES-GCM",
                iv: iv
            },
            key,
            readerForEncryptedFile.result
        ).then(ciphertext=>{
            console.log(_arrayBufferToBase64(ciphertext))
            createFileForDownload("#downloadDecFile","data:"+fileType+";base64,"+_arrayBufferToBase64(ciphertext),"dekriptovani_fajl");
            if (navigator.maxTouchPoints > 1){ 
    
                showHide("show","#iframeForMoblie")
                createFileForDownload("#iframeForMoblie","data:"+fileType+";base64,"+_arrayBufferToBase64(ciphertext),"dekriptovani_fajl");
                setTimeout(()=>{
                    window.open("data:"+fileType+";base64,"+_arrayBufferToBase64(ciphertext),"_self");
                    window.open("data:application/octet-stream;base64,"+_arrayBufferToBase64(ciphertext),"_self")
                    // window.open(encodeURIComponent("data:"+fileType+";base64,"+_arrayBufferToBase64(ciphertext)), "mozillaWindow", "popup");
                })
               
                alert("mobilni je")
            }
            

            showHide("show", ".displayEncryptedTxtDEC")
            spin(".spinnerDec","removeSpinner")
            
            window.scrollTo(0, document.body.scrollHeight);
        }).catch(e=>{
            alert("Pogrešno uneti podaci! Pokušajte ponovo.") 
            spin(".spinnerDec","removeSpinner")

        })
        


            // key = await unwrappingKey([171,223,14,36,201,233,233,120,164,68,217,192,226,80,224,39,199,235,239,60,212,169,100,23,61,54,244,197,160,80,109,230,207,225,57,197,175,71,80,209],
            //     [89,113,135,234,168,204,21,36,55,93,1,132,242,242,192,156]).then(res=>{console.log(res)})
        //     await window.crypto.subtle.importKey("raw", key,"AES-GCM", true, ["encrypt","decrypt"]).then(res=>{
        //          // unwrappingKey([206,143,152,149,237,153,118,225,163,21,25,145,41,232,182,86,26,201,8,77,184,105,89,61,1,228,22,13,186,102,107,22,210,226,70,6,108,181,169,126,231,135,4,15,69,141,5,130,146,175,9,16,17,31,131,181],[231,135,4,15,69,141,5,130,146,175,9,16,17,31,131,181]).then(res=>{console.log(res)})
        //     window.crypto.subtle.decrypt({
        //         name: "AES-GCM",
        //         iv: iv
        //     },
        //     res,
        //     readerForEncryptedFile.result
        // ).then(res=>{console.log(res)}).catch(err=>{console.log(err)})
        //     })
           
            



        }
    }
}

const getBtnForDec = document.querySelector("#btnForDec");
getBtnForDec.addEventListener("click",decryption)
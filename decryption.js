import {unwrappingKey} from "./unwrapingKey.js"
function decryption(){
    let plainTxt, key, salt, iv;
    const getUploadedFile = document.querySelector("#textForDecFile");
    const readerForEncryptedFile = new FileReader();
    readerForEncryptedFile.readAsArrayBuffer(getUploadedFile.files[0])
    readerForEncryptedFile.onload = async ()=>{
        const dataFromEnc = document.querySelector("#dataForDec")
        const readerDataForDec = new FileReader();
        readerDataForDec.readAsText(dataFromEnc.files[0])
        readerDataForDec.onload =async ()=>{
            const DataForDec = JSON.parse(readerDataForDec.result)
            const  keyWrapped = DataForDec.key;
            const  rawKey = keyWrapped.split(",").map((el) => parseInt(el, 10))
            salt = DataForDec.salt.split(",").map((el)=>parseInt(el, 10));
            iv = DataForDec.iv.split(",").map((el)=>parseInt(el, 10));

            console.log("wrapped key", keyWrapped)
            console.log("rawKey",rawKey);
            console.log("salt",salt);

            key = await unwrappingKey(rawKey, salt).then(res=>{console.log(res)}).catch(err=>{console.log(err)})
            await window.crypto.subtle.importKey("raw", key,"AES-GCM", true, ["encrypt","decrypt"]).then(res=>{
                 // unwrappingKey([206,143,152,149,237,153,118,225,163,21,25,145,41,232,182,86,26,201,8,77,184,105,89,61,1,228,22,13,186,102,107,22,210,226,70,6,108,181,169,126,231,135,4,15,69,141,5,130,146,175,9,16,17,31,131,181],[231,135,4,15,69,141,5,130,146,175,9,16,17,31,131,181]).then(res=>{console.log(res)})
            window.crypto.subtle.decrypt({
                name: "AES-GCM",
                iv: iv
            },
            res,
            readerForEncryptedFile.result
        ).then(res=>{console.log(res)}).catch(err=>{console.log(err)})
            })
           
            



        }
    }
}

const getBtnForDec = document.querySelector("#btnForDec");
getBtnForDec.addEventListener("click",decryption)
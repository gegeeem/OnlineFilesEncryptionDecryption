import {spin} from "./spinner.js"
    export let salt;
  
    /*
    Get some key material to use as input to the deriveKey method.
    The key material is a password supplied by the user.
    */
    export function getKeyMaterial() {
      console.log("invoked func=>getKeyMaterial() ");
      let password = window.prompt("Unesite šifru");
      while(password == false){
        console.log("password", password)
        password = window.prompt("Niste uneli šifru! Pokupajte ponovo")

      }
      if(password == null){
        return undefined
      }
      console.log("password", password)
      const enc = new TextEncoder();
      return window.crypto.subtle.importKey(
        "raw", 
        enc.encode(password), 
        {name: "PBKDF2"}, 
        false, 
        ["deriveBits", "deriveKey"]
      );
    }
  
    /*
    Given some key material and some random salt
    derive an AES-KW key using PBKDF2.
    */
   export function getKey(keyMaterial, salt) {
    console.log("invoked func=>getKey() ");

      return window.crypto.subtle.deriveKey(
        {
          "name": "PBKDF2",
          salt: salt, 
          "iterations": 100000,
          "hash": "SHA-256"
        },
        keyMaterial,
        { "name": "AES-KW", "length": 256},
        true,
        [ "wrapKey", "unwrapKey" ]
      ).catch(e=>{
        alert("Niste uneli šifru! Pokušajte ponovo!");
        spin(".spinnerEnc","removeSpinner");

      })
    }
  
    /*
    Wrap the given key and write it into the "wrapped-key" space.
    */
   export async function wrapCryptoKey(keyToWrap) {
    console.log("invoked func=> wrapCryptoKey(keyToWrap) ");

      // get the key encryption key
      const keyMaterial = await getKeyMaterial();
      salt = window.crypto.getRandomValues(new Uint8Array(16));
      // salt =new Uint8Array([144,99,55,125,200,161,2,197,1,115,137,127,111,195,114,244]);

      const wrappingKey = await getKey(keyMaterial, salt);
  
      const wrapped = await window.crypto.subtle.wrapKey(
        "raw",
        keyToWrap,
        wrappingKey,
        "AES-KW"
      );
      console.log("wrapped", wrapped);
      const wrappedKeyBuffer = new Uint8Array(wrapped);
      console.log("wrapppedKeyBuffer",wrappedKeyBuffer)
  
      // const wrappedKeyOutput = document.querySelector(".wrapped-key");
      // wrappedKeyOutput.classList.add("fade-in");
      // wrappedKeyOutput.addEventListener("animationend", () => {
      //   wrappedKeyOutput.classList.remove("fade-in");
      // });
      // wrappedKeyOutput.textContent = `[${wrappedKeyBuffer}] salt ${salt}`;
      console.log( `{wrappedKeyBuffer}:==>[${wrappedKeyBuffer}] {salt}==> ${salt}`);
      return [wrappedKeyBuffer, salt];
    }
  
    /*
    Generate an encrypt/decrypt secret key,
    then set up an event listener on the "Wrap" button.
    */
    // window.crypto.subtle.generateKey(
    //   {
    //     name: "AES-GCM",
    //     length: 256,
    //   },
    //   true,
    //   ["encrypt", "decrypt"]
    // ).then((secretKey) => {
      
    //     wrapCryptoKey(secretKey);
     
  
    // });
  
 
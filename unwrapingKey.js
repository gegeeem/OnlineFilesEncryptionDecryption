export  function unwrappingKey(wrappedKeyBytes, saltBytes){
    /*
    Convert an array of byte values to an ArrayBuffer.
    */
    function bytesToArrayBuffer(bytes) {
        const bytesAsArrayBuffer = new ArrayBuffer(bytes.length);
        const bytesUint8 = new Uint8Array(bytesAsArrayBuffer);
        bytesUint8.set(bytes);
        return bytesAsArrayBuffer;
      }
    
      /*
      Get some key material to use as input to the deriveKey method.
      The key material is a password supplied by the user.
      */
      function getKeyMaterial() {
        const password = window.prompt("Unesite sifru");
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
      Derive an AES-KW key using PBKDF2.
      */
      async function getUnwrappingKey() {
        // 1. get the key material (user-supplied password)
        const keyMaterial = await getKeyMaterial();
        // 2 initialize the salt parameter.
        // The salt must match the salt originally used to derive the key.
        // In this example it's supplied as a constant "saltBytes".
        const saltBuffer = bytesToArrayBuffer(saltBytes);
        // console.log("const saltBuffer = bytesToArrayBuffer(saltBytes)===>",saltBuffer)
        // 3 derive the key from key material and salt
        return window.crypto.subtle.deriveKey(
          {
            "name": "PBKDF2",
            salt: saltBuffer,
            "iterations": 100000,
            "hash": "SHA-256"
          },
          keyMaterial,
          { "name": "AES-KW", "length": 256},
          true,
          [ "wrapKey", "unwrapKey" ]
        );
      }
    
      /*
      Unwrap an AES secret key from an ArrayBuffer containing the raw bytes.
      Takes an array containing the bytes, and returns a Promise
      that will resolve to a CryptoKey representing the secret key.
      */
      async function unwrapSecretKey(wrappedKey) {
     

        // 1. get the unwrapping key
        const unwrappingKey = await getUnwrappingKey();
        // 2. initialize the wrapped key
        const wrappedKeyBuffer = bytesToArrayBuffer(wrappedKey);
        // 3. unwrap the key
        return window.crypto.subtle.unwrapKey(
          "raw",                 // import format
          wrappedKeyBuffer,      // ArrayBuffer representing key to unwrap
          unwrappingKey,         // CryptoKey representing key encryption key
          "AES-KW",              // algorithm identifier for key encryption key
          "AES-GCM",             // algorithm identifier for key to unwrap
          true,                  // extractability of key to unwrap
          ["encrypt", "decrypt"] // key usages for key to unwrap
        );
      }
    return  unwrapSecretKey(wrappedKeyBytes)

}
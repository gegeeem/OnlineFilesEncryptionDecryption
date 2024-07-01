const selectEnc = document.querySelector(".encryptionSlct");
const checkEnc = document.querySelector("#encCheck");
const selectDec = document.querySelector(".decryptionSlct");
const checkDec = document.querySelector("#decCheck");


const handleSelectEnc = () => {
 
  selectEnc.classList.add("selected");
  selectDec.classList.remove("selected");
  document.querySelector(".encryption").classList.remove("hide");
  checkEnc.classList.remove("hide");
  document.querySelector(".decryption").classList.add("hide");
  checkDec.classList.add("hide")

};
selectEnc.addEventListener("click", handleSelectEnc);

const handleSelectDec = () => {

  selectDec.classList.add("selected");
  selectEnc.classList.remove("selected");
  document.querySelector(".decryption").classList.remove("hide");
  checkDec.classList.remove("hide")
  document.querySelector(".encryption").classList.add("hide");
  checkEnc.classList.add("hide");
};
selectDec.addEventListener("click", handleSelectDec);

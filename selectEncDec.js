const selectEnc = document.querySelector(".encryptionSlct");
const selectDec = document.querySelector(".decryptionSlct");

const handleSelectEnc = () => {
  console.log("handleSelectEnc = () => invoked")
  selectEnc.classList.add("selected");
  selectDec.classList.remove("selected");
  document.querySelector(".encryption").classList.remove("hide");
  document.querySelector(".decryption").classList.add("hide");
};
selectEnc.addEventListener("click", handleSelectEnc);

const handleSelectDec = () => {
  console.log("handleSelectDec = () => { invoked")

  selectDec.classList.add("selected");
  selectEnc.classList.remove("selected");
  document.querySelector(".decryption").classList.remove("hide");
  document.querySelector(".encryption").classList.add("hide");
};
selectDec.addEventListener("click", handleSelectDec);

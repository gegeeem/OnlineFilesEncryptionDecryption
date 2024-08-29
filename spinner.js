export function spin(idOrClsOfElmnt, removeAdd) {
	// spinerEnc for encryption and spinerDec for dekryption button
	const getElem = document.querySelector(idOrClsOfElmnt);
	if (idOrClsOfElmnt == ".spinnerEnc" || idOrClsOfElmnt == ".spinnerEncExt") {
		if (removeAdd == "addSpinner") {
			getElem.classList.remove("fa-lock");
			getElem.classList.add("fa-spinner", "fa-pulse");
		}
		if (removeAdd == "removeSpinner") {
			getElem.classList.remove("fa-spinner", "fa-pulse");
			getElem.classList.add("fa-lock");
		}
	}
	if (idOrClsOfElmnt == ".spinnerDec") {
		if (removeAdd == "addSpinner") {
			getElem.classList.remove("fa-unlock");
			getElem.classList.add("fa-spinner", "fa-pulse");
		}
		if (removeAdd == "removeSpinner") {
			getElem.classList.remove("fa-spinner", "fa-pulse");
			getElem.classList.add("fa-unlock");
		}
	}
}

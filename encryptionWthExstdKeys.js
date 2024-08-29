import { unwrappingKey, userPass } from "./unwrapingKey.js";
import { getKey } from "./wrapingKey.js";
import { showHide } from "./showHideElement.js";
import { spin } from "./spinner.js";
import { createFileForDownload } from "./workingWithFiles.js";
import { _arrayBufferToBase64 } from "./convertingDataTypes.js";
function getKeyMaterial(password) {
	if (password == null) {
		return undefined;
	}
	console.log("password", password);
	const enc = new TextEncoder();
	return window.crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{ name: "PBKDF2" },
		false,
		["deriveBits", "deriveKey"]
	);
}
export function encryptionWthExtdKeys() {
	spin(".spinnerEncExt", "addSpinner");
	let unwrappedKey, wrappedKey, iv, salt;

	const getFileUploaded = document.querySelector("#textForEncFile"); // fajl za enkripciju
	const reader = new FileReader();
	reader.readAsArrayBuffer(getFileUploaded.files[0]);
	reader.onload = () => {
		const getExstdKeyFile = document.querySelector("#jwk"); // fajl sa postojecim podacima za enkripciju
		const reader2 = new FileReader();
		reader2.readAsText(getExstdKeyFile.files[0]);
		reader2.onload = async () => {
			showHide("hide", "#jwk"); /// NE RADI jer je hidden
			const dataForEnc = JSON.parse(reader2.result);
			wrappedKey = dataForEnc.key.split(",").map((el) => Number(el)); // pretvori string u raw key format
			salt = dataForEnc.salt.split(",").map((el) => Number(el)); // salt vrednost
			unwrappedKey = await unwrappingKey(wrappedKey, salt); // dekriptovani glavni kljuc
			iv = new Uint8Array(dataForEnc.iv.split(",").map((el) => Number(el))); // gnerisanje iiv vrednosti

			await window.crypto.subtle
				.encrypt(
					{
						name: "AES-GCM",
						iv: iv,
					},
					unwrappedKey,
					reader.result
				)
				.then(async (res) => {
					createFileForDownload(
						"#dowloadEncFile",
						"data:text/plain;base64," + _arrayBufferToBase64(res),
						getFileUploaded.files[0].name
					); // generisei enkriptovani fajl za preuzimanje
					// generisanje podataka za dekripciju
					const newSalt = window.crypto.getRandomValues(new Uint8Array(16));
					const newWrappingKey = await getKey(userPass, newSalt);
					await window.crypto.subtle
						.wrapKey(
							// wrapuj postojeci glavni kljuc sa kljucem generisanim istom sifrom
							"raw",
							unwrappedKey, // kljuc za wrappovanje
							newWrappingKey, // kljuce kojim se wrappuje
							"AES-KW"
						)
						.then((res) => {
							const wrappedKeyBuffer = new Uint8Array(res);
							const DataForDec = {
								type: getFileUploaded.files[0].type,
								key: wrappedKeyBuffer.toString(), //  arrayOfBuff u string
								iv: iv.toString(),
								salt: newSalt.toString(), //iz
							};
							createFileForDownload(
								"#dataFromEncryption",
								"data:application/json;utf8," + JSON.stringify(DataForDec),
								"podaci za dekripciju"
							);

							showHide("show", "#nakonEnkripcije");
							showHide("hide", ".userKeyIVLabel");
							window.scrollTo(0, document.body.scrollHeight);
							spin(".spinnerEncExt", "removeSpinner");
						});
				});
		};
	};
}

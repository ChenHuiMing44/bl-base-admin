/* eslint-disable no-empty-label */
import CryptoJS from "crypto-js";
import {aesKey} from "../config/config"

/**
 * @2019/4/16
 * @author: huiming
 * @params: word string
 * desc:  aes 解密
 */
export const decrypt = function(word){
	if(word){
		let key = CryptoJS.enc.Utf8.parse(aesKey);
		let decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	}
	return word;
};

/**
 * @2019/4/16
 * @author: huiming
 * desc:  aes加密 如果是一个对象 先转成json 在加密
 */
export const encrypt = function(word) {
	if(typeof word === "object"){
		word = JSON.stringify(word);
	}
	let key = CryptoJS.enc.Utf8.parse(aesKey);
	let srcs = CryptoJS.enc.Utf8.parse(word);
	let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
	return encrypted.toString();
};


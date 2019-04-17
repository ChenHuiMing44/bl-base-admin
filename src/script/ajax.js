/* eslint-disable no-empty-label */
//simple Ajax
import axios from "axios";

import {baseUrl, aesSwitch} from "./../config/config";
import {decrypt,encrypt} from "./aesEncryption";
import store from "./../store";
import AJAX_CONFIG from "./../config/ajaxConfig"


//除了 0000 以外 其他都是reject 然后 错误类型 和错误信息
export default function (ajaxParams) {
	return new Promise( (ajaxResolve , ajaxReject) => {
		if(typeof ajaxParams !== "object"){
			ajaxReject({type: AJAX_CONFIG.simpleAjaxErr.paramsErr});
		}
		if(typeof ajaxParams.url !== "string"){
			ajaxReject({type: AJAX_CONFIG.simpleAjaxErr.paramsErr});
		}
		let url = baseUrl + ajaxParams.url;
		let method = ajaxParams.method || AJAX_CONFIG.methods.post;
		let timeout = AJAX_CONFIG.limitTimeout;
		let data = ajaxParams.data || {};
		let _contentType = ajaxParams.contentType ||AJAX_CONFIG.contentTypes.www;
		let token = store.state.token;
		if(!token){
			token = localStorage.getItem("token")
			store.commit("COMMIT_VALUE", {key: "token",value: token});
		}
		if(!token){
			token = "";
		}
		console.log("请求参数————"+ ajaxParams.url);
		console.log(JSON.parse(JSON.stringify(data)));
		if(!data.extend_info){
			data.extend_info = getBaseInfo();
		}
		let cryptData = {
			encryptContent: encrypt(data)
		};

		data = CRYPT_SWITCH?cryptData:data;
		let promise = axios({
			url: url,
			method,timeout,
			headers: {
				"Content-type": _contentType,
				"token": token
			},
			params: data
		});
		Promise.race([promise,new Promise(function (resolve,reject) {
			setTimeout(function () {
				reject("timeout");
			},timeout);
		})]).then(function (res) {
			ajaxParams.willEnd && ajaxParams.willEnd(res);
			if (res.data.retCode === repStatus.success) {
				//请求成功  判断是否加密
				if(CRYPT_SWITCH) {
					let backParams = res.data.ret && decrypt(res.data.ret);
					res.data.ret = isJson(backParams) ? JSON.parse(backParams) : backParams;
				}
				console.log("——————返回参数——————");
				console.log(res.data.ret);
				res.ret = res.data.ret||{};
				ajaxResolve(res);
			}else{
				ajaxReject({type: AJAX_CONFIG.simpleAjaxErr.businessErr, err: res});
			}
		}).catch(function (err) {
			ajaxParams.willEnd && ajaxParams.willEnd(err);
			if(err && err.toString().search("timeout") !== -1){
				!ajaxParams.noneToast && toast("请求超时");
				ajaxReject({type: AJAX_CONFIG.simpleAjaxErr.timeout});
			} else {
				ajaxReject({type: AJAX_CONFIG.simpleAjaxErr.other , err: err});
			}
		})
	})
}


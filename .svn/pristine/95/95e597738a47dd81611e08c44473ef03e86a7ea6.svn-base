var Util = (function () {
	var obj = function () {
		this.share = {
			shareTitle: '',
			shareDesc: '',
			shareImg: '',
			activityId: ''
		};
		this.isAuth = false;
		this.bigGiftObj = '';
	};

	obj.prototype = {
		/**
		 *
		 * @param url
		 * @param params
		 * @param successCallback
		 * @param errorCallback
		 * @param showLoading
		 */
		post: function (url, params, successCallback, errorCallback, showLoading) {
			var that = this;
			if (showLoading) {
				var options = {
					//message: '正在加载',
					theme: 'sk-circle',
					backgroundColor: 'rgba(0, 0, 0, 0)'
				};
				HoldOn.open(options);
			}

			var resourcePath = Config.api.resourcePath;
			if (url == 'getCommonrailJsSdkConfig.json') {
				resourcePath = Config.api.resourcePathCommon;
			} else if (url == 'checkSession.json' || url == 'getCommonrailSession.json' || url == 'getCommonrailAppId.json') {
				resourcePath = Config.api.resourcePathCommon;
			}

			var startTime = new Date();
			$.ajax({
				url: resourcePath + url,
				type: 'POST',
				async: true,
				data: JSON.stringify(params),
				timeout: 10000,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					if (showLoading) {
						HoldOn.close();
					}
					console.group(resourcePath + url);
					console.debug('%c参数', 'font-weight:bold;color:black;');
					console.debug(JSON.stringify(params));
					console.debug('%c返回', 'font-weight:bold;color:black;');
					console.debug(JSON.stringify(url == 'getCommonrailJsSdkConfig.json' ? data : data.data).substring(0, 100));
					console.debug('%c耗时', 'font-weight:bold;color:black;');
					console.debug((new Date().getTime() - startTime) + ' 毫秒');
					console.groupEnd();

					if (data.status == 200) {
						that.setLocalStorage('isAuth', true);
						console.log(JSON.parse(JSON.stringify(data.data)));
						successCallback && successCallback(data.data);
					} else if (data.status == 401) {
						//that.initLogin();
					} else if (data.status == 4000) {
						that.setLocalStorage('isAuth', false);
						errorCallback && errorCallback();
					} else {
						console.log(JSON.parse(JSON.stringify(data)));
						if (url == 'getCommonrailJsSdkConfig.json') {
							successCallback && successCallback(data);
						} else {
							errorCallback && errorCallback(data);
						}
					}
				},
				error: function (xhr, textStatus) {
					if (showLoading) {
						HoldOn.close();
					}

					//this.showAlert('服务器异常,请稍候再试');

					console.log('错误');
					console.log(xhr);
					console.log(textStatus);
					// that.showAlert('', '服务器异常,请稍后再试');
				},
				complete: function () {

				}
			})
		},

		showMessageBox: function (content, callback, title) {
			$.confirm({
				title: title || '系统提示',
				text: content || '内容文案',
				onOK: function () {
					callback && callback(true);
				},
				onCancel: function () {
					//$.modal.prototype.defaults.buttonOK = '确定';
					callback && callback(false);
				}
			});
		},

		showAlert: function (content, callback, title) {
			$.alert(content, title || '系统提示', function () {
				callback && callback();
			});
		},

		showToast: function (content, callback, icon) {
			$.toast(content || '', icon || '', function () {
				callback && callback();
			});
		},

		banLongPress: function () {
			Util.setLocalStorage('shareTitle', '');
			Util.setLocalStorage('shareDesc', '');
			Util.setLocalStorage('isAuth', true);

			document.body.onselectstart = document.body.oncontextmenu = function () {
				return false;
			};
			$(".eggCard>img").onselectstart = $(".eggCard>img").oncontextmenu = function () {
				return true;
			};
		},

		numConvertStr: function (index) {
			return ['', '一','二','三','四','五','六','七','八'][index];
		},

		setLocalStorage: function (key, obj) {
			localStorage.setItem(key, JSON.stringify(obj));
		},

		getLocalStorage: function (key) {
			return JSON.parse(localStorage.getItem(key));
		}

	};

	return new obj();
})();
var Factory = (function () {
	var obj = function () {

	};

	obj.prototype = {
		getUserStatus: function (callback) {
			Util.post('getUserStatus.json', {}, function (data) {
				callback && callback(data);
			});
		},

		getEggList: function (callback) {
			Util.post('activity/getList.json', {activityNum: 1}, function (data) {
				callback && callback(data);
			}, function () {
			}, true);
		},

		getCoupon: function (activityId, callback, showLoading) {
			Util.post('activity/getCoupon.json', {activityId: activityId}, function (data) {
				callback && callback(data);
			}, function () {
			}, showLoading);
		},

		getWinners: function (callback) {
			Util.post('activity/recordPage.json', {
				activityNum: 1,
				pageModel: {
					currenPage: 1,
					pageSize: 30
				}
			}, function (data) {
				callback && callback(data);
			});
		},

		getAddress: function (callback) {
			Util.post('member/findShippingAddressList.json', {type: 2}, function (data) {
				callback && callback(data);
			});
		},

		shareGift: function (data, callback) {
			callback && callback();
			Util.post('getCommonrailJsSdkConfig.json', { url: location.href}, function (jssdkConfig) {
				jssdkConfig["debug"] = false;
				jssdkConfig["jsApiList"] = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"];
				wx.config(jssdkConfig);

				wx.ready(function() {
					var shareContent = {
						"title" : Util.share.shareTitle,
						"desc" : Util.share.shareDesc,
						"link" : Config.api.v2Path + '/goldenEggs',
						"imgUrl" : Util.share.shareImg,
						"type" : "",
						"dataUrl" : "",
						"success" : function() {
							Util.post('activity/shared.json', {activityId: Util.share.activityId}, function () {
								window.location.href = Config.api.v2Path + 'goldenEggs';
							});

						},
						"cancel" : function() {
						}
					};
					wx.onMenuShareTimeline(shareContent);
					wx.onMenuShareAppMessage(shareContent);
					wx.onMenuShareQQ(shareContent);
					wx.onMenuShareWeibo(shareContent);
				});
			}, function () {
				console.log(1)
			}, false);
		},

		isShare: function (activityId, callback) {
			Util.post('activity/isShare.json', {activityId: activityId}, function (data) {
				callback && callback(data);
			});
		},

		initLogin: function (callback, type, code) {
			if (type) {
				Util.isAuth = true;
				callback && callback();
				return;
			}

			Util.post('checkSession.json', {}, function (data) {
				if (!data.verifyStatus) {
					var reg = new RegExp("(^|&)code=([^&]*)(&|$)");
					var r = window.location.search.substr(1).match(reg);
					var code = (r == null ? null : decodeURI(r[2]));

					if (code) {
						Util.post('getCommonrailSession.json', {code: code}, function (data) {
							$.setCookie('sid', data.sessionId);
							window.location.href = location.href.replace('code=', '');
							//callback && callback();
						}, function () {
							Util.isAuth = false;
							$('#orCodeDiv').show();
						});
					} else {
						Util.post('getCommonrailAppId.json', {}, function (data) {
							window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
								data.appId + "&redirect_uri=" + escape(location.href)
								+ "&action=viewtest&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
						});
					}
				} else {
					Util.isAuth = true;
					callback && callback();
				}
			});
		}

	};

	return new obj();
})();
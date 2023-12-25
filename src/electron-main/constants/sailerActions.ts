const actions = [
  'aliPay',
  'alipay_wap',
  'alipayPingpp',
  'asyncGetUserInfo',
  'callLogin',
  'callLogout',
  'callNativeBack',
  'callSendRichLink',
  'callTangBiGift',
  'checkingType',
  'checkPermissions',
  'chooseSingleImage',
  'closeBrowser',
  'closeBrowserWithParams',
  'configNavBar',
  'connectDrugStore',
  'contactStore',
  'copyWord',
  'faceDetetion',
  'getClipboardData',
  'getLocation',
  'getMallIndexCity',
  'getNativeData',
  'getSelectedDeliveryAddress',
  'getStatusBarHeight',
  'goAppHome',
  'hideNavBackItem',
  'hideNavBar',
  'hideTabBar',
  'humanValidFailed',
  'humanValidSuccess',
  'isAlipayInstalled',
  'onlineFindDoctorPrescription',
  'open',
  'openCamera',
  'openCapsuleShare',
  'openPhotoAlbum',
  'openPhotoCamera',
  'openShare',
  'previewPhoto',
  'redirect',
  'replace',
  'requestPermissions',
  'saveImage',
  'scanCode',
  'sendRecommendOrder',
  'setH5Title',
  'setHeaderColor',
  'setImmersiveTitleColor',
  'setMallIndexCity',
  'setStatusBarStyle',
  'shootPrescription',
  'showNavBackItem',
  'showNavBar',
  'showNNavBar',
  'showTabBar',
  'signatureProtocalCallback',
  'upacp_wap',
  'updateDrugCount',
  'updateDrugstore',
  'uploadAvatar',
  'waitForAnswer',
  'wx_pub',
  'wxpay',
  'wxsdkpay',
  'yinLianPay',
  'zhaoShangPay',
  'getEventInfo',
  'sendEventInfo',
  'openSysKefu', // 打开问诊系统客服
  'WXShareFriends', // H5调用分享好友
  'WXShareMoments', // H5调用分享朋友圈
  'getVideoAllowTrafficInfo', // 获取流量播放设置信息
  'setVideoAllowTrafficInfo', // 设置流量播放
  'RefreshData', // 刷新客户端数据
  'noticeState', //获取系统通知打开状态
  'openShareImage', // 分享单张图片
  'ocrIdentify', // ocr识别
  'returnHome',
  'popToPage', // 返回到指定页面
  'openUdeskCustomService',
  'prescriptionVideoSelected', //  选择申请视频处方
  'copyWord', // 复制文案
  'callPhone', // 拨打手机
] as const

export enum callbackType {
  SUCCESS = 'success',
  FAIL = 'fail',
}
export default actions

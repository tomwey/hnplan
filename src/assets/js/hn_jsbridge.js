; (function () {
    var id = Math.floor(Math.random() * 2000000000),
        callbacks = {};
    window.HNJSBridge = {
        // 获取native bridge
        _getNativeBridge: function () {
            let obj = (window.webkit || {}).messageHandlers || {};
            return window.HNNativeBridge || obj.HNNativeBridge;
        },
        // 调用原生
        invoke: function (cbid = null, data, callback) {
            var that = this;
            var nativeBridge = that._getNativeBridge();
            cbid = cbid || 'cb_' + id++;
            // data = JSON.stringify(data || {});
            callbacks[cbid] = callback;
            if (nativeBridge) {
                if (window.HNNativeBridge) {
                    // android
                    nativeBridge.postMessage(JSON.stringify({ cbid: cbid, data: data || {} }));
                } else {
                    nativeBridge.postMessage({ cbid: cbid, data: data || {} });
                }

            }
        },

        // 从原生获取消息
        receiveMessage: function (msg) {
            if (typeof msg === 'object') {
                msg = JSON.stringify(msg);
            }
            msg = JSON.parse(msg);

            var cbid = msg.cbid,
                data = msg.data || {};
            // alert(cbid);
            // alert(data);
            if (cbid) {
                // alert(callbacks[cbid]);
                if (callbacks[cbid]) {
                    callbacks[cbid](data);
                }
                delete callbacks[cbid];
                delete cbid;
            }
        },

        // 测试
        showMsg: function (msg) {
            alert(msg);
        }
    };
})();

// function showMsg(msg) {
//     alert(msg);
// }
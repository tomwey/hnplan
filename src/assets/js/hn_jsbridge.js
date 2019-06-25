; (function () {
    var id = Math.floor(Math.random() * 2000000000),
        callbacks = {};
    window.HNJSBridge = {
        // 获取native bridge
        _getNativeBridge: function () {
            return window.HNNativeBridge || window.webkit.messageHandlers.HNNativeBridge;
        },
        // 调用原生
        invoke: function (cbid = null, data, callback) {
            var that = this;
            var nativeBridge = that._getNativeBridge();
            cbid = cbid || 'cb_' + id++;
            // data = JSON.stringify(data || {});
            callbacks[cbid] = callback;
            if (nativeBridge) {
                nativeBridge.postMessage({ cbid: cbid, data: data || {} });
            }
        },

        // 从原生获取消息
        receiveMessage: function (msg) {
            // alert(msg);
            var cbid = msg.cbid,
                data = msg.data || {};
            if (cbid) {
                if (callbacks[cbid]) {
                    callbacks[cbid](data);
                }
                delete callbacks[cbid];
                delete cbid;
            }
        }
    };
})();
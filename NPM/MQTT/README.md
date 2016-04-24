##MQTT-client##
```bash
>npm install mqtt
```
--------------------
```bash
                                                                //載入mqtt模組
var mqtt    = require('mqtt');
                                                                //連線至port188$
var client  = mqtt.connect(1883,'localhost');
                                                                //客戶端連線時 $
client.on('connect', function () {
                                                                //訂閱主題
 	 client.subscribe('presence');
                                                                //對訂閱主題發 $
 	 client.publish('presence', 'Hello mqtt');
});
                                                                //客戶端發布訊 $
client.on('message', function (topic, message) {
 	
                                                                //在本地顯示內容
 	console.log(message.toString());
                                                                //結束聯線
  	client.end();
});

```

								//載入mqtt模組
var mqtt    = require('mqtt');
								//連線至port1883,本地連線
var client  = mqtt.connect(1883,'localhost');
								//客戶端連線時觸發 
client.on('connect', function () {
								//訂閱主題
  client.subscribe('presence');
								//對訂閱主題發布訊息
  client.publish('presence', 'Hello mqtt');
});
 								//客戶端發布訊息時觸發
client.on('message', function (topic, message) {
  // message is Buffer 
								//在本地顯示內容
  console.log(message.toString());
								//結束聯線
  client.end();
});

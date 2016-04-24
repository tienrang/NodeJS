var mqtt = require('mqtt');


var subscribeTopics={};

								//創建伺服器對像
var server = mqtt.createServer(function(client) {

  								//建立連接時觸發
  client.on('connect', function(packet) {
    client.connack({returnCode: 0});
  });

							  	//客户端發布主题时觸發
  client.on('publish', function(packet) {
  	var topic=packet.topic;
  	var payload=packet.payload;

								//如果没有創建空的主题對應的client數組
  	if(subscribeTopics[topic]==null){
  		subscribeTopics[topic]=[];
  	}else{
  								//遍歷該主題下全部client，並逐一發送消息
  		for(var i in subscribeTopics[topic]){
  			var client=subscribeTopics[topic][i];
  								//發布訊息
			client.publish({
  				topic: topic,
  				payload: payload
  			});
  		}
  	}   
  });

 							 	//當客户端訂閱时觸發
  client.on('subscribe', function(packet) {
  	var topic=packet.subscriptions[0].topic;

				  				//如没有，創建空的主题對應的client數組
  	if(subscribeTopics[topic]==null){
  		subscribeTopics[topic]=[];
  	}

  								//如果client數組中没有當前client，加入
	if(subscribeTopics[topic].indexOf(client)==-1){
		subscribeTopics[topic].push(client);
	}
	
  });

  client.on('pingreq', function(packet) {
    client.pingresp();
  });

  client.on('disconnect', function(packet) {
  								//遍歷所有主题，检查对应的数组中是否有当前client，从数组中删除
   	for (var topic in subscribeTopics){
   		var index=subscribeTopics[topic].indexOf(client);
   		if(index>-1){
   			subscribeTopics[topic].splice(index,1);
   		}
   	}
  });
});

          					      		//監聽窗口
server.listen(1883);

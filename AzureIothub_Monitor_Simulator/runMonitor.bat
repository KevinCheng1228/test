@rem 启动参数：java -jar AzureIothubDeviceMonitorUtil.jar ServerClientConnString deviceId
@rem 启动运行前，需先把下面命令中的 ServerClientConnString 和 deviceId 替换为真实的连接信息和设备ID，不然无法连接成功

@set ServerClientConnString=Endpoint=sb://iothub-ns-edge365-de-22604632-70bbc692a3.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=LK1ovZ0FN4wfsxFIbO9v//AsfytO/xTC1pZHSD6ig4o=;EntityPath=edge365-dev
@set deviceId=edc77a95-799b-465a-b378-4c02eac1020b

java -jar AzureIothubDeviceMonitorUtil.jar %ServerClientConnString% %deviceId%
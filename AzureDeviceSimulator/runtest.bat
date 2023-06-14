@rem 启动参数：java -jar AzureDeviceSimulator.jar deviceId ConnString MessageToSend
@rem 启动运行前，需先把下面命令中的 deviceId, ConnString 以及 MessageToSend 替换为真实设备的信息，不然无法连接成功

@set deviceId=edc77a95-799b-465a-b378-4c02eac1020b
@set connStr=HostName=edge365-dev.azure-devices.net;DeviceId=edc77a95-799b-465a-b378-4c02eac1020b;SharedAccessKey=ivEQUYjwrOkKXsdm60xVZkEf4br54HucXBmeAodhJks=
@set message={\"value\":1234, \"ts\":\"2023-06-14T13:15:56+0800\"}

java -jar AzureDeviceSimulator.jar %deviceId% %connStr% "%message%"
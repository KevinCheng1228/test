@rem ����������java -jar AzureDeviceSimulator.jar deviceId ConnString MessageToSend
@rem ��������ǰ�����Ȱ����������е� deviceId, ConnString �Լ� MessageToSend �滻Ϊ��ʵ�豸����Ϣ����Ȼ�޷����ӳɹ�

@set deviceId=edc77a95-799b-465a-b378-4c02eac1020b
@set connStr=HostName=edge365-dev.azure-devices.net;DeviceId=edc77a95-799b-465a-b378-4c02eac1020b;SharedAccessKey=ivEQUYjwrOkKXsdm60xVZkEf4br54HucXBmeAodhJks=
@set message={\"value\":1234, \"ts\":\"2023-06-14T13:15:56+0800\"}

java -jar AzureDeviceSimulator.jar %deviceId% %connStr% "%message%"
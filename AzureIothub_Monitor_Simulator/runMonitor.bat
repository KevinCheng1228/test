@rem ����������java -jar AzureIothubDeviceMonitorUtil.jar ServerClientConnString deviceId
@rem ��������ǰ�����Ȱ����������е� ServerClientConnString �� deviceId �滻Ϊ��ʵ��������Ϣ���豸ID����Ȼ�޷����ӳɹ�

@set ServerClientConnString=Endpoint=sb://iothub-ns-edge365-de-22604632-70bbc692a3.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=LK1ovZ0FN4wfsxFIbO9v//AsfytO/xTC1pZHSD6ig4o=;EntityPath=edge365-dev
@set deviceId=edc77a95-799b-465a-b378-4c02eac1020b

java -jar AzureIothubDeviceMonitorUtil.jar %ServerClientConnString% %deviceId%
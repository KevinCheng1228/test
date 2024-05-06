'use strict';
/** 用来检查 rawdata 的工具, 检查一批 tag 在某一时间段内数据的变化趋势, 如果有坏点或点值变小的情况, 则把 tag 信息以及变小的时间点显示到控制台
*/
console.log("Rawdata checker start, nodejs ver = " + process.version);
function d2num(n){return n<10?"0"+n:n.toString();}
if (undefined == Date.prototype.format) {
Date.prototype.format = function (fmt) {
if (!fmt) fmt = "YYYY-MM-DDTHH:mm:ss.SSS";
var ms = ("00" + this.getMilliseconds()).slice(-3);
var M = this.getMonth() + 1, D = this.getDate(), H = this.getHours();
var m = this.getMinutes(), s = this.getSeconds();
if (fmt.indexOf("YYYY") >= 0) fmt = fmt.replace("YYYY", this.getFullYear());
if (fmt.indexOf("MM") >= 0) fmt = fmt.replace("MM", d2num(M));
if (fmt.indexOf("DD") >= 0) fmt = fmt.replace("DD", d2num(D));
if (fmt.indexOf("HH") >= 0) fmt = fmt.replace("HH", d2num(H));
if (fmt.indexOf("hh") >= 0) fmt = fmt.replace("hh", d2num(H <= 12 ? H : H - 12));
if (fmt.indexOf("mm") >= 0) fmt = fmt.replace("mm", d2num(m));
if (fmt.indexOf("ss") >= 0) fmt = fmt.replace("ss", d2num(s));
if (fmt.indexOf("ms") >= 0) fmt = fmt.replace("ms", ms);
if (fmt.indexOf("SSS") >= 0) fmt = fmt.replace("SSS", ms);
if (fmt.indexOf("S") >= 0) fmt = fmt.replace("S", ms);
if (fmt.indexOf("M") >= 0) fmt = fmt.replace("M", M);
if (fmt.indexOf("D") >= 0) fmt = fmt.replace("D", D);
if (fmt.indexOf("H") >= 0) fmt = fmt.replace("H", H);
if (fmt.indexOf("h") >= 0) fmt = fmt.replace("h", H <= 12 ? H : H - 12);
if (fmt.indexOf("m") >= 0) fmt = fmt.replace("m", m);
if (fmt.indexOf("s") >= 0) fmt = fmt.replace("s", s);
if (fmt.indexOf("a") >= 0) fmt = fmt.replace("a", H <= 12 ? "am" : "pm");
return fmt;
};
}
function log(s, curTime){
if (!curTime){curTime = new Date();}
console.log(curTime.format() + " " + s);
}

const { MongoClient } = require('mongodb');

//配置连接信息
const ConnInfo = {
	host: "10.32.9.4",
	port: 27017,
	database: "49c6f7ef-cc93-4751-abc1-4cc0d2ed53f5",
	username: "3e944efc-8f48-4863-8cf1-b4e7aa75f263",
	password: "D9F3qNfHK6a95jjJkwzDkh0h"
};
const mongoUri = "mongodb://"+ConnInfo.username+":"+ConnInfo.password+"@"+ConnInfo.host+":"+ConnInfo.port+"/"+ConnInfo.database;
const checkStartTime = new Date('2024-04-22 16:40:00');
const checkEndTime   = new Date('2024-04-22 19:50:00');

//需要检查的点列表, [devid, tagname]
const taglist = [
	[254   ,    "IP001:M_RAE"],
	[244   ,    "IP001:M_RAE"],
	[258   ,    "IP001:M_RAE"],
	[276   ,    "IP001:M_RAE"],
	[278   ,    "IP001:M_RAE"],
	[280   ,    "IP001:M_RAE"],
	[282   ,    "IP001:M_RAE"],
	[286   ,    "IP001:M_RAE"],
	[264   ,    "IP001:M_RAE"],
	[260   ,    "IP001:M_RAE"],
	[268   ,    "IP001:M_RAE"],
	[270   ,    "IP001:M_RAE"],
	[266   ,    "IP001:M_RAE"],
	[272   ,    "IP001:M_RAE"],
	[256   ,    "IP001:M_RAE"],
	[274   ,    "IP001:M_RAE"],
	[284   ,    "IP001:M_RAE"],
	[526   ,    "IP001:M_RAE"],
	[526   ,    "IP001:M_RAE"],
	[528   ,    "IP001:M_RAE"],
	[622   ,    "IP001:M_RAE"],
	[629   ,    "IP001:M_RAE"],
	[682   ,    "IP001:M_RAE"],
	[686   ,    "IP001:M_RAE"],
	[648   ,    "IP001:M_RAE"],
	[650   ,    "IP001:M_RAE"],
	[652   ,    "IP001:M_RAE"],
	[995   ,    "IP001:M_RAE"],
	[676   ,    "IP001:M_RAE"],
	[678   ,    "IP001:M_RAE"],
	[747   ,    "IP001:M_RAE"],
	[749   ,    "IP001:M_RAE"],
	[686   ,    "IP001:M_RAE"],
	[835   ,    "IP001:M_RAE"],
	[524   ,    "IP001:M_RAE"],
	[558   ,    "IP001:M_RAE"],
	[874   ,    "IP001:M_RAE"],
	[872   ,    "IP001:M_RAE"],
	[862   ,    "IP001:M_RAE"],
	[864   ,    "IP001:M_RAE"],
	[866   ,    "IP001:M_RAE"],
	[919   ,    "IP001:M_RAE"],
	[921   ,    "IP001:M_RAE"],
	[923   ,    "IP001:M_RAE"],
	[925   ,    "IP001:M_RAE"],
	[927   ,    "IP001:M_RAE"],
	[930   ,    "IP001:M_RAE"],
	[932   ,    "IP001:M_RAE"],
	[995   ,    "IP001:M_RAE"],
	[997   ,    "IP001:M_RAE"],
	[999   ,    "IP001:M_RAE"],
	[1001  ,    "IP001:M_RAE"],
	[1003  ,    "IP001:M_RAE"],
	[1005  ,    "IP001:M_RAE"],
	[1007  ,    "IP001:M_RAE"],
	[1009  ,    "IP001:M_RAE"],
	[1011  ,    "IP001:M_RAE"],
	[1013  ,    "IP001:M_RAE"],
	[1096  ,    "IP001:M_RAE"],
	[1098  ,    "IP001:M_RAE"],
	[1100  ,    "IP001:M_RAE"],
	[1102  ,    "IP001:M_RAE"],
	[1104  ,    "IP001:M_RAE"],
	[1106  ,    "IP001:M_RAE"],
	[1159  ,    "IP001:M_RAE"],
	[1161  ,    "IP001:M_RAE"],
	[1163  ,    "IP001:M_RAE"],
	[1165  ,    "IP001:M_RAE"],
	[1176  ,    "IP001:M_RAE"],
	[1180  ,    "IP001:M_RAE"],
	[1199  ,    "IP001:M_RAE"],
	[1197  ,    "IP001:M_RAE"],
	[1186  ,    "IP001:M_RAE"],
	[1182  ,    "IP001:M_RAE"],
	[1184  ,    "IP001:M_RAE"],
	[1195  ,    "IP001:M_RAE"],
	[1310  ,    "IP001:M_RAE"],
	[1314  ,    "IP001:M_RAE"],
	[1312  ,    "IP001:M_RAE"],
	[1316  ,    "IP001:M_RAE"],
	[1318  ,    "IP001:M_RAE"],
	[1357  ,    "IP001:M_RAE"],
	[1359  ,    "IP001:M_RAE"],
	[1377  ,    "IP001:M_RAE"],
	[1379  ,    "IP001:M_RAE"],
	[1381  ,    "IP001:M_RAE"],
	[1383  ,    "IP001:M_RAE"],
	[1442  ,    "IP001:M_RAE"],
	[1444  ,    "IP001:M_RAE"],
	[1446  ,    "IP001:M_RAE"],
	[1448  ,    "IP001:M_RAE"],
	[1450  ,    "IP001:M_RAE"],
	[1452  ,    "IP001:M_RAE"],
	[1454  ,    "IP001:M_RAE"],
	[1456  ,    "IP001:M_RAE"],
	[1458  ,    "IP001:M_RAE"],
	[1460  ,    "IP001:M_RAE"],
	[1462  ,    "IP001:M_RAE"],
	[1464  ,    "IP001:M_RAE"],
	[1466  ,    "IP001:M_RAE"],
	[1468  ,    "IP001:M_RAE"],
	[1470  ,    "IP001:M_RAE"],
	[870   ,    "IP001:M_RAE"],
	[868   ,    "IP001:M_RAE"],
	[1472  ,    "IP001:M_RAE"],
	[1474  ,    "IP001:M_RAE"],
	[1476  ,    "IP001:M_RAE"],
	[1478  ,    "IP001:M_RAE"],
	[1480  ,    "IP001:M_RAE"],
	[1482  ,    "IP001:M_RAE"],
	[1484  ,    "IP001:M_RAE"],
	[1486  ,    "IP001:M_RAE"],
	[1488  ,    "IP001:M_RAE"],
	[1710  ,    "IP001:M_RAE"],
	[1712  ,    "IP001:M_RAE"],
	[1490  ,    "IP001:M_RAE"],
	[1492  ,    "IP001:M_RAE"],
	[1494  ,    "IP001:M_RAE"],
	[1496  ,    "IP001:M_RAE"],
	[1855  ,    "IP001:M_RAE"],
	[1857  ,    "IP001:M_RAE"],
	[1861  ,    "IP001:M_RAE"],
	[1863  ,    "IP001:M_RAE"],
	[1865  ,    "IP001:M_RAE"],
	[1867  ,    "IP001:M_RAE"],
	[1869  ,    "IP001:M_RAE"],
	[1871  ,    "IP001:M_RAE"],
	[1875  ,    "IP001:M_RAE"],
	[1897  ,    "IP001:M_RAE"],
	[1873  ,    "IP001:M_RAE"],
	[1877  ,    "IP001:M_RAE"],
	[1879  ,    "IP001:M_RAE"],
	[1881  ,    "IP001:M_RAE"],
	[1883  ,    "IP001:M_RAE"],
	[1885  ,    "IP001:M_RAE"],
	[1887  ,    "IP001:M_RAE"],
	[1889  ,    "IP001:M_RAE"],
	[1891  ,    "IP001:M_RAE"],
	[1893  ,    "IP001:M_RAE"],
	[1895  ,    "IP001:M_RAE"],
	[2087  ,    "IP001:M_RAE"],
	[2089  ,    "IP001:M_RAE"],
	[2091  ,    "IP001:M_RAE"],
	[2093  ,    "IP001:M_RAE"],
	[2095  ,    "IP001:M_RAE"],
	[2097  ,    "IP001:M_RAE"],
	[2099  ,    "IP001:M_RAE"],
	[2101  ,    "IP001:M_RAE"],
	[2103  ,    "IP001:M_RAE"],
	[2105  ,    "IP001:M_RAE"],
	[2107  ,    "IP001:M_RAE"],
	[2196  ,    "IP001:M_RAE"],
	[2198  ,    "IP001:M_RAE"],
	[2200  ,    "IP001:M_RAE"],
	[2202  ,    "IP001:M_RAE"],
	[2204  ,    "IP001:M_RAE"],
	[2210  ,    "IP001:M_RAE"],
	[2206  ,    "IP001:M_RAE"],
	[2208  ,    "IP001:M_RAE"],
	[2212  ,    "IP001:M_RAE"],
	[2214  ,    "IP001:M_RAE"],
	[2216  ,    "IP001:M_RAE"],
	[2218  ,    "IP001:M_RAE"],
	[2220  ,    "IP001:M_RAE"],
	[2222  ,    "IP001:M_RAE"],
	[2224  ,    "IP001:M_RAE"],
	[2226  ,    "IP001:M_RAE"],
	[2228  ,    "IP001:M_RAE"],
	[2230  ,    "IP001:M_RAE"],
	[2232  ,    "IP001:M_RAE"],
	[2234  ,    "IP001:M_RAE"],
	[2236  ,    "IP001:M_RAE"],
	[2238  ,    "IP001:M_RAE"],
	[2240  ,    "IP001:M_RAE"],
	[2242  ,    "IP001:M_RAE"],
	[2442  ,    "IP001:M_RAE"],
	[2444  ,    "IP001:M_RAE"],
	[2446  ,    "IP001:M_RAE"],
	[2448  ,    "IP001:M_RAE"],
	[2450  ,    "IP001:M_RAE"],
	[2452  ,    "IP001:M_RAE"],
	[2454  ,    "IP001:M_RAE"],
	[2456  ,    "IP001:M_RAE"],
	[2458  ,    "IP001:M_RAE"],
	[2460  ,    "IP001:M_RAE"],
	[2462  ,    "IP001:M_RAE"],
	[2464  ,    "IP001:M_RAE"],
	[2466  ,    "IP001:M_RAE"],
	[2470  ,    "IP001:M_RAE"],
	[2472  ,    "IP001:M_RAE"],
	[2474  ,    "IP001:M_RAE"],
	[2476  ,    "IP001:M_RAE"],
	[2478  ,    "IP001:M_RAE"],
	[2480  ,    "IP001:M_RAE"],
	[2482  ,    "IP001:M_RAE"],
	[2484  ,    "IP001:M_RAE"],
	[2486  ,    "IP001:M_RAE"],
	[2488  ,    "IP001:M_RAE"],
	[2490  ,    "IP001:M_RAE"],
	[2492  ,    "IP001:M_RAE"],
	[2498  ,    "IP001:M_RAE"],
	[2494  ,    "IP001:M_RAE"],
	[2496  ,    "IP001:M_RAE"],
	[2622  ,    "IP001:M_RAE"],
	[2624  ,    "IP001:M_RAE"],
	[2626  ,    "IP001:M_RAE"],
	[2628  ,    "IP001:M_RAE"],
	[2630  ,    "IP001:M_RAE"],
	[2781  ,    "IP001:M_RAE"],
	[2783  ,    "IP001:M_RAE"],
	[2785  ,    "IP001:M_RAE"],
	[2787  ,    "IP001:M_RAE"],
	[2789  ,    "IP001:M_RAE"],
	[2791  ,    "IP001:M_RAE"],
	[2793  ,    "IP001:M_RAE"],
	[2795  ,    "IP001:M_RAE"],
	[2797  ,    "IP001:M_RAE"],
	[2799  ,    "IP001:M_RAE"],
	[2801  ,    "IP001:M_RAE"],
	[2803  ,    "IP001:M_RAE"],
	[2909  ,    "IP001:M_RAE"],
	[2911  ,    "IP001:M_RAE"],
	[2913  ,    "IP001:M_RAE"],
	[2915  ,    "IP001:M_RAE"],
	[2917  ,    "IP001:M_RAE"],
	[2919  ,    "IP001:M_RAE"],
	[2921  ,    "IP001:M_RAE"],
	[2923  ,    "IP001:M_RAE"],
	[2925  ,    "IP001:M_RAE"],
	[2929  ,    "IP001:M_RAE"],
	[2927  ,    "IP001:M_RAE"],
	[2931  ,    "IP001:M_RAE"],
	[3035  ,    "IP001:M_RAE"],
	[3037  ,    "IP001:M_RAE"],
	[3039  ,    "IP001:M_RAE"],
	[3041  ,    "IP001:M_RAE"],
	[3043  ,    "IP001:M_RAE"],
	[3045  ,    "IP001:M_RAE"],
	[3047  ,    "IP001:M_RAE"],
	[3049  ,    "IP001:M_RAE"],
	[3051  ,    "IP001:M_RAE"],
	[3053  ,    "IP001:M_RAE"],
	[3055  ,    "IP001:M_RAE"],
	[3057  ,    "IP001:M_RAE"],
	[3059  ,    "IP001:M_RAE"],
	[3061  ,    "IP001:M_RAE"],
	[3063  ,    "IP001:M_RAE"],
	[3065  ,    "IP001:M_RAE"],
	[3067  ,    "IP001:M_RAE"],
	[3077  ,    "IP001:M_RAE"],
	[3069  ,    "IP001:M_RAE"],
	[3071  ,    "IP001:M_RAE"],
	[3073  ,    "IP001:M_RAE"],
	[3075  ,    "IP001:M_RAE"],
	[3081  ,    "IP001:M_RAE"],
	[3083  ,    "IP001:M_RAE"],
	[1861  ,    "IP001:M_RAE"],
	[3085  ,    "IP001:M_RAE"],
	[3087  ,    "IP001:M_RAE"],
	[3089  ,    "IP001:M_RAE"],
	[3093  ,    "IP001:M_RAE"],
	[3091  ,    "IP001:M_RAE"],
	[3095  ,    "IP001:M_RAE"],
	[3097  ,    "IP001:M_RAE"],
	[874   ,    "IP002:M_RAE"],
	[3386  ,    "IP001:M_RAE"],
	[3384  ,    "IP001:M_RAE"],
	[3388  ,    "IP001:M_RAE"],
	[3390  ,    "IP001:M_RAE"],
	[3392  ,    "IP001:M_RAE"],
	[3394  ,    "IP001:M_RAE"],
	[3396  ,    "IP001:M_RAE"],
	[3406  ,    "IP001:M_RAE"],
	[3398  ,    "IP001:M_RAE"],
	[3400  ,    "IP001:M_RAE"],
	[3402  ,    "IP001:M_RAE"],
	[3404  ,    "IP001:M_RAE"],
	[3432  ,    "IP001:M_RAE"],
	[3408  ,    "IP001:M_RAE"],
	[3434  ,    "IP001:M_RAE"],
	[3410  ,    "IP001:M_RAE"],
	[3412  ,    "IP001:M_RAE"],
	[3414  ,    "IP001:M_RAE"],
	[3416  ,    "IP001:M_RAE"],
	[3418  ,    "IP001:M_RAE"],
	[3420  ,    "IP001:M_RAE"],
	[3422  ,    "IP001:M_RAE"],
	[3424  ,    "IP001:M_RAE"],
	[3426  ,    "IP001:M_RAE"],
	[3428  ,    "IP001:M_RAE"],
	[3430  ,    "IP001:M_RAE"],
	[3436  ,    "IP001:M_RAE"],
	[3440  ,    "IP001:M_RAE"],
	[3442  ,    "IP001:M_RAE"],
	[3444  ,    "IP001:M_RAE"],
	[3446  ,    "IP001:M_RAE"],
	[3448  ,    "IP001:M_RAE"],
	[3450  ,    "IP001:M_RAE"],
	[3452  ,    "IP001:M_RAE"],
	[3454  ,    "IP001:M_RAE"],
	[3456  ,    "IP001:M_RAE"],
	[3458  ,    "IP001:M_RAE"],
	[3460  ,    "IP001:M_RAE"],
	[3462  ,    "IP001:M_RAE"],
	[3464  ,    "IP001:M_RAE"],
	[3466  ,    "IP001:M_RAE"],
	[3468  ,    "IP001:M_RAE"],
	[3470  ,    "IP001:M_RAE"],
	[3472  ,    "IP001:M_RAE"],
	[3474  ,    "IP001:M_RAE"],
	[3476  ,    "IP001:M_RAE"],
	[3478  ,    "IP001:M_RAE"],
	[3480  ,    "IP001:M_RAE"],
	[3482  ,    "IP001:M_RAE"],
	[3484  ,    "IP001:M_RAE"],
	[3486  ,    "IP001:M_RAE"],
	[3488  ,    "IP001:M_RAE"],
	[3492  ,    "IP001:M_RAE"],
	[3490  ,    "IP001:M_RAE"],
	[3900  ,    "IP001:M_RAE"],
	[3902  ,    "IP001:M_RAE"],
	[3904  ,    "IP001:M_RAE"],
	[3906  ,    "IP001:M_RAE"],
	[3908  ,    "IP001:M_RAE"],
	[3962  ,    "IP001:M_RAE"],
	[3964  ,    "IP001:M_RAE"],
	[3079  ,    "IP001:M_RAE"],
	[3494  ,    "IP001:M_RAE"],
	[3496  ,    "IP001:M_RAE"],
	[4059  ,    "IP001:M_RAE"],
	[4142  ,    "IP001:M_RAE"],
	[4144  ,    "IP001:M_RAE"],
	[4146  ,    "IP001:M_RAE"],
	[4148  ,    "IP001:M_RAE"],
	[4150  ,    "IP001:M_RAE"],
	[4152  ,    "IP001:M_RAE"],
	[4154  ,    "IP001:M_RAE"],
	[4156  ,    "IP001:M_RAE"],
	[4253  ,    "IP001:M_RAE"],
	[4255  ,    "IP001:M_RAE"],
	[4257  ,    "IP001:M_RAE"],
	[4259  ,    "IP001:M_RAE"],
	[4261  ,    "IP001:M_RAE"],
	[4305  ,    "IP001:M_RAE"],
	[4307  ,    "IP001:M_RAE"],
	[4309  ,    "IP001:M_RAE"],
	[4311  ,    "IP001:M_RAE"],
	[4313  ,    "IP001:M_RAE"],
	[4315  ,    "IP001:M_RAE"],
	[4317  ,    "IP001:M_RAE"],
	[4303  ,    "IP001:M_RAE"],
	[835   ,    "IP002:M_RAE"],
	[286   ,    "IP001:M_RAE"],
	[286   ,    "IP001:M_RAE"],
	[260   ,    "IP001:M_RAE"],
	[526   ,    "IP001:M_RAE"],
	[528   ,    "IP001:M_RAE"],
	[268   ,    "IP001:M_RAE"],
	[270   ,    "IP001:M_RAE"],
	[266   ,    "IP001:M_RAE"],
	[682   ,    "IP001:M_RAE"],
	[272   ,    "IP001:M_RAE"],
	[622   ,    "IP001:M_RAE"],
	[629   ,    "IP001:M_RAE"],
	[256   ,    "IP001:M_RAE"],
	[274   ,    "IP001:M_RAE"],
	[258   ,    "IP001:M_RAE"],
	[254   ,    "IP001:M_RAE"],
	[244   ,    "IP001:M_RAE"],
	[284   ,    "IP001:M_RAE"],
	[995   ,    "IP001:M_RAE"],
	[4561  ,    "IP001:M_RAE"],
	[4563  ,    "IP001:M_RAE"],
	[4565  ,    "IP001:M_RAE"],
	[4567  ,    "IP001:M_RAE"],
	[4569  ,    "IP001:M_RAE"],
	[4571  ,    "IP001:M_RAE"],
	[4573  ,    "IP001:M_RAE"],
	[4575  ,    "IP001:M_RAE"],
	[4577  ,    "IP001:M_RAE"],
	[4579  ,    "IP001:M_RAE"],
	[4581  ,    "IP001:M_RAE"],
	[4583  ,    "IP001:M_RAE"],
	[4585  ,    "IP001:M_RAE"],
	[4589  ,    "IP001:M_RAE"],
	[4591  ,    "IP001:M_RAE"],
	[4722  ,    "IP001:M_RAE"],
	[4724  ,    "IP001:M_RAE"],
	[4726  ,    "IP001:M_RAE"],
	[4728  ,    "IP001:M_RAE"],
	[4730  ,    "IP001:M_RAE"],
	[4772  ,    "IP001:M_RAE"],
	[4774  ,    "IP001:M_RAE"],
	[4776  ,    "IP001:M_RAE"],
	[4897  ,    "IP001:M_RAE"],
	[4899  ,    "IP001:M_RAE"],
	[4901  ,    "IP001:M_RAE"],
	[4903  ,    "IP001:M_RAE"],
	[4905  ,    "IP001:M_RAE"],
	[4997  ,    "IP001:M_RAE"],
	[4999  ,    "IP001:M_RAE"],
	[5001  ,    "IP001:M_RAE"],
	[5015  ,    "IP001:M_RAE"],
	[5017  ,    "IP001:M_RAE"],
	[5019  ,    "IP001:M_RAE"],
	[5021  ,    "IP001:M_RAE"],
	[5023  ,    "IP001:M_RAE"],
	[5103  ,    "IP001:M_RAE"],
	[5105  ,    "IP001:M_RAE"],
	[5107  ,    "IP001:M_RAE"],
	[5130  ,    "IP001:M_RAE"],
	[5132  ,    "IP001:M_RAE"],
	[5134  ,    "IP001:M_RAE"],
	[5136  ,    "IP001:M_RAE"],
	[5138  ,    "IP001:M_RAE"],
	[5140  ,    "IP001:M_RAE"],
	[5142  ,    "IP001:M_RAE"],
	[5194  ,    "IP001:M_RAE"],
	[5196  ,    "IP001:M_RAE"],
	[5198  ,    "IP001:M_RAE"],
	[5200  ,    "IP001:M_RAE"],
	[5202  ,    "IP001:M_RAE"],
	[5276  ,    "IP001:M_RAE"],
	[5390  ,    "IP001:M_RAE"],
	[5392  ,    "IP001:M_RAE"],
	[5412  ,    "IP001:M_RAE"],
	[5414  ,    "IP001:M_RAE"],
	[5416  ,    "IP001:M_RAE"]
];

log("TagCount to check = " + taglist.length + ", check startTime=" + checkStartTime.format() + ", endTime=" + checkEndTime.format());

const client = new MongoClient(mongoUri, {directConnection: true});

function appExitHandler() {
	client.close();
	process.exit();
}
process.on('SIGINT', () => {
	log("Ctrl-C exit");
	appExitHandler();
});
process.on('exit', (code) => {
	if(code){
	log("Process exit by code " + code);
	}
});

function getRawdataCollectionHash(devid){
	var hash = devid % 32;
	return ("0" + hash).substr(-2);
}

async function findRawData(db, devid, tagname, startTime, endTime){
	const rawdataCollectionName = "dc_rawdata_" + startTime.format("YYYYMMDD") + "_" + getRawdataCollectionHash(devid);
	const collection = db.collection(rawdataCollectionName);
	const findCondition = {
		id_t: devid + "#" + tagname,
		$and:[
			{dt:{$gte: startTime}},
			{dt:{$lt: endTime}}
		],
		q: 0
	};
	return await collection
		.find(findCondition)
		.project({_id:0,v:1,dt:1})
		.sort({dt:1})
		.toArray();
}

async function main() {
	await client.connect();
	log('Connect success');
	const db = client.db();
	
	for(var tagIdx=0, tagCount=taglist.length; tagIdx<tagCount; tagIdx++){
		var taginfo = taglist[tagIdx];
		var devid = taginfo[0], tagname=taginfo[1];
		var queryResultArr = await findRawData(db, devid, tagname, checkStartTime, checkEndTime); //document array
		var dataCount = queryResultArr.length;
		if(dataCount < 2){
			continue;
		}
		console.log();
		var preDoc = queryResultArr[0], abnormalDataCount = 0;
		log("-------- tag: [" + devid + "," + tagname + "] --------");
		for(var i=1; i<dataCount; i++){
			var nextDoc = queryResultArr[i];
			if(nextDoc.v < preDoc.v){
				log("Abnormal data:[" + devid + "," + tagname + "], prevData=" + JSON.stringify(preDoc)
					+ ", nextData=" + JSON.stringify(nextDoc)
				);
				abnormalDataCount++;
			}
			preDoc = nextDoc;
		}
	}
	console.log();
	return "All done";
}

main()
.then(log)
.catch(console.error)
.finally(()=>{
	client.close();
	log("Connection closed");
});

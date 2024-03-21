-- group
SELECT
	orgname,
	orgid as oldid,
	'group' migrationtype
FROM
	orginfo
WHERE
	orgid = 85
	OR prelevelorgid = 85;

-- object
SELECT
	orgname,
	equip.equipname,
	equip.equipid as oldid,
	'object' migrationtype
FROM
	orginfo AS org
	JOIN equipinfo AS equip ON equip.orgid = org.orgid
WHERE
	org.orgid = 85
	OR org.prelevelorgid = 85;

-- device
SELECT
	orgname,
	device.devname,
	param.tagname,
	CONCAT(org.rootorg, '&', param.devid, '&', param.tagname) AS oldid,
	'device' migrationtype
FROM
	orginfo AS org
	JOIN equipinfo AS equip ON equip.orgid = org.orgid
	JOIN devicetaginfo AS param ON param.equipid = equip.equipid
	JOIN deviceinfo AS device ON device.devid = param.devid
WHERE (org.orgid = 85
	OR org.prelevelorgid = 85)
AND param.savefreq > 0
AND device.vtype != 1;

-- virtual device
SELECT
	org.orgname,
	equip.equipname,
	CONCAT(org.rootorg, '&', param.devid, '&', param.equipparam) AS oldid,
	'virtual-device' migrationtype
FROM
	orginfo AS org
	JOIN equipinfo AS equip ON equip.orgid = org.orgid
	JOIN devicetaginfo AS param ON param.equipid = equip.equipid
WHERE (org.orgid = 85
	OR org.prelevelorgid = 85)
AND param.savefreq > 0
AND param.datatype != 1
AND param.datatype != 2
AND param.datatype != 3;

-- parameter
SELECT
	org.orgname,
	equip.equipname,
	CONCAT(org.rootorg, '&', param.equipid, '&', param.equipparam) AS oldid,
	CASE WHEN param.datatype % 10 = 1 THEN
		'parameter/analog'
	WHEN param.datatype % 10 = 2 THEN
		'parameter/discrete'
	WHEN param.datatype % 10 = 3 THEN
		'parameter/string'
	WHEN param.datatype % 10 = 4 THEN
		'parameter/string'
	WHEN param.datatype % 10 = 5 THEN
		'parameter/string'
	ELSE
		'unknown'
	END AS migrationtype
FROM
	orginfo AS org
	JOIN equipinfo AS equip ON equip.orgid = org.orgid
	JOIN devicetaginfo AS param ON param.equipid = equip.equipid
WHERE (org.orgid = 85
	OR org.prelevelorgid = 85)
AND param.savefreq > 0;

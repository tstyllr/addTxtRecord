const Core = require('@alicloud/pop-core');

// 阿里云配置
const clientConfig = {
  accessKeyId: process.env.accessKeyId,
  accessKeySecret: process.env.accessKeySecret,
  endpoint: 'https://alidns.aliyuncs.com',
  apiVersion: '2015-01-09'
};


// 创建客户端
const client = new Core(clientConfig);

/**
 * 查询指定记录
 * @param {string} domainName 主域名
 * @param {string} rr 主机记录
 * @param {string} type 记录类型
 * @returns {Promise<Array>} 返回记录数组
 */
async function queryRecords(domainName, rr, type = 'TXT') {
  const params = {
    DomainName: domainName,
    RRKeyWord: rr,
    TypeKeyWord: type,
    PageSize: 20
  };

  try {
    const result = await client.request('DescribeDomainRecords', params);
    return result.DomainRecords.Record || [];
  } catch (err) {
    console.error('查询记录失败:', err);
    throw err;
  }
}

/**
 * 删除记录
 * @param {string} recordId 记录ID
 * @returns {Promise}
 */
async function deleteRecord(recordId) {
  const params = {
    RecordId: recordId
  };

  try {
    await client.request('DeleteDomainRecord', params);
    console.log(`删除旧记录 ${recordId} 成功`);
  } catch (err) {
    console.error('删除旧记录失败:', err);
    throw err;
  }
}

/**
 * 添加TXT记录
 * @param {string} domainName 主域名，例如 'example.com'
 * @param {string} rr 主机记录，例如 '_acme-challenge' 或 'test'
 * @param {string} value TXT记录值
 * @param {number} [ttl=600] TTL值，默认为600秒
 * @returns {Promise} 返回Promise对象
 */
async function addTxtRecord(domainName, rr, value, ttl = 600) {

  // 查询现有记录
  const existingRecords = await queryRecords(domainName, rr, 'TXT');

  // 删除所有匹配的旧记录
  for (const record of existingRecords) {
    if (record.RR === rr && record.Type === 'TXT') {
      await deleteRecord(record.RecordId);
    }
  }

  const params = {
    RegionId: 'cn-hangzhou', // 固定值
    DomainName: domainName,
    RR: rr,
    Type: 'TXT',
    Value: value,
    TTL: ttl
  };

  const requestOption = {
    method: 'POST'
  };

  try {
    const result = await client.request('AddDomainRecord', params, requestOption);
    return result;
  } catch (err) {
    throw err;
  }
}

// 使用示例
(async () => {
  try {
    if (!process.env.accessKeyId || !process.env.accessKeySecret) {
      throw new Error('请设置阿里云的 accessKeyId, accessKeySecret');
    }

    if (!process.env.domainName)
      throw new Error('请设置域名，例如 "example.com"');

    if (!process.env.rr)
      throw new Error('请设置主机记录，例如 "_acme-challenge"');

    if (!process.env.value)
      throw new Error('请设置TXT记录值');

    // 示例：为 example.com 添加 _acme-challenge 子域的TXT记录
    await addTxtRecord(process.env.domainName, process.env.rr, process.env.value);
    console.log(`添加记录成功:${process.env.rr} ${process.env.domainName} ${process.env.value}`);
  } catch (e) {
    console.error('添加记录失败:', e);
  }
})();
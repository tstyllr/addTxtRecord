## 启动环境

```sh
docker build -t addtxtrecord . && \
docker run -it addtxtrecord
```

## 设置阿里云的 accessKeyId, accessKeySecret

```sh
source setenv.sh <accessKeyId> <accessKeySecret>
```

## 添加 TXT 记录

```sh
source go.sh <rr> <domainName> <value>
```

- `<rr>`：主机记录，例如 '\_acme-challenge'
- `<domainName>`：主域名，例如 'example.com'
- `<value>`：TXT 记录值

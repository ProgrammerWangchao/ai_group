
# SSL证书配置指南

## 获取证书
推荐使用Let's Encrypt免费证书：
```bash
sudo apt install certbot
sudo certbot certonly --standalone -d yourdomain.com
```

## 证书文件结构
将以下文件放入此目录：
- `fullchain.pem`: 完整证书链
- `privkey.pem`: 私钥文件

## 自动续期
设置crontab自动续期：
```bash
0 0 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
```


# 开发环境配置指南

## 系统要求
- **操作系统**: Windows 10+/macOS 10.15+/Linux
- **内存**: 8GB+ (推荐16GB)
- **磁盘空间**: 10GB+

## 环境准备

### 1. 安装基础工具
```bash
# Node.js (前端)
nvm install 16.14.0

# Python (后端)
pyenv install 3.9.7

# Docker (数据库和Redis)
docker --version
```

### 2. 克隆项目
```bash
git clone https://github.com/your-repo/ai-tools.git
cd ai-tools
```

## 前端配置

### 1. 安装依赖
```bash
cd frontend
npm install
```

### 2. 环境变量
创建 `.env.development` 文件:
```ini
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_ANALYTICS_ID=UA-XXXXX-Y
```

### 3. 启动开发服务器
```bash
npm run dev
```

## 后端配置

### 1. 创建虚拟环境
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

### 2. 安装依赖
```bash
pip install -r requirements.txt
```

### 3. 数据库设置
```bash
# 启动PostgreSQL和Redis
docker-compose up -d db redis

# 迁移数据库
python manage.py migrate
```

### 4. 运行开发服务器
```bash
python manage.py runserver
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run build` | 构建前端生产版本 |
| `python manage.py makemigrations` | 创建数据库迁移 |
| `docker-compose up` | 启动所有服务 |
| `pytest` | 运行测试 |

## 问题排查
1. **端口冲突**:
   - 修改 `backend/core/settings.py` 中的 `PORT` 设置
   - 或调整前端 `vite.config.js` 的 `server.port`

2. **数据库连接失败**:
   ```bash
   # 检查数据库服务状态
   docker ps
   # 重置数据库
   docker-compose down -v && docker-compose up -d db
   ```


# AI 工具集合平台

## 项目概述
一个高颜值、用户友好的AI工具导航与集合平台，帮助用户快速查找、了解并访问各种AI工具。

## 技术栈
### 前端
- React + Vite
- Material UI
- Redux Toolkit
- React Router
- Axios

### 后端
- Django + Django REST Framework
- PostgreSQL
- JWT认证

## 功能模块
- 首页展示
- 工具分类浏览
- 工具详情页
- 搜索功能
- 工具提交系统
- 管理后台
  - 用户管理
    - 用户列表查看
    - 用户权限管理
    - 用户验证状态管理
    - 用户删除
  - 工具管理
  - 分类管理
  - 标签管理
- 系统监控仪表板
  - 实时健康状态检查
  - 数据库连接监控
  - 系统版本信息

## 开发环境配置

### 快速开始
1. **初始化项目**:
   ```bash
   chmod +x init_project.sh
   ./init_project.sh
   ```

2. **启动开发服务器**:
   ```bash
   chmod +x start_dev.sh
   ./start_dev.sh
   ```

3. **文档系统测试**:
   - Linux/macOS:
     ```bash
     chmod +x scripts/test_docs.sh
     ./scripts/test_docs.sh
     ```
   - Windows:
     ```powershell
     .\scripts\build_docs_win.ps1
     .\scripts\verify_docs_win.ps1
     cd docs\_build\html
     python -m http.server 8000
     ```
   这将执行:
   - 清理旧构建
   - 重新构建文档
   - 验证文档完整性
   - 启动本地测试服务器

## 文档系统
项目文档采用Markdown编写，自动构建为HTML并部署到GitHub Pages:
- 在线文档: https://[your-username].github.io/[repo-name]
- 文档构建: 推送代码到main分支时自动触发
- 文档目录: `/docs`
- 文档模板: `/docs/template.html`

### 手动配置
1. 克隆仓库
2. 安装依赖
   - 前端: `cd frontend && npm install`
   - 后端: `cd backend && pip install -r requirements.txt`
3. 配置环境变量
   - 复制 `backend/.env.example` 为 `backend/.env` 并填写实际值
4. 初始化数据库
   ```bash
   cd backend && python manage.py migrate
   ```
5. 运行开发服务器
   - 后端: `cd backend && python manage.py runserver`
   - 前端: `cd frontend && npm run dev`

## 部署指南

### 数据库管理

#### 生产环境
1. **手动备份**:
   ```bash
   cd backend/scripts && ./backup_db.sh
   ```

2. **恢复数据库**:
   ```bash
   cd backend/scripts && ./restore_db.sh /path/to/backup_file.dump
   ```

3. **设置自动备份**:
   ```bash
   cd backend/scripts && ./setup_backup_cron.sh
   ```

4. **数据库迁移**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

#### 开发环境
1. **生成测试数据**:
   ```bash
   python backend/scripts/generate_test_data.py
   ```

2. **导出数据**:
   ```bash
   python backend/scripts/data_utils.py --export --file=data_export.json
   ```

3. **导入数据**:
   ```bash
   python backend/scripts/data_utils.py --import --file=data_export.json
   ```

### 本地开发
1. 克隆仓库
   git clone https://github.com/ProgrammerWangchao/ai_group.git
   cd ai_group
2. 安装依赖
   - 前端: `cd frontend && npm install`
   - 后端: `cd backend && pip install -r requirements.txt`
3. 配置环境变量
   - 复制 `backend/.env.example` 为 `backend/.env` 并填写实际值
4. 启动服务
   - 后端: `cd backend && python manage.py runserver`
   - 前端: `cd frontend && npm run dev`

### Docker 部署
1. 安装 Docker 和 Docker Compose
2. 构建并启动容器:
   ```bash
   docker-compose up -d --build
   ```
3. 访问应用:
   - 前端: http://localhost:3000
   - 后端API: http://localhost:8000/api

### 生产环境部署
# 1. 克隆项目
git clone https://github.com/ProgrammerWangchao/ai_group.git
cd ai_group

1. 配置生产环境变量
   - 后端: 设置 `DJANGO_DEBUG=False` 并提供有效的 `DJANGO_SECRET_KEY`
   - 前端: 配置 `.env.production` 文件
2. 构建生产版本:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```
3. 配置HTTPS (推荐使用Let's Encrypt)
   - 安装certbot: `sudo apt install certbot`
   - 获取证书: `sudo certbot certonly --standalone -d yourdomain.com`
   - 将证书文件(fullchain.pem和privkey.pem)复制到`frontend/ssl/`目录
   - 设置自动续期: 
     ```bash
     0 0 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
     ```
4. 配置域名和DNS记录

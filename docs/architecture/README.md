
# 系统架构设计

## 架构概览
```mermaid
graph TD
    A[前端] -->|HTTP API| B[后端]
    B -->|ORM| C[数据库]
    B -->|缓存| D[Redis]
    A -->|静态资源| E[CDN]
```

## 技术栈
### 前端
- **框架**: React + Vite
- **状态管理**: Redux Toolkit
- **UI库**: Material-UI
- **路由**: React Router

### 后端
- **语言**: Python
- **框架**: Django + Django REST Framework
- **数据库**: PostgreSQL
- **缓存**: Redis
- **任务队列**: Celery

### 基础设施
- **容器化**: Docker
- **编排**: Docker Compose
- **CI/CD**: GitHub Actions
- **监控**: Prometheus + Grafana

## 核心流程

### 用户登录流程
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: 输入凭证
    Frontend->>Backend: POST /api/auth/login
    Backend->>Database: 验证用户
    Database-->>Backend: 用户数据
    Backend-->>Frontend: JWT Token
    Frontend->>User: 登录成功
```

### 数据请求流程
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Cache
    participant Database
    
    User->>Frontend: 发起请求
    Frontend->>Backend: API请求 + JWT
    Backend->>Cache: 检查缓存
    alt 缓存命中
        Cache-->>Backend: 返回缓存数据
    else 缓存未命中
        Backend->>Database: 查询数据
        Database-->>Backend: 返回数据
        Backend->>Cache: 写入缓存
    end
    Backend-->>Frontend: 返回数据
    Frontend->>User: 展示结果
```

## 部署架构
```mermaid
graph LR
    A[客户端] --> B[负载均衡]
    B --> C[前端容器]
    B --> D[API容器]
    D --> E[PostgreSQL]
    D --> F[Redis]
    D --> G[Celery Worker]
```

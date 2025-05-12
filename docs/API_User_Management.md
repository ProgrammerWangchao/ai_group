
# 用户管理API文档

## 用户列表
- **URL**: `/api/users/`
- **Method**: `GET`
- **权限**: 管理员
- **查询参数**:
  - `page` (可选): 页码，默认1
  - `page_size` (可选): 每页数量，默认20
  - `search` (可选): 搜索用户名或邮箱
  - `is_active` (可选): 过滤激活状态(true/false)
  - `is_staff` (可选): 过滤员工状态(true/false)
  - `ordering` (可选): 排序字段(-表示降序，如`-date_joined`)
  
- **成功响应** (200):
```json
{
    "count": 100,
    "next": "http://example.com/api/users/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "username": "admin",
            "email": "admin@example.com",
            "is_staff": true,
            "is_active": true,
            "date_joined": "2023-01-01T00:00:00Z"
        }
    ]
}
```

- **错误响应**:
  - 403 Forbidden (非管理员访问)
```json
{
    "detail": "您没有执行该操作的权限。"
}
```
```json
[
    {
        "id": 1,
        "username": "admin",
        "email": "admin@example.com",
        "is_staff": true,
        "is_active": true,
        "is_superuser": true,
        "is_verified": true,
        "date_joined": "2023-01-01T00:00:00Z"
    }
]
```

## 用户详情
- **URL**: `/api/users/{id}/`
- **Method**: `GET`
- **权限**: 管理员
- **路径参数**:
  - `id`: 用户ID (整数或'me'表示当前用户)

- **成功响应** (200):
```json
{
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "is_staff": true,
    "is_active": true,
    "is_superuser": true,
    "is_verified": true,
    "date_joined": "2023-01-01T00:00:00Z"
}
```

- **错误响应**:
  - 403 Forbidden (非管理员访问)
```json
{
    "detail": "您没有执行该操作的权限。"
}
```
  - 404 Not Found (用户不存在)
```json
{
    "detail": "未找到该用户。"
}
```
```json
{
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "is_staff": true,
    "is_active": true,
    "is_superuser": true,
    "is_verified": true,
    "date_joined": "2023-01-01T00:00:00Z"
}
```

## 更新用户
- **URL**: `/api/users/{id}/`
- **Method**: `PUT/PATCH`
- **权限**: 管理员
- **路径参数**:
  - `id`: 用户ID (整数)

- **请求字段**:
  - `username` (可选): 用户名(3-30字符，仅包含字母数字和下划线)
  - `email` (可选): 有效邮箱地址
  - `is_staff` (可选): 设为员工(true/false)
  - `is_active` (可选): 激活/停用账户(true/false)

- **请求示例** (PATCH):
```json
{
    "is_staff": true,
    "email": "new.email@example.com"
}
```

- **成功响应** (200):
```json
{
    "id": 1,
    "username": "admin",
    "email": "new.email@example.com",
    "is_staff": true,
    "is_active": true,
    "date_joined": "2023-01-01T00:00:00Z",
    "last_login": "2023-06-15T08:30:00Z"
}
```

- **错误响应**:
  - 400 Bad Request (验证失败)
```json
{
    "username": ["用户名只能包含字母、数字和下划线。"],
    "email": ["请输入有效的邮箱地址。"]
}
```
  - 403 Forbidden (非管理员访问)
```json
{
    "detail": "您没有执行该操作的权限。"
}
```
  - 404 Not Found (用户不存在)
```json
{
    "detail": "未找到该用户。"
}
```

## 删除用户
- **URL**: `/api/users/{id}/`
- **Method**: `DELETE`
- **权限**: 超级管理员(仅限)
- **路径参数**:
  - `id`: 要删除的用户ID

- **请求头**:
  - `X-Confirm-Delete`: 必须设置为"true"以确认删除操作

- **成功响应**:
  - 204 No Content (删除成功)

- **错误响应**:
  - 400 Bad Request (缺少确认头)
```json
{
    "detail": "必须提供X-Confirm-Delete头确认删除操作"
}
```
  - 403 Forbidden (非超级管理员)
```json
{
    "detail": "只有超级管理员可以删除用户"
}
```
  - 404 Not Found (用户不存在)
```json
{
    "detail": "未找到该用户"
}
```
  - 409 Conflict (尝试删除自己)
```json
{
    "detail": "不能删除当前登录的用户"
}
```

## 验证用户
- **URL**: `/api/users/{id}/verify/`
- **Method**: `POST`
- **权限**: 管理员(需验证权限高于目标用户)
- **路径参数**:
  - `id`: 要验证的用户ID

- **业务规则**:
  - 只能验证权限低于自己的用户
  - 不能验证已经是验证状态的用户
  - 验证后用户将获得完整系统访问权限

- **成功响应** (200):
```json
{
    "status": "user verified",
    "user": {
        "id": 1,
        "username": "user1",
        "email": "user1@example.com",
        "is_verified": true,
        "verified_at": "2023-06-15T10:30:00Z",
        "verified_by": "admin"
    }
}
```

- **错误响应**:
  - 400 Bad Request (用户已是验证状态)
```json
{
    "detail": "该用户已是验证状态"
}
```
  - 403 Forbidden (权限不足)
```json
{
    "detail": "您没有权限验证该用户"
}
```
  - 404 Not Found (用户不存在)
```json
{
    "detail": "未找到该用户"
}
```
  - 409 Conflict (尝试验证自己)
```json
{
    "detail": "不能验证自己"
}
```

## 取消验证用户
- **URL**: `/api/users/{id}/unverify/`
- **Method**: `POST`
- **权限**: 管理员(需权限高于目标用户)
- **路径参数**:
  - `id`: 要取消验证的用户ID

- **业务规则**:
  - 只能取消验证权限低于自己的用户
  - 不能取消验证未验证状态的用户
  - 取消验证后用户将失去部分系统访问权限
  - 超级管理员不能被取消验证

- **成功响应** (200):
```json
{
    "status": "user unverified",
    "user": {
        "id": 1,
        "username": "user1",
        "email": "user1@example.com",
        "is_verified": false,
        "unverified_at": "2023-06-15T11:30:00Z",
        "unverified_by": "admin"
    }
}
```

- **错误响应**:
  - 400 Bad Request (用户已是未验证状态)
```json
{
    "detail": "该用户已是未验证状态"
}
```
  - 403 Forbidden (权限不足或尝试取消验证超级管理员)
```json
{
    "detail": "您没有权限取消验证该用户"
}
```
  - 404 Not Found (用户不存在)
```json
{
    "detail": "未找到该用户"
}
```
  - 409 Conflict (尝试取消验证自己)
```json
{
    "detail": "不能取消验证自己"
}
```

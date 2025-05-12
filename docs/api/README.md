
# API接口文档总览

## 认证方式
所有API使用JWT认证，需要在请求头中添加：
```http
Authorization: Bearer <your_token>
```

## 公共响应格式
### 成功响应
```json
{
  "code": 200,
  "data": {},
  "message": "success"
}
```

### 错误响应
```json
{
  "code": 400,
  "error": "Invalid request",
  "message": "请求参数错误"
}
```

## 接口列表
### 用户管理
- [用户列表](/api/User_Management.md#用户列表)
- [用户详情](/api/User_Management.md#用户详情)
- [创建用户](/api/User_Management.md#创建用户)
- [更新用户](/api/User_Management.md#更新用户)
- [删除用户](/api/User_Management.md#删除用户)

### 工具管理
- [工具列表](/api/Tool_Management.md#工具列表)
- [工具详情](/api/Tool_Management.md#工具详情)
- [创建工具](/api/Tool_Management.md#创建工具)
- [更新工具](/api/Tool_Management.md#更新工具)
- [删除工具](/api/Tool_Management.md#删除工具)

### 分类管理
- [分类列表](/api/Category_Management.md#分类列表)
- [分类详情](/api/Category_Management.md#分类详情)
- [创建分类](/api/Category_Management.md#创建分类)
- [更新分类](/api/Category_Management.md#更新分类)
- [删除分类](/api/Category_Management.md#删除分类)

[查看完整API文档](../api/User_Management.md)

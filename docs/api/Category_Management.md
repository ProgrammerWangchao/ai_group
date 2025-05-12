
# 分类管理API

## 接口列表

### 获取分类树
```http
GET /api/categories/
```

**响应示例**:
```json
[
  {
    "id": 1,
    "name": "AI工具",
    "children": [
      {
        "id": 2, 
        "name": "图像处理"
      }
    ]
  }
]
```

### 创建分类
```http
POST /api/categories/
```

**请求体**:
```json
{
  "name": "新分类",
  "parent_id": null
}
```

### 更新分类
```http
PUT /api/categories/{id}/
```

### 删除分类
```http
DELETE /api/categories/{id}/
```

## 注意事项
1. 删除分类会同时删除其子分类
2. 分类名称必须唯一
3. 最大嵌套深度为3层

## 错误代码
| 代码 | 说明 |
|------|------|
| 400 | 无效的父分类 |
| 409 | 分类名称冲突 |

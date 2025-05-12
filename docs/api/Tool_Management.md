
# 工具管理API

## 接口列表

### 获取工具列表
```http
GET /api/tools/
```

**参数**:
- `page`: 页码
- `page_size`: 每页数量
- `category`: 分类ID筛选

**响应示例**:
```json
{
  "count": 100,
  "results": [
    {
      "id": 1,
      "name": "AI绘图工具",
      "description": "基于深度学习的图像生成工具",
      "url": "https://example.com/ai-draw"
    }
  ]
}
```

### 创建工具
```http
POST /api/tools/
```

**请求体**:
```json
{
  "name": "新工具名称",
  "description": "工具描述",
  "url": "https://example.com",
  "category_ids": [1, 2]
}
```

### 更新工具
```http
PUT /api/tools/{id}/
```

### 删除工具
```http
DELETE /api/tools/{id}/
```

## 错误代码
| 代码 | 说明 |
|------|------|
| 400 | 无效的请求参数 |
| 403 | 无操作权限 |
| 404 | 工具不存在 |


#!/bin/bash

# 验证文档构建结果

echo "=== 开始验证文档构建 ==="

# 检查构建目录是否存在
if [ ! -d "docs/_build/html" ]; then
    echo "错误: 文档构建目录不存在，请先运行 build_docs.sh"
    exit 1
fi

# 检查主要文档文件
required_files=(
    "index.html"
    "api/User_Management.html"
    "components/User_Management.html"
)

missing_files=0

for file in "${required_files[@]}"; do
    if [ ! -f "docs/_build/html/${file}" ]; then
        echo "警告: 缺少文件 ${file}"
        ((missing_files++))
    fi
done

# 检查静态资源
if [ ! -d "docs/_build/html/static" ]; then
    echo "错误: 缺少静态资源目录"
    exit 1
fi

# 输出验证结果
if [ $missing_files -gt 0 ]; then
    echo "=== 验证完成，发现 ${missing_files} 个问题 ==="
    exit 1
else
    echo "=== 文档验证通过 ==="
    echo "文档结构完整，可以部署"
    exit 0
fi

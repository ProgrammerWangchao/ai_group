
#!/bin/bash

# 构建项目文档

echo "=== 开始构建项目文档 ==="

# 安装依赖
if ! command -v pandoc &> /dev/null; then
    echo "安装pandoc..."
    sudo apt-get install -y pandoc
fi

# 创建输出目录
mkdir -p docs/_build/html
mkdir -p docs/_build/html/api
mkdir -p docs/_build/html/components

# 使用markdown生成HTML文档
echo "生成API文档..."
for file in docs/API_*.md; do
    filename=$(basename "$file" .md)
    pandoc "$file" -o "docs/_build/html/api/${filename#API_}.html" \
        --template=docs/template.html \
        --css=/static/style.css
done

echo "生成组件文档..."
for file in docs/Components_*.md; do
    filename=$(basename "$file" .md)
    pandoc "$file" -o "docs/_build/html/components/${filename#Components_}.html" \
        --template=docs/template.html \
        --css=/static/style.css
done

# 复制静态资源
echo "复制静态资源..."
cp -r docs/static docs/_build/html/
cp docs/*.css docs/_build/html/static/

# 生成索引页
echo "生成索引页..."
pandoc docs/README.md -o docs/_build/html/index.html \
    --template=docs/template.html \
    --css=/static/style.css

# 设置权限
chmod -R 755 docs/_build

echo "=== 文档构建完成 ==="
echo "文档已生成到: docs/_build/html"
echo "可以通过Python快速查看:"
echo "cd docs/_build/html && python3 -m http.server 8000"

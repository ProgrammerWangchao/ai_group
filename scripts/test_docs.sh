
#!/bin/bash

# 测试文档系统

echo "=== 开始测试文档系统 ==="

# 1. 清理旧构建
echo "清理旧构建..."
rm -rf docs/_build

# 2. 构建文档
echo "构建文档..."
./scripts/build_docs.sh

# 3. 验证文档
echo "验证文档..."
./scripts/verify_docs.sh
if [ $? -ne 0 ]; then
    echo "文档验证失败"
    exit 1
fi

# 4. 启动测试服务器
echo "启动测试服务器..."
echo "请在浏览器中访问: http://localhost:8000"
echo "按Ctrl+C停止测试"
cd docs/_build/html && python3 -m http.server 8000

echo "=== 文档系统测试完成 ==="


# Windows平台文档验证脚本
# 使用UTF-8编码保存

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "=== 开始验证文档构建 ===" -ForegroundColor Green

# 检查构建目录是否存在
if (-not (Test-Path "docs\_build\html")) {
    Write-Host "错误: 文档构建目录不存在，请先运行 build_docs_win.ps1" -ForegroundColor Red
    exit 1
}

# 检查主要文档文件
$requiredFiles = @(
    "index.html",
    "api\User_Management.html", 
    "components\User_Management.html"
)

$missingFiles = 0

foreach ($file in $requiredFiles) {
    $filePath = "docs\_build\html\$file"
    if (-not (Test-Path $filePath)) {
        Write-Host "警告: 缺少文件 $file" -ForegroundColor Yellow
        $missingFiles++
    }
}

# 检查静态资源
if (-not (Test-Path "docs\_build\html\static")) {
    Write-Host "错误: 缺少静态资源目录" -ForegroundColor Red
    exit 1
}

# 输出验证结果
if ($missingFiles -gt 0) {
    Write-Host "=== 验证完成，发现 $missingFiles 个问题 ===" -ForegroundColor Red
    exit 1
} else {
    Write-Host "=== 文档验证通过 ===" -ForegroundColor Green
    Write-Host "文档结构完整，可以部署" -ForegroundColor Cyan
    exit 0
}

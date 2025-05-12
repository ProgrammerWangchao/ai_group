# Windows平台文档系统测试脚本
# 使用UTF-8编码保存

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "=== 开始测试文档系统 ===" -ForegroundColor Green

# 1. 清理旧构建
Write-Host "清理旧构建..." -ForegroundColor Cyan
if (Test-Path "docs\_build") {
    Remove-Item -Recurse -Force "docs\_build"
}

# 2. 构建文档
Write-Host "构建文档..." -ForegroundColor Cyan
& "$PSScriptRoot\build_docs_win.ps1"
if ($LASTEXITCODE -ne 0) {
    Write-Host "文档构建失败" -ForegroundColor Red
    exit 1
}

# 3. 验证文档
Write-Host "验证文档..." -ForegroundColor Cyan
& "$PSScriptRoot\verify_docs_win.ps1"
if ($LASTEXITCODE -ne 0) {
    Write-Host "文档验证失败" -ForegroundColor Red
    exit 1
}

# 4. 启动测试服务器
Write-Host "启动测试服务器..." -ForegroundColor Cyan
Write-Host "请在浏览器中访问: http://localhost:8000" -ForegroundColor Yellow
Write-Host "按Ctrl+C停止测试" -ForegroundColor Yellow

Set-Location "docs\_build\html"
python -m http.server 8000

Write-Host "=== 文档系统测试完成 ===" -ForegroundColor Green 
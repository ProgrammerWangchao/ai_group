
# Windows文档构建脚本 - 使用本地pandoc版本
# 必须保存为UTF-8 with BOM格式

# 设置编码
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# 使用项目内的pandoc
$pandoc = Join-Path $PSScriptRoot "..\pandoc-3.6.4\pandoc.exe"
if (!(Test-Path $pandoc)) {
    Write-Host "找不到pandoc，请确认以下路径是否存在: $pandoc" -ForegroundColor Red
    exit 1
}

# 创建目录
$buildDir = "docs\_build\html"
if (!(Test-Path $buildDir)) { mkdir $buildDir -Force }

# 构建文档的函数
function Build-Docs {
    param($inputPattern, $outputSubDir, $namePrefix = "")
    
    Get-ChildItem $inputPattern | ForEach-Object {
        $outFile = "$buildDir\$outputSubDir\$($_.BaseName -replace $namePrefix,'').html"
        if (!(Test-Path "$buildDir\$outputSubDir")) { mkdir "$buildDir\$outputSubDir" }
        Write-Host "构建文档: $_ -> $outFile"
        & $pandoc $_ -o $outFile --template=docs\template.html --css=/static/style.css
    }
}

# 构建各类文档
# 构建所有API文档
Build-Docs -inputPattern "docs\API_*.md" -outputSubDir "api" -namePrefix "API_"
Build-Docs -inputPattern "docs\api\*.md" -outputSubDir "api"
Build-Docs -inputPattern "docs\Components_*.md" -outputSubDir "components" -namePrefix "Components_"
Build-Docs -inputPattern "docs\database\*.md" -outputSubDir "database"
Build-Docs -inputPattern "docs\architecture\*.md" -outputSubDir "architecture"
Build-Docs -inputPattern "docs\guides\*.md" -outputSubDir "guides"
Build-Docs -inputPattern "docs\CONTRIBUTING.md" -outputSubDir "."
Build-Docs -inputPattern "docs\CHANGELOG.md" -outputSubDir "."

# 处理静态资源
if (Test-Path "docs\static") {
    Copy-Item -Recurse "docs\static" "$buildDir\" -Force
}

# 构建首页
Write-Host "构建首页..."
& $pandoc docs\README.md -o "$buildDir\index.html" --template=docs\template.html --css=/static/style.css

Write-Host "文档构建完成!" -ForegroundColor Green
Write-Host "输出目录: $buildDir" -ForegroundColor Cyan

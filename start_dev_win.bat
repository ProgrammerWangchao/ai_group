chcp 65001
#!/bin/bash
REM Path: start_dev_win.bat
REM Compare this snippet from init_project_win.bat
@echo off

REM 启动开发环境脚本
echo === 启动AI工具集合平台开发环境 ===

REM 启动后端服务
echo 启动后端服务...
cd backend
start /B python manage.py runserver
set BACKEND_PID=%ERRORLEVEL%

REM 启动前端服务
echo 启动前端服务...
cd ..\frontend
start /B npm run dev
set FRONTEND_PID=%ERRORLEVEL%

REM 捕获Ctrl+C信号（Windows批处理不直接支持，但可以通过其他方式处理）
REM 注意：Windows批处理没有直接的trap机制来捕获Ctrl+C信号。
REM 一种可能的解决方案是使用一个循环来定期检查一个标志变量，
REM 当用户按下Ctrl+C时，设置该标志变量并退出循环。
REM 这里我们简化处理，不提供Ctrl+C信号的优雅捕获。

echo 后端服务运行在: http://localhost:8000
echo 前端服务运行在: http://localhost:3000
echo 按Ctrl+C停止服务

REM 保持脚本运行（实际上，由于Windows批处理没有直接的wait命令，
REM 我们可以简单地让脚本结束，因为start命令已经启动了后台进程。）
REM 注意：这里我们实际上没有实现真正的“等待”逻辑，
REM 因为start命令已经使进程在后台运行。
REM 如果您需要等待前端或后端服务完全启动后再执行其他操作，
REM 您可能需要实现一个循环来检查服务是否已就绪。

REM 在实际使用中，您可能希望添加一些额外的逻辑来处理错误情况，
REM 比如检查后端或前端服务是否成功启动，以及在脚本结束时清理资源等。
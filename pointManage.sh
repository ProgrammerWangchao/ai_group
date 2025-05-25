#!/bin/bash

# 显示菜单的函数
display_menu() {
    echo "选择一个选项:"
    echo "1. 打开端口"
    echo "2. 关闭端口"
    echo "3. 检查当前端口状态"
    echo "4. 退出"
}

# 打开端口的函数
open_port() {
    read -p "请输入要打开的端口号: " port
    sudo firewall-cmd --zone=public --add-port=$port/tcp --permanent && sudo firewall-cmd --reload
    echo "端口 $port 已成功打开"
}

# 关闭端口的函数
close_port() {
    read -p "请输入要关闭的端口号: " port
    sudo firewall-cmd --zone=public --remove-port=$port/tcp --permanent && sudo firewall-cmd --reload
    echo "端口 $port 已成功关闭"
}

# 检查端口状态的函数
check_port() {
    read -p "请输入要检查的端口号: " port
    sudo firewall-cmd --list-ports | grep -q $port/tcp
    if [ $? -eq 0 ]; then
        echo "端口 $port 是打开的"
    else
        echo "端口 $port 是关闭的"
    fi
    sudo netstat -tuln | grep $port
    if [ $? -eq 0 ]; then
        echo "端口 $port 正在被使用"
    else
        echo "端口 $port 没有被使用"
    fi
}

# 主脚本逻辑
while true; do
    display_menu
    read -p "请输入您的选择: " choice
    case $choice in
        1)
            open_port
            ;;
        2)
            close_port
            ;;
        3)
            check_port
            ;;
        4)
            echo "正在退出..."
            exit 0
            ;;
        *)
            echo "无效的选择。请重试。"
            ;;
    esac
done

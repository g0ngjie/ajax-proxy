#!/bin/bash

echo "开始压缩扩展插件..."

if [ ! -f "ajax-proxy.zip" ]; then
    echo "文件不存在"
else
    echo "删除原压缩文件"
    rm -rf ajax-proxy.zip
fi

cd extensions &&
    zip -r ajax-proxy.zip ./* &&
    mv ajax-proxy.zip ..

echo "压缩结束"

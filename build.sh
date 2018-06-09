#!/bin/sh
tar -zcf blog-react-cdn.tar.gz --exclude=node_modules --exclude=blog-react-cdn.tar.gz ./*
# tar -zcf blog-react-cdn.tar.gz --exclude=blog-react-cdn.tar.gz ./*
scp blog-react-cdn.tar.gz root@47.104.157.93:/data/app/html/blog-react-cdn/blog-react-cdn.tar.gz

rm -rf blog-react-cdn.tar.gz
echo ' 服务器处理 '
ssh root@47.104.157.93 << eeooff
	cd /data/app/html/blog-react-cdn/
	# 开启扩展通配符
	shopt -s  extglob

	# rm -rf blog-react-cdn/* !(node_modules)
	rm -rf `ls blog-react-cdn |egrep -v node_modules`

	tar -zxf blog-react-cdn.tar.gz -C blog-react-cdn

	exit 
eeooff
echo Finished: SUCCESS!

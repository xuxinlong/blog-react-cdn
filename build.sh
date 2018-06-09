#!/bin/sh
# tar -zcvf blog-react-cdn.tar.gz --exclude=node_modules/blog-react-cdn.tar.gz ./*
tar -zcvf blog-react-cdn.tar.gz --exclude=blog-react-cdn.tar.gz ./*
scp blog-react-cdn.tar.gz root@47.104.157.93:/data/app/html/blog-react-cdn/blog-react-cdn.tar.gz

rm -rf blog-react-cdn.tar.gz
echo ' 服务器处理 '
ssh root@47.104.157.93 << eeooff
	cd /data/app/html/blog-react-cdn/
	rm -rf blog-react-cdn/*
	tar -zxf blog-react-cdn.tar.gz -C blog-react-cdn

	exit 
eeooff
echo Finished: SUCCESS!

---
layout: post
title:  "centos相关命令"
categories: java
tags:  centos
---

* content
{:toc}


# 压缩
```
tar -zcvf test.tar.gz /app/test
```
# 解压

```
tar -zxvf test.tar.gz -C /app/test
```

# zless

查询当天未压缩归档日志我们一般使用less/more/cat/tail/head命令，但是一般都会对前几日日志进行压缩归档，例如以zip格式存储。此时我们可以使用zless/zmore/zcat来进行不解压查看。

# 查询内存：
-l 详情
-m mb为单位
```
free -lm
```
# 查询磁盘空间：
-l 详情
-h 人能识别
```
df -lh
```
# 查询文件列表大小：
-l 详情
-h 人能识别
```
ls -lh
```
# centos下使用root修改/重置其他用户密码
```
passwd <username>
```
# windows下端口占用
1.
```
netstat -ano|findstr 端口号
```
2.
```
 tasklist|findstr 进程ID
```
3.
```
taskkill /f /t /im 程序名
```
<!--more-->

# centos下端口占用

1.

```
netstat -pan|grep 端口
``` 

2.

```
ps PID号
```
3.
```
kill -9 PID号
```



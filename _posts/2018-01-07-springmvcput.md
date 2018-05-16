---
layout: post
title:  "spring mvc支持http put方法请求"
categories: java
tags:  spring http mvc
---

* content
{:toc}


在实际应用中表单使用put方法提交的数据在spring mvc的controller中接收不到，需要加一个过滤器来处理。

1. 在web.xml中添加一个filter，用来过滤rest中的方法。代码如下
```
<filter>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```
2. 前端界面表单添加参数：
_method = "PUT"，并且以POST方法请求。后台controller中以PUT方法接收，即可获取表单中提交的所有数据。
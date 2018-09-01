---
layout: post
title:  "71. 简化路径"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定一个文档 (Unix-style) 的完全路径，请进行路径简化。

```
例如，
path = "/home/", => "/home"
path = "/a/./b/../../c/", => "/c"
```

边界情况:

* 你是否考虑了 路径 = "/../" 的情况？
* 在这种情况下，你需返回 "/" 。
* 此外，路径中也可能包含多个斜杠 '/' ，如 "/home//foo/" 。
* 在这种情况下，你可忽略多余的斜杠，返回 "/home/foo" 。

解：栈的简单应用，

```
class Solution {
    public String simplifyPath(String path) {
        Stack<String> stack = new Stack<>();
        String[] p = path.split("/");
        for (int i = 0; i < p.length; i++) {
            if (!stack.empty() && p[i].equals("..")) {
                stack.pop();
            } else if (!p[i].equals(".") && !p[i].equals("") && !p[i].equals("..")) {
                stack.push(p[i]);
            }
        }
        List<String> list = new ArrayList(stack);
        return "/" + String.join("/", list);
    }
}
```


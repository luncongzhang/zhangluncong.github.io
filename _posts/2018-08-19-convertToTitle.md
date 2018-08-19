---
layout: post
title:  "168. Excel表列名称"
categories: 算法
tags: leetcode 数学
---

* content
{:toc}

<!--more-->

给定一个正整数，返回它在 Excel 表中相对应的列名称。

例如，

```
    1 -> A
    2 -> B
    3 -> C
    ...
    26 -> Z
    27 -> AA
    28 -> AB 
    ...
```

示例 1:

```
输入: 1
输出: "A"
```

示例 2:

```
输入: 28
输出: "AB"
```

示例 3:

```
输入: 701
输出: "ZY"
```

解：其实就是10进制转26进制。

```
class Solution {
    public String convertToTitle(int n) {
        char a = 'A';
        StringBuilder sb = new StringBuilder();
        while (n != 0) {
            a = 'A';
            a += (n - 1) % 26;
            sb.append(a);
            n = (n - 1) / 26;
        }
        sb.reverse();
        return sb.toString();
    }
}
```
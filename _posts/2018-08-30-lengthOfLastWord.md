---
layout: post
title:  "58. 最后一个单词的长度"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指由字母组成，但不包含任何空格的字符串。

示例:

```
输入: "Hello World"
输出: 5
```

解：这算什么题哦。。。

```
class Solution {
    public int lengthOfLastWord(String s) {
        if ("".equals(s)) {
            return 0;
        }
        int i = s.length() - 1;
        while (i >= 0 && s.charAt(i) == ' ') {
            i--;
        }
        int tmp = i;
        while (i >= 0 && s.charAt(i) != ' ') {
            i--;
        }
        return tmp - i;
    }
}
```


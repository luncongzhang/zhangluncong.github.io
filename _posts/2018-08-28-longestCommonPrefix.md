---
layout: post
title:  "14. 最长公共前缀"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

```
输入: ["flower","flow","flight"]
输出: "fl"
```

示例 2:

```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

说明:

所有输入只包含小写字母 a-z 。

解：代码还是挺有意思的，先把第一个字符串赋值给一个pre,然后遍历其他的字符串，如果不是子集，然后把pre减少一个字符，直到是子集为止，再遍历其他字符串，所有都满足就是结果了。这题还可以用字典树来解决，很重要的知识点，后面会涉及。

```
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) {
            return "";
        }
        String pre = strs[0];
        int i = 1;
        while (i < strs.length) {
            while (strs[i].indexOf(pre) != 0) {
                pre = pre.substring(0, pre.length() - 1);
            }
            i++;
        }
        return pre;
    }
}
```


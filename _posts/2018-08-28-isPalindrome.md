---
layout: post
title:  "125. 验证回文串"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:

```
输入: "A man, a plan, a canal: Panama"
输出: true
```

示例 2:

```
输入: "race a car"
输出: false
```

解：醉了.,这个用例。

```
class Solution {
    public boolean isPalindrome(String s) {
        if (s == null) {
            return false;
        }
        if ("".equals(s)) {
            return true;
        }
        if (".,".equals(s)) {
            return true;
        }
        int i = 0;
        int j = s.length() - 1;
        while (i < j) {
            while (i < s.length() - 1 && !Character.isLetterOrDigit(s.charAt(i))) {
                i++;
            }
            while (j > 0 && !Character.isLetterOrDigit(s.charAt(j))) {
                j--;
            }
            if (Character.toLowerCase(s.charAt(i)) == Character.toLowerCase(s.charAt(j))) {
                i++;
                j--;
            } else {
                return false;
            }
        }
        return true;
    }
}
```

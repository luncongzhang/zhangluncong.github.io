---
layout: post
title:  "9. 回文数"
categories: 算法
tags: leetcode 数学
---

* content
{:toc}

<!--more-->

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

```
输入: 121
输出: true
```

示例 2:

```
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```

示例 3:

```
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
```
进阶:

* 你能不将整数转为字符串来解决这个问题吗？

解：结合上题的reverse，两位数以上的正数反转后溢出的肯定不是回文数字。

```
class Solution {
    public int reverse(int x) {
        //long保存有可能会溢出int的数
        long result = 0;
        while (x != 0) {
            //对10取余求末尾的数
            int tail = x % 10;
            long newResult = result * 10 + tail;
            //溢出直接返回0
            if (newResult > Integer.MAX_VALUE || newResult < Integer.MIN_VALUE) {
                return 0;
            }
            result = newResult;
            x = x / 10;
        }
        return (int) result;
    }

    public boolean isPalindrome(int x) {
        if (x < 0) {//负数全不是
            return false;
        }
        if (x < 10) {//一位全是
            return true;
        }
        if (x == reverse(x)) {
            return true;
        } else {
            return false;
        }
    }
}
```
---
layout: post
title:  "179. 最大数"
categories: 算法
tags: leetcode 排序
---

* content
{:toc}

<!--more-->

给定一组非负整数，重新排列它们的顺序使之组成一个最大的整数。

示例 1:

```
输入: [10,2]
输出: 210
```

示例 2:

```
输入: [3,30,34,5,9]
输出: 9534330
说明: 输出结果可能非常大，所以你需要返回一个字符串而不是整数。
```
解：

```
class Solution {
    public String largestNumber(int[] nums) {
        // int[] --> String[]
        String[] array = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            array[i] = nums[i] + "";
        }
        // sort string
        Arrays.sort(array, (sA, sB) -> (sB + sA).compareTo(sA + sB));
        // string[] -> result
        StringBuilder sb = new StringBuilder();
        for (String s : array) {
            sb.append(s);
        }
        return sb.charAt(0) == '0' ? "0" : sb.toString();
    }
}
```
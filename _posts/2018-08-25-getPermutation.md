---
layout: post
title:  "60. 第k个排列"
categories: 算法
tags: leetcode 数学
---

* content
{:toc}

<!--more-->

给出集合 [1,2,3,…,n]，其所有元素共有 n! 种排列。

按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

```
"123"
"132"
"213"
"231"
"312"
"321"
```

给定 n 和 k，返回第 k 个排列。

说明：

* 给定 n 的范围是 [1, 9]。
* 给定 k 的范围是[1,  n!]。

示例 1:

```
输入: n = 3, k = 3
输出: "213"
```

示例 2:

```
输入: n = 4, k = 9
输出: "2314"
```

解：

```
class Solution {
    public static String getPermutation(int n, int k) {
        LinkedList<Integer> list = new LinkedList<Integer>();
        for (int i = 1; i <= n; i++) {
            list.add(i);
        }
        return getNextRange(list, k - 1);
    }

    public static String getNextRange(LinkedList<Integer> list, int k) {

        String result = "";
        if (list == null || list.size() == 0) {
            return result;
        }
        //求总的排列数
        int total = 1;
        for (int i = 1; i <= list.size(); i++) {
            total = total * i;
        }
        //每个数字开头有几种排列
        int every = total / list.size();
        //几开头，在list中的索引
        int range = k / every;
        //几开头，的第几个排列
        int other = k % every;

        Integer temp = list.get(range);
        list.remove(list.get(range));
        
        //递归
        result = temp + getNextRange(list, other);
        return result;
    }
}
```


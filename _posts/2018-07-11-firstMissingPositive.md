---
layout: post
title:  "41. 缺失的第一个正数"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个未排序的整数数组，找出其中没有出现的最小的正整数。

示例 1:

```
输入: [1,2,0]
输出: 3
```

示例 2:

```
输入: [3,4,-1,1]
输出: 2
```

示例 3:

```
输入: [7,8,9,11,12]
输出: 1
```
说明:

你的算法的时间复杂度应为O(n)，并且只能使用常数级别的空间。

解：代码虽少，句句精华

```
 public int firstMissingPositive(int[] nums) {
        //由于找缺失的最小正整数，并且只能使用常数级别的空间，虚拟一个整数数组1，2，3...
        //count为虚拟数组指针，遍历原数组，开始组建虚拟数组
        int count = 1;
        for (int i = 0; i < nums.length; i++) {
            if (count == nums[i]) {
                count ++;
                i = -1;
            }
        }
        return count;
    }
```
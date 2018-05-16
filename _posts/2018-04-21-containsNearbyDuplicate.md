---
layout: post
title:  "219. 存在重复元素 II"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}


给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使 nums [i] = nums [j]，并且 i 和 j 的绝对差值最大为 k。

<!--more-->

解：理解题目，马德理解错了题目，ac半天没ac出来，存在存在，只要存在就返回true！！

```
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<Integer, Integer>();
        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(nums[i])) {
                if (i - map.get(nums[i]) > k) {
                    map.put(nums[i], i);
                } else {
                    return true;
                }
            } else {
                map.put(nums[i], i);
            }
        }
        return false;
    }
```
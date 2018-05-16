---
layout: post
title:  "53. 最大子序和"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}


给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个数），返回其最大和。

示例:

输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

进阶:

如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

解：动态规划思想-贪心算法


```
    public int maxSubArray(int[] nums) {
        //当前最大
        int curMax = nums[0];
        //上一次最大
        int preMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curMax = Math.max((curMax + nums[i]), nums[i]);
            preMax = Math.max(preMax, curMax);
        }
        return preMax;
    }
```
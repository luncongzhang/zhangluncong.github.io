---
layout: post
title:  "209. 长度最小的子数组"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的子数组。如果不存在符合条件的子数组，返回 0。

示例: 

```
输入: s = 7, nums = [2,3,1,2,4,3]
输出: 2
解释: 子数组 [4,3] 是该条件下的长度最小的子数组。
```

进阶:

如果你已经完成了O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。

解:知识点，双指针滑动窗口

```
   public int minSubArrayLen(int s, int[] nums) {
        if(nums.length==0){
            return 0;
        }
        int rtn = 0;
        int target = nums[0];
        int left = 0;
        int right = 0;
        while (left < nums.length) {
            if (target >= s) {
                if (rtn == 0) {
                    rtn = right - left + 1;
                } else {
                    rtn = Math.min(rtn, right - left + 1);
                }
                left = left + 1;
                target = target - nums[left - 1];
            } else {
                right = right + 1;
                if (right < nums.length) {
                    target = target + nums[right];
                } else {
                    break;
                }
            }
        }
        return rtn;
    }
```
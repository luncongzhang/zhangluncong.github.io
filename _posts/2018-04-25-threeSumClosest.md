---
layout: post
title:  "16. 最接近的三数之和"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}


给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

```
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```
<!--more-->

解：

```
public int threeSumClosest(int[] nums, int target) {
        int maxAbsSub = Integer.MAX_VALUE;
        int closeNum = 0;
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            int left = i + 1;
            int right = nums.length - 1;
            while (left < right) {
                int tmpNum = nums[left] + nums[right] + nums[i];
                int tmpSub = Math.abs(tmpNum - target);
                if (tmpSub < maxAbsSub) {
                    closeNum = tmpNum;
                    maxAbsSub = tmpSub;
                }
                if (tmpNum > target) {
                    right--;
                } else if (tmpNum < target) {
                    left++;
                } else {
                    return target;
                }
            }
        }
        return closeNum;
    }
  
```
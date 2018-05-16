---
layout: post
title:  "34. 搜索范围"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}


给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(log n) 级别。

如果数组中不存在目标值，返回 [-1, -1]。

示例 1:

```
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```

示例 2:

```
输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
```
解：

```
public int[] searchRange(int[] nums, int target) {
        int[] rtn = new int[2];
        rtn[0] = -1;
        rtn[1] = -1;
        if (nums.length == 0) {
            return rtn;
        }
        if (nums.length == 1) {
            if (nums[0] == target) {
                rtn[0] = 0;
                rtn[1] = 0;
                return rtn;
            } else {
                return rtn;
            }
        }
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] > target) {
                right = --mid;
            } else if (nums[mid] < target) {
                left = ++mid;
            } else {
                int innerLeft = mid;
                int innerRight = mid;
                while (innerLeft >= 0 && nums[innerLeft] == target) {
                    innerLeft--;
                }
                while (innerRight <= nums.length - 1 && nums[innerRight] == target) {
                    innerRight++;
                }
                rtn[0] = innerLeft + 1;
                rtn[1] = innerRight - 1;
                return rtn;
            }
        }
        return rtn;
    }
```
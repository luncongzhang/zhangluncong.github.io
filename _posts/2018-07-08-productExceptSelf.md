---
layout: post
title:  "238. 除自身以外数组的乘积"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。

示例:

```
输入: [1,2,3,4]
输出: [24,12,8,6]
说明: 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
```
进阶：
你可以在常数空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）

解：如果不考虑空间复杂度，题目很简单，一个数组存除nums[i]的左边所有数乘积，一个数组存除nums[i]的右边所有数乘。常数空间复杂度可参考以下，比较难想到

```
Given numbers [2, 3, 4, 5], regarding the third number 4, the product of array except 4 is 235 which consists of two parts: left 23 and right 5. The product is leftright. We can get lefts and rights:

Numbers: 2 3 4 5
Lefts: 2 2x3 2x3x4
Rights: 3x4x5 4x5 5
Let’s fill the empty with 1:

Numbers: 2 3 4 5
Lefts: 1 2 2x3 2x3x4
Rights: 3x4x5 4x5 5 1
We can calculate lefts and rights in 2 loops. The time complexity is O(n).
```

```
public int[] productExceptSelf(int[] nums) {
        int len = nums.length;
        int[] res = new int[len];
        int left = 1;
        for (int i = 0; i < len; i++) {

            if (i > 0) {
                left = left * nums[i - 1];
            }


            res[i] = left;

        }
        int right = 1;
        for (int i = len - 1; i >= 0; i--) {

            if (i < nums.length - 1) {
                right = right * nums[i + 1];
            }

            res[i] *= right;
        }
        return res;
    }
```
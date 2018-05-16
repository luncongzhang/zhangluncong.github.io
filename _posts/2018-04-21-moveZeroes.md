---
layout: post
title:  "283. 移动零"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}


给定一个数组 nums, 编写一个函数将所有 0 移动到它的末尾，同时保持非零元素的相对顺序。

例如， 定义 nums = [0, 1, 0, 3, 12]，调用函数之后， nums 应为 [1, 3, 12, 0, 0]。

注意事项:

1. 必须在原数组上操作，不要为一个新数组分配额外空间。

2. 尽量减少操作总数。

<!--more-->

解：

```
    public void moveZeroes(int[] nums) {
        int i = 0;
        for (int j = 0; j < nums.length; j++) {
            if (nums[j] != 0) {
                nums[i++] = nums[j];
            }
        }
        for (; i < nums.length; i++) {
            nums[i] = 0;
        }
    }
```
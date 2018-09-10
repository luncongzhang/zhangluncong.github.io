---
layout: post
title:  "215. 数组中的第K个最大元素"
categories: 算法
tags: leetcode 分治算法
---

* content
{:toc}

<!--more-->

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:

```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

示例 2:

```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

解：既然题目没有限制。。。那就。。。这样吧，ac解。题目提示是分治和堆，所以要效率高一点可以使用堆和快排来实现，快排就是一种分治思想。

```
class Solution {
    public int findKthLargest(int[] nums, int k) {
        Arrays.sort(nums);
        return nums[nums.length - k];
    }
}
```


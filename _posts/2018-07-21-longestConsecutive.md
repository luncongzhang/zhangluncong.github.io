---
layout: post
title:  "128. 最长连续序列"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个未排序的整数数组，找出最长连续序列的长度。

要求算法的时间复杂度为 O(n)。

示例:

```
输入: [100, 4, 200, 1, 3, 2]
输出: 4
解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
```

解：只限制时间复杂度，没有限制空间复杂度，使用哈希,并且只更新最左边界和最右边界,因为只有边界才有可能与新插入的元素组成连续序列。

```
public int longestConsecutive(int[] nums) {
        int res = 0;
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(nums[i])) {
                continue;
            } else {
                int leftCount = map.get(nums[i] - 1) == null ? 0 : map.get(nums[i] - 1);
                int rightCount = map.get(nums[i] + 1) == null ? 0 : map.get(nums[i] + 1);
                int sum = leftCount + rightCount + 1;
                map.put(nums[i], sum);
                map.put(nums[i] - leftCount, sum);
                map.put(nums[i] + rightCount, sum);
                res = Math.max(res, sum);
            }
        }
        return res;
    }
```
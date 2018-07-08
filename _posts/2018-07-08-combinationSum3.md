---
layout: post
title:  "216. 组合总和 III"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

说明：

所有数字都是正整数。
解集不能包含重复的组合。 
示例 1:

```
输入: k = 3, n = 7
输出: [[1,2,4]]
```

示例 2:

```
输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]]
```

解：很简单，标准回溯法

```
 public List<List<Integer>> combinationSum3(int k, int n) {
        int nums[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> tmp = new ArrayList<>();
        dfs(result, tmp, nums, 0, k, n);
        return result;
    }

    private void dfs(List<List<Integer>> result, List<Integer> tmp, int[] nums, int start, int k, int n) {
        if (tmp.size() == k && summ(tmp) == n) {
            result.add(new ArrayList<Integer>(tmp));
        }
        for (int i = start; i < nums.length; i++) {
            tmp.add(nums[i]);
            dfs(result, tmp, nums, i + 1, k, n);
            tmp.remove(tmp.size() - 1);
        }
    }

    private int summ(List<Integer> tmp) {
        if (tmp == null || tmp.size() == 0) {
            return 0;
        }
        int sum = 0;
        for (Integer i : tmp) {
            sum = sum + i;
        }
        return sum;
    }
```
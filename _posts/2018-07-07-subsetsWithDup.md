---
layout: post
title:  "90. 子集 II"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

```
输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```

解：先对数组排序，然后结果使用set去重

```
  public List<List<Integer>> subsetsWithDup(int[] nums) {
        Set<List<Integer>> result = new HashSet<>();
        List<Integer> tmp = new ArrayList<>();
        Arrays.sort(nums);
        dfs(result, tmp, nums, 0);
        return new ArrayList<>(result);
    }

    private void dfs(Set<List<Integer>> result, List<Integer> tmp, int[] nums, int start) {
        result.add(new ArrayList<Integer>(tmp));
        for (int i = start; i < nums.length; i++) {
            tmp.add(nums[i]);
            dfs(result, tmp, nums, i + 1);
            tmp.remove(tmp.size() - 1);
        }
    }
```

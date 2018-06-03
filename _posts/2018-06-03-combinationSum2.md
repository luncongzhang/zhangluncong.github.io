---
layout: post
title:  "40. 组合总和 II"
categories: 算法
tags: 数组
---

* content
{:toc}


给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

<!--more-->

说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 
示例 1:

```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```

示例 2:

```
输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]
```

解：跟上题差不多，dfs时从下一个数开始最后的结果注意去重

```
 public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> results = new ArrayList<>();
        if (candidates == null || candidates.length == 0) {
            return results;
        }

        dfs2(candidates, 0, new ArrayList<Integer>(), target, 0, results);

        //去重复
        HashSet h = new HashSet(results);
        results.clear();
        results.addAll(h);
        return results;
    }

    /**
     * 深度优先搜索
     *
     * @param nums        数组
     * @param startIndex  开始索引
     * @param combination 和的组合list
     * @param target      目标值
     * @param sum         和
     * @param results     结果
     */
    private void dfs2(int[] nums,
                      int startIndex,
                      List<Integer> combination,
                      int target,
                      int sum,
                      List<List<Integer>> results) {
        if (sum == target) {
            results.add(new ArrayList<Integer>(combination));
            return;
        }

        for (int i = startIndex; i < nums.length; i++) {
            if (target < nums[i] + sum) {
                break;
            } else {
                combination.add(nums[i]);
                dfs2(nums, i + 1, combination, target, sum + nums[i], results);
                combination.remove(combination.size() - 1);
            }
        }
    }
```









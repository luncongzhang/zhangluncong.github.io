---
layout: post
title:  "39. 组合总和"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}


给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

<!--more-->

说明：

所有数字（包括 target）都是正整数。
解集不能包含重复的组合。
 
示例 1:

```
输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
```
示例 2:

```
输入: candidates = [2,3,5], target = 8,
所求解集为:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

解：回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。核心代码就几行。


```
public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> results = new ArrayList<>();
        if (candidates == null || candidates.length == 0) {
            return results;
        }

        int[] nums = removeDuplicates2(candidates);

        dfs(nums, 0, new ArrayList<Integer>(), target, 0, results);

        return results;
    }

    /**
     * 排序去重复
     *
     * @param candidates
     * @return
     */
    private int[] removeDuplicates2(int[] candidates) {
        Arrays.sort(candidates);

        int index = 0;
        for (int i = 0; i < candidates.length; i++) {
            if (candidates[i] != candidates[index]) {
                candidates[++index] = candidates[i];
            }
        }

        int[] nums = new int[index + 1];
        for (int i = 0; i < index + 1; i++) {
            nums[i] = candidates[i];
        }

        return nums;
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
    private void dfs(int[] nums,
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
            }
            combination.add(nums[i]);
            dfs(nums, i, combination, target, sum + nums[i], results);
            combination.remove(combination.size() - 1);
        }
    }
```









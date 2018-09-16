---
layout: post
title:  "129. 求根到叶子节点数字之和"
categories: 算法
tags: leetcode 树 深度优先搜索
---

* content
{:toc}

<!--more-->

给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

例如，从根到叶子节点路径 1->2->3 代表数字 123。

计算从根到叶子节点生成的所有数字之和。

说明: 叶子节点是指没有子节点的节点。

示例 1:

```
输入: [1,2,3]
    1
   / \
  2   3
输出: 25
解释:
从根到叶子节点路径 1->2 代表数字 12.
从根到叶子节点路径 1->3 代表数字 13.
因此，数字总和 = 12 + 13 = 25.
```

示例 2:

```
输入: [4,9,0,5,1]
    4
   / \
  9   0
 / \
5   1
输出: 1026
解释:
从根到叶子节点路径 4->9->5 代表数字 495.
从根到叶子节点路径 4->9->1 代表数字 491.
从根到叶子节点路径 4->0 代表数字 40.
因此，数字总和 = 495 + 491 + 40 = 1026.
```

解：纯手打，直接dfs。

```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public int sumNumbers(TreeNode root) {
        if (root == null) {
            return 0;
        }
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> list = new ArrayList<>();
        dfs(root, res, list);
        int sum = 0;
        for (List<Integer> l : res) {
            StringBuilder sb = new StringBuilder();
            for (Integer i : l) {
                sb.append(String.valueOf(i));
            }
            sum += Integer.valueOf(sb.toString());
        }
        return sum;
    }

    private void dfs(TreeNode root, List<List<Integer>> res, List<Integer> list) {
        if (root == null) {
            return;
        }
        list.add(root.val);
        if (root.left == null && root.right == null) {
            res.add(new ArrayList<>(list));
        }
        dfs(root.left, res, list);
        dfs(root.right, res, list);
        list.remove(list.size() - 1);
    }
}
```
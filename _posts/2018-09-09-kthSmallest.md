---
layout: post
title:  "230. 二叉搜索树中第K小的元素"
categories: 算法
tags: leetcode 二分查找
---

* content
{:toc}

<!--more-->

给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。

说明：
你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。

示例 1:

```
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 1
```

示例 2:

```
输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 3
```

进阶：
如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化 kthSmallest 函数？

解：什么是二叉搜索树BST：二叉查找树（Binary Search Tree），（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树。二叉搜索树按照中序遍历的顺序打印出来正好就是排序好的顺序。所以，按照中序遍历顺序找到第k个结点就是结果。

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
    public int kthSmallest(TreeNode root, int k) {
        //思路：二叉搜索树按照中序遍历的顺序打印出来正好就是排序好的顺序。
        //所以，按照中序遍历顺序找到第k个结点就是结果。
        Stack<TreeNode> stack = new Stack<>();
        helper(root, stack, k);
        return stack.pop().val;
    }

    private void helper(TreeNode root, Stack<TreeNode> stack, int k) {
        if (root == null) {
            return;
        }
        helper(root.left, stack, k);
        if (stack.size() == k) {
            return;
        }
        stack.push(root);
        helper(root.right, stack, k);
    }
}
```

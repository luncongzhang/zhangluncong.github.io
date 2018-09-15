---
layout: post
title:  "145. 二叉树的后序遍历"
categories: 算法
tags: leetcode 栈 树 
---

* content
{:toc}

<!--more-->

给定一个二叉树，返回它的 后序 遍历。

示例:

```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [3,2,1]
```

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

解：送分题咯。

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
import javafx.util.Pair;
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<Pair<TreeNode, Boolean>> stack = new Stack<>();
        stack.push(new Pair<>(root, false));
        while (!stack.isEmpty()) {
            TreeNode node = stack.peek().getKey();
            boolean visited = stack.peek().getValue();
            stack.pop();
            if (node == null) {
                continue;
            }
            if (visited) {
                res.add(node.val);
            } else {
                stack.push(new Pair<>(node, true));
                stack.push(new Pair<>(node.right, false));
                stack.push(new Pair<>(node.left, false));
            }
        }
        return res;
    }
}
```


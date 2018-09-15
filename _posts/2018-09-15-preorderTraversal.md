---
layout: post
title:  "173. 二叉搜索树迭代器"
categories: 算法
tags: leetcode 栈 树 设计
---

* content
{:toc}

<!--more-->

实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。

调用 next() 将返回二叉搜索树中的下一个最小的数。

注意: next() 和hasNext() 操作的时间复杂度是O(1)，并使用 O(h) 内存，其中 h 是树的高度。

解：类似于中序遍历的变种，先把最左边的节点全部加入栈，

```
/**
 * Definition for binary tree
 * public class TreeNode {
 * int val;
 * TreeNode left;
 * TreeNode right;
 * TreeNode(int x) { val = x; }
 * }
 */

public class BSTIterator {
    Stack<TreeNode> st = new Stack<TreeNode>();


    public BSTIterator(TreeNode root) {
        while (root != null) {
            st.push(root);
            root = root.left;
        }
    }

    /**
     * @return whether we have a next smallest number
     */
    public boolean hasNext() {
        if (!st.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return the next smallest number
     */
    public int next() {
        TreeNode curr = st.pop();
        int val = curr.val;
        if (curr.right != null) {
            curr = curr.right;
            st.push(curr);
            // Push the left child of curr.right into stack
            while (curr.left != null) {
                st.push(curr.left);
                curr = curr.left;
            }
        }
        return val;
    }
}

/**
 * Your BSTIterator will be called like this:
 * BSTIterator i = new BSTIterator(root);
 * while (i.hasNext()) v[f()] = i.next();
 */
```


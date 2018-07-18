---
layout: post
title:  "84. 柱状图中最大的矩形"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

![](https://ws4.sinaimg.cn/large/006tNc79gy1fted3anesrj305805o0it.jpg)

以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。


![](https://ws1.sinaimg.cn/large/006tNc79gy1fted3nu4oqj305805ogld.jpg)

图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。

 

示例:

```
输入: [2,1,5,6,2,3]
输出: 10
```

解：也很抽象，直接看注释吧，千言万语不如debug一次。

```
 public int largestRectangleArea(int[] heights) {
        if (heights == null || heights.length == 0) {
            return 0;
        }
        int res = 0;
        //单调递增保存索引的栈
        Stack<Integer> stack = new Stack<Integer>();
        //遍历数组
        for (int i = 0; i < heights.length; i++) {
            //栈不为空并且遍历到的元素值小于栈中保存的索引对应元素值，需要出栈计算面积
            while (!stack.isEmpty() && heights[i] <= heights[stack.peek()]) {
                //出栈保存索引
                int cur = stack.pop();
                //计算出栈索引左边的索引，栈空赋值为-1
                int left = stack.isEmpty() ? -1 : stack.peek();
                //第一个出栈索引右边的索引减去出栈索引左边的索引再-1计算出长度*出栈索引对应元素值计算面积，取最大
                res = Math.max(res, (i - left - 1) * heights[cur]);
            }
            //单调递增的话，直接入栈
            stack.push(i);
        }
        //同上
        while (!stack.isEmpty()) {
            int cur = stack.pop();
            int left = stack.isEmpty() ? -1 : stack.peek();
            res = Math.max(res, (heights.length - left - 1) * heights[cur]);
        }
        return res;
    }
```
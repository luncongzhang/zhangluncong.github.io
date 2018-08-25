---
layout: post
title:  "223. 矩形面积"
categories: 算法
tags: leetcode 数学
---

* content
{:toc}

<!--more-->

在二维平面上计算出两个由直线构成的矩形重叠后形成的总面积。

每个矩形由其左下顶点和右上顶点坐标表示，如图所示。

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fum17cuuqjj30f208gt8j.jpg)

示例:

```
输入: -3, 0, 3, 4, 0, -1, 9, 2 输出: 45

说明: 假设矩形面积不会超出 int 的范围。
```

解：

```
class Solution {
    public int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) {

        int areaOfSqrA = (C - A) * (D - B);
        int areaOfSqrB = (G - E) * (H - F);

        int left = Math.max(A, E);
        int right = Math.min(G, C);
        int bottom = Math.max(F, B);
        int top = Math.min(D, H);

        int overlap = 0;
        if (right > left && top > bottom)
            overlap = (right - left) * (top - bottom);

        return areaOfSqrA + areaOfSqrB - overlap;
    }
}
```


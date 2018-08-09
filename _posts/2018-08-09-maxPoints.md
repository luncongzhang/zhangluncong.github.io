---
layout: post
title:  "149. 直线上最多的点数"
categories: 算法
tags: leetcode 哈希表
---

* content
{:toc}

<!--more-->

给定一个二维平面，平面上有 n 个点，求最多有多少个点在同一条直线上。

示例 1:

```
输入: [[1,1],[2,2],[3,3]]
输出: 3
解释:
^
|
|        o
|     o
|  o  
+------------->
0  1  2  3  4
```

示例 2:

```
输入: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
输出: 4
解释:
^
|
|  o
|     o        o
|        o
|  o        o
+------------------->
0  1  2  3  4  5  6
```

解：未AC，题目不难，两层for循环求斜率，对于一个固定点和另一点求得的斜率相同说明在一条直线，用例会出现重复的点，这个非常麻烦。

```
 class Point {
    int x;
    int y;

    Point() {
        x = 0;
        y = 0;
    }

    Point(int a, int b) {
        x = a;
        y = b;
    }

    @Override
    public int hashCode() {
        return 10;
    }

    @Override
    public boolean equals(Object obj) {
        Point p = (Point) obj;
        return this.x == p.x && this.y == p.y;
    }
}

class Solution {
  public int maxPoints(Point[] points) {
        if (points.length == 0) {
            return 0;
        }
        Set<Point> set = new HashSet<>(Arrays.asList(points));
        if (set.size() == 1) {
            return points.length;
        }
        int max = 0;
        for (int i = 0; i < points.length; i++) {
            Map<Double, Integer> map = new HashMap<>();
            int yCount = 0;
            int cf = 0;
            for (int j = i + 1; j < points.length; j++) {
                if (points[i].x != points[j].x) {//不重合不垂直
                    double k = getK(points[i], points[j]);
                    if (map.containsKey(k)) {
                        map.put(k, map.get(k) + 1);
                    } else {
                        map.put(k, 1);
                    }
                } else if (points[i].y == points[j].y) {//重合
                    cf++;
                } else {//垂直
                    yCount++;
                }
            }
            for (Double d : map.keySet()) {
                max = Math.max(max, map.get(d) + cf);
            }
            max = Math.max(max, yCount + cf);
        }
        return max + 1;
    }

    private double getK(Point a, Point b) {
        return (b.y - a.y) / (b.x - a.x);
    }
}
```

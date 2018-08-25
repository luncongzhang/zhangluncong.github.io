---
layout: post
title:  "279. 完全平方数"
categories: 算法
tags: leetcode 数学
---

* content
{:toc}

<!--more-->

给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。

示例 1:

```
输入: n = 12
输出: 3 
解释: 12 = 4 + 4 + 4.
```

示例 2:

```
输入: n = 13
输出: 2
解释: 13 = 4 + 9.
```

解：知识点：最短路径-广度优先bfs,需要使用队列。队列的这种写法也是很有趣Queue<Integer> queue = new LinkedList<>();

对于这个问题建模： 整个问题转化为一个图论问题,从n到0，每个数字表示一个节点,如果有两个数字x到y相差一个完全平方数，则连接一条边，我们得到了一个无权图，原问题转化成，求这个无权图中从n到0的最短路径

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fum5db1h02j30ic0bcdgt.jpg)

也可以使用数学定理解题，可以减少时间复杂度。

* 四平方定理： 任何一个正整数都可以表示成不超过四个整数的平方之和。
* 满足四数平方和定理的数n（这里要满足由四个数构成，小于四个不行），
必定满足 n=4a(8b+7)

或者使用动态规划。

下面我们来用bfs解题，以n=13为例，请看下图13开始，第一遍：距离1*1可以到12节点，距离2*2可以到9节点，距离3*3可以到4节点，距离4*4超过13了肯定到不了0节点；第二遍将跨过j*j完全平方数能到达的点加入已清空的队列，再广度遍历，遍历到9节点时，发现有距离是完全平方数3*3可以到达0节点。至此结束，总共2步。

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fum5t4oc0jj30u0140gny.jpg)


```
class Solution {
    public int numSquares(int n) {
        //Queue<Integer> queue = new PriorityQueue<>();
        //知识点链表赋值给队列接口，也可以如上使用优先队列
        //对这个有疑问可参考：https://stackoverflow.com/questions/21727873/queueinteger-q-new-linkedlistinteger
        Queue<Integer> queue = new LinkedList<>();
        Set<Integer> set = new HashSet<>();
        int step = 0;
        queue.offer(n);
        while (!queue.isEmpty()) {
            int size = queue.size();
            step++;
            for (int i = 0; i < size; i++) {
                int curr = queue.poll();
                if (!set.add(curr)) {
                    continue;
                }
                for (int j = 1; j <= Math.sqrt(curr); j++) {
                    int next = curr - j * j;
                    if (next == 0) {
                        return step;
                    }
                    queue.offer(next);
                }
            }
        }
        return 0;
    }
}
```


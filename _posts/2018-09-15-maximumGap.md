---
layout: post
title:  "164. 最大间距"
categories: 算法
tags: leetcode 排序
---

* content
{:toc}

<!--more-->

给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。

如果数组元素个数小于 2，则返回 0。

示例 1:

```
输入: [3,6,9,1]
输出: 3
解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
```

示例 2:

```
输入: [10]
输出: 0
解释: 数组元素个数小于 2，因此返回 0。
```

说明:

* 你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
* 请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。

解：线性时间排序，有计数排序、桶排序、基数排序。

* 计数排序

```
计数排序(Count Sort)是一个非基于比较的排序算法，该算法于1954年由 Harold H. Seward 提出。它的优势在于在对一定范围内的整数排序时，它的复杂度为Ο(n+k)（其中k是整数的范围），快于任何比较排序算法。

计数排序的思想类似于哈希表中的直接定址法，在给定的一组序列中，先找出该序列中的最大值和最小值，从而确定需要开辟多大的辅助空间，每一个数在对应的辅助空间中都有唯一的下标。

找出序列中最大值和最小值，开辟Max-Min+1的辅助空间
最小的数对应下标为0的位置，遇到一个数就给对应下标处的值+1,。
遍历一遍辅助空间，就可以得到有序的一组序列
```

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fvaii95j9hj30lb05ka9z.jpg)

* 基数排序

```
第一步
以LSD为例，假设原来有一串数值如下所示：
73, 22, 93, 43, 55, 14, 28, 65, 39, 81
首先根据个位数的数值，在走访数值时将它们分配至编号0到9的桶子中：
0
1 81
2 22
3 73 93 43
4 14
5 55 65
6
7
8 28
9 39
第二步
接下来将这些桶子中的数值重新串接起来，成为以下的数列：
81, 22, 73, 93, 43, 14, 55, 65, 28, 39
接着再进行一次分配，这次是根据十位数来分配：
0
1 14
2 22 28
3 39
4 43
5 55
6 65
7 73
8 81
9 93
第三步
接下来将这些桶子中的数值重新串接起来，成为以下的数列：
14, 22, 28, 39, 43, 55, 65, 73, 81, 93
这时候整个数列已经排序完毕；如果排序的对象有三位数以上，则持续进行以上的动作直至最高位数为止。
LSD的基数排序适用于位数小的数列，如果位数多的话，使用MSD的效率会比较好。MSD的方式与LSD相反，是由高位数为基底开始进行分配，但在分配之后并不马上合并回一个数组中，而是在每个“桶子”中建立“子桶”，将每个桶子中的数值按照下一数位的值分配到“子桶”中。在进行完最低位数的分配后再合并回单一的数组中。

分配的时间复杂度为O（n）

收集的的时间复杂度为O（radix）

分配和收集共需要distance趟，

所以基数排序的时间复杂度为O(d(n+r))

d=排序对象位数
n=排序对象个数
r=基数，0~9
```

* 桶排序

桶排序，时间复杂度O(N+C)，N=排序对象个数，C=桶的个数。这题中相邻的两个数有两种情况：1）落在同一个桶里 2）小的那个是前一个桶的最大值大的那个是后一个痛的最小值。因为本题中我们桶大小和桶数量都+1了，所以会是2）种情况。

```
class Solution {
    public int maximumGap(int[] nums) {
        if (nums == null || nums.length < 2) {
            return 0;
        }
        //桶排序，空间换时间的典型，时间复杂度O(N)
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;
        int n = nums.length;
        for (int num : nums) {
            max = Math.max(max, num);
            min = Math.min(min, num);
        }
        if (max == min) {
            return 0;
        }
        //每个桶大小
        int bucketSize = (max - min) / n + 1;
        //桶数量
        int bucketNum = (max - min) / bucketSize + 1;
        //每个桶只保存最大值和最小值
        int[] bucketMin = new int[bucketNum];
        int[] bucketMax = new int[bucketNum];
        HashSet<Integer> set = new HashSet<Integer>();
        for (int num : nums) {
            int index = (num - min) / bucketSize;
            if (!set.contains(index)) {
                bucketMin[index] = num;
                bucketMax[index] = num;
                set.add(index);
                continue;
            }
            if (bucketMin[index] > num) {
                bucketMin[index] = num;
            }
            if (bucketMax[index] < num) {
                bucketMax[index] = num;
            }
        }
        //一定会有数落在0bucket里，因为index = (num - min) / bucketSize，当num = min时就落在0桶里，所以第一个非空的桶一定为0
        int pre = 0;
        int res = 0;
        //寻找下一个非空的桶，空的桶就跳过
        for (int i = 1; i < bucketNum; i++) {
            if (!set.contains(i)) {
                continue;
            }
            res = Math.max(res, bucketMin[i] - bucketMax[pre]);
            pre = i;
        }

        return res;
    }
}
```

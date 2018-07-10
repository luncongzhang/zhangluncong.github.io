---
layout: post
title:  "4. 两个排序数组的中位数"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定两个大小为 m 和 n 的有序数组 nums1 和 nums2 。

请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log (m+n)) 。

示例 1:

```
nums1 = [1, 3]
nums2 = [2]

中位数是 2.0
```

示例 2:

```
nums1 = [1, 2]
nums2 = [3, 4]

中位数是 (2 + 3)/2 = 2.5
```

解：设nums1为A数组，nums2为B数组。
1.nums1数组和nums2数组可以组合成一个一个虚拟总数组，使用一个counter指针指向,nums1使用一个idx1指向，nums2使用一个idx2指向。
2.总数组大小为偶数的话，total为总数组大小：total/2和total/2+1对应的数组值相加除以2就可以得到中位数；为奇数的话：total/2+1对应的数组值除以2可以得到
3.接下来就是遍历两个真实存在数组，组成虚拟总数组，找到虚拟总数组对应下标计算出中位数

时间复杂度：O(log(m+n))，因在一般情况下对于两个数组基本确定在遍历到一半的情况下都能找到结果，故在m+n两数组总长度与计算耗时上存在2的倍数关系，故为O(log(m+n))。


```
public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        //counter总数组指针，idx1为A数组指针，idx2为B数组指针
        int idx1 = 0;
        int idx2 = 0;
        int idx1Max = nums1.length;
        int idx2Max = nums2.length;
        int total = idx1Max + idx2Max;
        //保存总数组中位数的序号从1开始
        int[] middles = (total % 2) == 0 ? (new int[]{total / 2, total / 2 + 1}) : (new int[]{total / 2 + 1});
        //总数组的序号1开始，总数组指针
        int counter = 1;
        //保存临时数
        int num = 0;
        //保存两位数用来/2计算中位数
        int median = 0;
        //数组A或数组B都没有遍历完则循环
        while (idx1 < idx1Max || idx2 < idx2Max) {
            //数组A和数组B都没遍历完
            if (idx1 < idx1Max && idx2 < idx2Max) {
                if (nums1[idx1] > nums2[idx2]) {
                    num = nums2[idx2];
                    idx2++;
                } else {
                    num = nums1[idx1];
                    idx1++;
                }
            } else if (idx1 >= idx1Max && idx2 < idx2Max) {//数组A遍历完了，B没有
                num = nums2[idx2];
                idx2++;
            } else if (idx1 < idx1Max && idx2 >= idx2Max) {//数组B遍历完了，A没有
                num = nums1[idx1];
                idx1++;
            }
            //总数组为奇数，中位数为1位的时候，总数组指针相等
            if (middles.length == 1 && counter == middles[0]) {
                return (double) num;
            } else if (middles.length == 2) {//总数组为偶数，中位数为2位的和/2
                if (counter == middles[0]) {
                    median += num;
                } else if (counter == middles[1]) {
                    median += num;
                    return (double) median / 2;
                }
            }
            counter++;
        }
        return 0.0;
    }
```
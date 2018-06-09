---
layout: post
title:  "75. 分类颜色"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:
不能使用代码库中的排序函数来解决这道题。

示例:

```
输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
```

进阶：

* 一个直观的解决方案是使用计数排序的两趟扫描算法。
* 首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
* 你能想出一个仅使用常数空间的一趟扫描算法吗？

解：利用本题只有0，1，2三种元素，很容易可以想到可以利用快排的变种：三way快排和双轴快排，利用red,white,blue三个指针将数组分为四部分，red左边的都是0，red到white中间都是1，white到blue中间都是未扫描排序的，blue右边的都是2，用white来扫描数组。理解了三way快排和双轴快排原理就很容易了，而且还比三way快排和双轴快排少了递归的步骤。
可参考：[Arrays.sort实现原理-双轴快排](https://zhangluncong.com/2018/04/28/arrayssort/)

```
 public void sortColors(int[] nums) {
        int red = 0;
        //white进行扫描
        int white = 0;
        int blue = nums.length - 1;
        while (white <= blue) {
            if (nums[white] == 0) {
                swap(nums, red, white);
                red++;
                white++;
            } else if (nums[white] == 1) {
                white++;
            } else if (nums[white] == 2) {
                swap(nums, white, blue);
                blue--;
            }
        }
    }

    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
```


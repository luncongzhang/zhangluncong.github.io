---
layout: post
title:  "136. 只出现一次的数字"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

```
输入: [2,2,1]
输出: 1
```

示例 2:

```
输入: [4,1,2,1,2]
输出: 4
```

解：

线性时间复杂度一般指，O(n)。

位运算入门：参与运算的两个值，如果两个相应位相同，则结果为0，否则为1。即：0^0=0， 1^0=1， 0^1=1， 1^1=0

异或的特性：


1.恒定律：A ^ 0 = A

2.归零率：A ^ A = 0

3.交换律：A ^ B = B ^ A

4.结合律：(A ^ B) ^ C = A ^ (B ^ C)

异或能做的事：

异或可以快速比较两个值是否相等 a ^ b == 0，效率非常高，比 a - b == 0 高很多。

异或还能在不定义临时变量的情况下，交换两个值

```
a = a ^ b
b = a ^ b // a ^ b ^ b = a ^ 0 = a
a = a ^ b // a ^ b ^ a = b ^ 0 = b
```

栗子，进行交换：

```
public void swapByYH(int[] nums, int i, int j) {
        nums[i] = nums[i] ^ nums[j];
        nums[j] = nums[i] ^ nums[j];
        nums[i] = nums[i] ^ nums[j];
    }
```

假设所有的数组为：abcbcda，进行异或操作

```
a ^ b ^ c ^ b ^ c ^ d ^ a
= a ^ a ^ b ^ b ^ c ^ c ^ d
= 0 ^ 0 ^ 0 ^ d
= d
```




```
public int singleNumber(int[] nums) {
        if (nums.length == 0) {
            return -1;
        }
        if (nums.length == 0) {
            return nums[0];
        }
        int result = 0;
        for (int i = 0; i < nums.length; i++) {
            result = result ^ nums[i];
        }
        return result;
    }
```

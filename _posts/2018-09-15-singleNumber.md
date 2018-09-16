---
layout: post
title:  "137. 只出现一次的数字 II"
categories: 算法
tags: leetcode 位运算
---

* content
{:toc}

<!--more-->

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

```
输入: [2,2,3,2]
输出: 3
```

示例 2:

```
输入: [0,1,0,1,0,1,99]
输出: 99
```

解1：设置一个32位数组来保存1的位数，有点不符合题意的线性时间复杂度和不使用额外空间，比较容易理解。

```
class Solution {
    public int singleNumber(int[] nums) {
        int[] bts = new int[32];
        for (int num : nums) {
            for (int i = 0; i < 32; i++) {
                bts[i] += ((num >> i) & 1);
            }
        }
        int ans = 0;
        for (int i = 0; i < 32; i++) {
            ans |= (bts[i] % 3 << i);
        }
        return ans;
    }
}
```

解2：状态机,使用了数字逻辑里面的知识，可惜忘光了。。。没看懂，后续再来研究一下。

[参考1](https://sumygg.com/2017/04/27/single-number-ii-solved-using-circult-design-and-digital-logic/)

[参考2](https://blog.csdn.net/Koala_Tree/article/details/80228525)

```
class Solution {
    public int singleNumber(int[] nums) {
        int ones = 0, twos = 0;
        for (int i = 0; i < nums.length; i++) {
            ones = (ones ^ nums[i]) & ~twos;
            twos = (twos ^ nums[i]) & ~ones;
        }
        return ones;
    }
}
```

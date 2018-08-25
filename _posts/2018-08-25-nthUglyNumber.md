---
layout: post
title:  "264. 丑数 II"
categories: 算法
tags: leetcode 数学
---

* content
{:toc}

<!--more-->

编写一个程序，找出第 n 个丑数。

丑数就是只包含质因数 2, 3, 5 的正整数。

示例:

```
输入: n = 10
输出: 12
解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
```

说明:  

* 1 是丑数。
* n 不超过1690。

解：

```
class Solution {
    public int nthUglyNumber(int n) {
        int[] nums = new int[n];
        int index2 = 0;
        int index3 = 0;
        int index5 = 0;
        nums[0] = 1;
        for (int i = 1; i < nums.length; i++) {
            nums[i] = Math.min(nums[index2] * 2, Math.min(nums[index3] * 3, nums[index5] * 5));
            if (nums[i] == nums[index2] * 2) {
                index2++;
            }
            if (nums[i] == nums[index3] * 3) {
                index3++;
            }
            if (nums[i] == nums[index5] * 5) {
                index5++;
            }
        }
        return nums[n - 1];
    }
}
```


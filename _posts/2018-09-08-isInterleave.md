---
layout: post
title:  "97. 交错字符串"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定三个字符串 s1, s2, s3, 验证 s3 是否是由 s1 和 s2 交错组成的。

示例 1:

```
输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
输出: true
```

示例 2:

```
输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
输出: false
```

解：动态规划，组成矩阵。看图，和前面几题都差不多。

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fv1xdgr7ohj30u014077l.jpg)

```
class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        s1 = " " + s1;
        s2 = " " + s2;
        s3 = "  " + s3;
        int len1 = s1.length();
        int len2 = s2.length();
        int len3 = s3.length();

        if ((len1 + len2) != len3) {
            return false;
        }
        //dp[i][j]表示s1的0~i和s2的0~j能不能和s3的0~((i+1)+(j+1)-1)组成交错字符
        boolean[][] dp = new boolean[len1][len2];

        //状态初始化
        dp[0][0] = true;
        for (int v = 1; v < len1; v++) {
            dp[v][0] = dp[v - 1][0] && s1.charAt(v) == s3.charAt((v + 1) + (0 + 1) - 1);
        }

        for (int v = 1; v < len2; v++) {
            dp[0][v] = dp[0][v - 1] && s2.charAt(v) == s3.charAt((0 + 1) + (v + 1) - 1);
        }
		 //状态转移
        for (int i = 1; i < len1; i++) {
            for (int j = 1; j < len2; j++) {
                dp[i][j] = (dp[i - 1][j] && s1.charAt(i) == s3.charAt((i + 1) + (j + 1) - 1)) || (dp[i][j - 1] && s2.charAt(j) == s3.charAt((i + 1) + (j + 1) - 1));
            }
        }
        return dp[len1 - 1][len2 - 1];
    }
}
```


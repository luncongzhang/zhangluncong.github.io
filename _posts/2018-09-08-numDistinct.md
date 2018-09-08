---
layout: post
title:  "115. 不同的子序列"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定一个字符串 S 和一个字符串 T，计算在 S 的子序列中 T 出现的个数。

一个字符串的一个子序列是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）

示例 1:

```
输入: S = "rabbbit", T = "rabbit"
输出: 3
解释:

如下图所示, 有 3 种可以从 S 中得到 "rabbit" 的方案。
(上箭头符号 ^ 表示选取的字母)

rabbbit
^^^^ ^^
rabbbit
^^ ^^^^
rabbbit
^^^ ^^^

```

示例 2:

```
输入: S = "babgbag", T = "bag"
输出: 5
解释:

如下图所示, 有 5 种可以从 S 中得到 "bag" 的方案。 
(上箭头符号 ^ 表示选取的字母)

babgbag
^^ ^
babgbag
^^    ^
babgbag
^    ^^
babgbag
  ^  ^^
babgbag
    ^^^
```

解：依然是动态规划，递推公式比较难推导。

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fv1zyw6akgj30u0140q6z.jpg)

```
class Solution {
    public int numDistinct(String s, String t) {
        s = " " + s;
        t = " " + t;
        int len1 = s.length();
        int len2 = t.length();
        if (len1 < len2) {
            return 0;
        }
        //状态定义dp[i][j]表示s的0~i包含t的0~j个数
        int[][] dp = new int[len1][len2];
        //状态初始化
        dp[0][0] = 1;

        for (int v = 1; v < len1; v++) {
            dp[v][0] = 1;
        }
        for (int v = 1; v < len2; v++) {
            dp[0][v] = 0;
        }

        //状态转移
        for (int i = 1; i < len1; i++) {
            for (int j = 1; j < len2; j++) {
                if (s.charAt(i) == t.charAt(j)) {
                    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        return dp[len1 - 1][len2 - 1];
    }
}
```


---
layout: post
title:  "72. 编辑距离"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符
示例 1:

```
输入: word1 = "horse", word2 = "ros"
输出: 3
解释: 
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
```

示例 2:

```
输入: word1 = "intention", word2 = "execution"
输出: 5
解释: 
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
```

解：这题跟44题有异曲同工之妙，都是使两个字符串组成一个矩阵，进行动态规划。

[44. 通配符匹配](https://zhangluncong.com/2018/09/02/isMatch2/)

动态规划三部曲（以word1="horse",word2="ros"为例）：

```
为了更好处理我们在word1和word2前面均加入一个空字符
word1 = " " + word1;//此时word1=" horse"
word2 = " " + word2;//此时word2=" ros"
```
        
* 状态定义

  dp[i][j]表示word1的0~i字符串转成word2的0~j字符串需要的步数

* 状态初始化

  1.dp[0][0]因为表示的是" "转“ ”需要的步数，明显是相等的所以dp[0][0]=0;

  2.dp[i][0]例如dp[1][0]表示word1的0~1也就是" h"字符串和word2的0~0也就是" "空字符串怎么转换，只需一步去掉h即可；同理dp[2][0]为2...

  3.dp[0][j]同上。


* 状态转移

  遍历矩阵求值：
  当word1.charAt(i) == word2.charAt(j)两个字符相等时，显然有
  
  ```
  这两个字符相同删除掉一样的结果
  dp[i][j]=dp[i-1][j-1]
  ```
  
  当word1.charAt(i) != word2.charAt(j)两个字符相等时，有三种情况
  
  ```
  将word1的0~i个字符转为word2的0~（j-1）个字符，最后插入word2[j]字符
  dp[i][j]=dp[i][j-1]+1
  ```
  
  ```
  将word1的0~(i-1)个字符转为word2的0~j个字符，最后删除word1[i]字符
  dp[i][j]=dp[i-1][j]+1
  ```
  
  ```
  将word1的0~（i-1）个字符转为word2的0~（j-1）个字符，
  最后word1[i]字符替换成word2[j]字符
  dp[i][j]=dp[i-1][j-1]+1
  ```
  

![](https://ws1.sinaimg.cn/large/0069RVTdgy1fv078izj0nj30u0140jto.jpg)

```
class Solution {
    public int minDistance(String word1, String word2) {
        //为了更好处理我们在word1和word2前面均加入一个空字符
        word1 = " " + word1;
        word2 = " " + word2;

        int m = word1.length();
        int n = word2.length();

        //定义状态：dp[i][j]表示word1的0~i字符串转成word2的0~j字符串需要的步数
        int[][] dp = new int[m][n];

        //状态初始化
        //dp[0][0]比较特殊都为word1何word2表示的都是空字符相等，无需转换，所以为0
        dp[0][0] = 0;
        //初始化矩阵的列，如dp[1][0]表示word1的0~1也就是" h"字符串和word2的0~0也就是" "空字符串怎么转换
        //只需一步去掉h即可，所以为1；同理dp[2][0]为2;
        for (int v = 1; v < m; v++) {
            dp[v][0] = v;
        }
        for (int v = 1; v < n; v++) {
            dp[0][v] = v;
        }

        //转移状态方程
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (word1.charAt(i) == word2.charAt(j)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j - 1] + 1, Math.min(dp[i][j - 1] + 1, dp[i - 1][j] + 1));
                }
            }
        }
        return dp[m - 1][n - 1];
    }
}
```
---
layout: post
title:  "87. 扰乱字符串"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定一个字符串 s1，我们可以把它递归地分割成两个非空子字符串，从而将其表示为二叉树。

下图是字符串 s1 = "great" 的一种可能的表示形式。

```
    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t
```

在扰乱这个字符串的过程中，我们可以挑选任何一个非叶节点，然后交换它的两个子节点。

例如，如果我们挑选非叶节点 "gr" ，交换它的两个子节点，将会产生扰乱字符串 "rgeat" 。

```
    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
```

我们将 "rgeat” 称作 "great" 的一个扰乱字符串。

同样地，如果我们继续将其节点 "eat" 和 "at" 进行交换，将会产生另一个新的扰乱字符串 "rgtae" 。

```
    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
```

我们将 "rgtae” 称作 "great" 的一个扰乱字符串。

给出两个长度相等的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。

示例 1:

```
输入: s1 = "great", s2 = "rgeat"
输出: true
```

示例 2:

```
输入: s1 = "abcde", s2 = "caebd"
输出: false
```

解1：递归来解比较简单，s1和s2是scramble的话，那么必然存在一个长度l将s1和s2同时划分为长度为l和length-l的子字符串，假设两个子字符串分别为s11,s12,s21,s22，这是要么s11和s21是scramble且s12和s22是scramble或者s11和s22是scramble且s12和s21是scramble的。

```
class Solution {
    public boolean isScramble(String s1, String s2) {
        if (s1 == null || s2 == null || s1.length() != s2.length()) {
            return false;
        }
        if (s1.equals(s2)) {
            return true;
        }
        char a1[], a2[];
        a1 = s1.toCharArray();
        a2 = s2.toCharArray();
        Arrays.sort(a1);
        Arrays.sort(a2);
        if (!(new String(a1).equals(new String(a2)))) {
            return false;
        }
        for (int i = 1; i < s1.length(); i++) {
            if (isScramble(s1.substring(0, i), s2.substring(0, i)) && isScramble(s1.substring(i), s2.substring(i))) {
                return true;
            }
            if (isScramble(s1.substring(0, i), s2.substring(s2.length() - i)) && isScramble(s1.substring(i), s2.substring(0, s2.length() - i))) {
                return true;
            }
        }
        return false;
    }
}
```

解2：动态规划比较难理解。这是Google面试题，LeetCode最难的一道三维动态规划题，可以：[参考一下](https://blog.csdn.net/linhuanmars/article/details/24506703)

```
class Solution {
    public boolean isScramble(String s1, String s2) {
        if (s1.length() != s2.length()) {
            return false;
        }
        int len = s1.length();
        boolean[][][] F = new boolean[len][len][len + 1];
        for (int k = 1; k <= len; ++k) {
            for (int i = 0; i + k <= len; ++i) {
                for (int j = 0; j + k <= len; ++j) {
                    if (k == 1) {//为了减少时间复杂度，把动态规划初始化放到这里面
                        F[i][j][k] = s1.charAt(i) == s2.charAt(j);
                    } else {
                        for (int q = 1; q < k && !F[i][j][k]; ++q) {
                            //跟上面递归一个道理，要么s11和s21是scramble且s12和s22是scramble或者s11和s22是scramble且s12和s21是scramble的。
                            F[i][j][k] = (F[i][j][q] && F[i + q][j + q][k - q]) || (F[i][j + k - q][q] && F[i + q][j][k - q]);
                        }
                    }
                }
            }
        }
        return F[0][0][len];
    }
}
```


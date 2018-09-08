---
layout: post
title:  "214. 最短回文串"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定一个字符串 s，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。

示例 1:

```
输入: "aacecaaa"
输出: "aaacecaaa"
```

示例 2:

```
输入: "abcd"
输出: "dcbabcd"
```

解：这题可以用马拉车算法，之前的博文已经研究过了，我们这里来用kmp。先来了解一下kmp算法，其实也就是String.indexOf方法的实现，实际上jdk中的String.indexOf并不是使用kmp，可能是朴素算法也就是暴力拆解在大部分情况时间复杂度足够或者jdk开发人员尚未进行优化，先来了解一下前缀"指除了最后一个字符以外，一个字符串的全部头部组合；"后缀"指除了第一个字符以外，一个字符串的全部尾部组合。

[参考1](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)

[参考2](https://blog.csdn.net/v_july_v/article/details/7041827)

[参考3](https://www.zhihu.com/question/21923021)

[参考4](https://segmentfault.com/a/1190000003797346)

纯手打kmp算法。

```
/**
     * @param s BBC ABCDAB ABCDABCDABDE
     * @param p ABCDABD
     * @return 未找到返回-1，找到返回索引位置
     */
    public int myKmp(String s, String p) {
        //分别指向s和p的指针
        int i = 0;
        int j = 0;
        //模式串next数组,myNext1和myNext2都一样，
        int[] next = myNext1(p);
        //int[] next = myNext2(p);
        while (i < s.length() && j < p.length()) {
            if (j == -1 || s.charAt(i) == p.charAt(j)) {//如果单字符匹配成功
                i++;
                j++;
            } else {//未匹配成功
                j = next[j];
            }
        }
        if (j == p.length()) {
            return i - j;
        } else {
            return -1;
        }
    }

    private int[] myNext1(String p) {
        //自身跟自身进行匹配
        int[] next = new int[p.length()];
        //第一个字符的前缀和后缀都为空集，共有元素的长度为0；
        next[0] = -1;
        int i = 0;
        int j = -1;
        //所以从1开始，自身跟自身匹配，看有多少个最大共同前缀
        while (i < p.length() - 1) {
            if (j == -1 || p.charAt(i) == p.charAt(j)) {
                i++;
                j++;
                next[i] = j;
            } else {
                j = next[j];
            }
        }
        return next;
    }

    private int[] myNext2(String p) {
        //自身跟自身进行匹配
        int[] next = new int[p.length()];
        next[0] = -1;
        int[] tmp = new int[p.length()];
        //第一个字符的前缀和后缀都为空集，共有元素的长度为0；
        tmp[0] = 0;
        int i = 1;
        int j = 0;
        //所以从1开始，自身跟自身匹配，看有多少个最大共同前缀
        while (i < p.length()) {
            if (p.charAt(i) == p.charAt(j)) {
                tmp[i] = j + 1;
                i++;
                j++;
            } else {
                // 如果前缀末尾指针还没退回0点，则找上一个子前缀的末尾位置
                if (j != 0) {
                    j = tmp[j - 1];
                    // 如果退回0点，则最长相同前后缀的长度就是0了
                } else {
                    tmp[i] = 0;
                    i++;
                }
            }
        }
        //错位右移
        for (int v = 1; v < p.length(); v++) {
            next[v] = tmp[v - 1];
        }
        return next;
    }
```

KMP解题

```
class Solution {
   public String shortestPalindrome(String s) {
        // 将字符串反转后拼接到后面
        String rev = (new StringBuilder(s)).reverse().toString();
        String combine = s + "#" + rev;
        // 计算LPS表值
        int[] lps = new int[combine.length()];
        //lps = getTable(combine);
        lps = getTable(combine);
        int remove = lps[lps.length - 1];
        // 去掉后缀后，将反转字符串拼回前面
        String prepend = rev.substring(0, rev.length() - remove);
        return prepend + s;
    }

    private int[] getTable(String p) {
        //自身跟自身进行匹配
        int[] tmp = new int[p.length()];
        //第一个字符的前缀和后缀都为空集，共有元素的长度为0；
        tmp[0] = 0;
        int i = 1;
        int j = 0;
        //所以从1开始，自身跟自身匹配，看有多少个最大共同前缀
        while (i < p.length()) {
            if (p.charAt(i) == p.charAt(j)) {
                tmp[i] = j + 1;
                i++;
                j++;
            } else {
                // 如果前缀末尾指针还没退回0点，则找上一个子前缀的末尾位置
                if (j != 0) {
                    j = tmp[j - 1];
                    // 如果退回0点，则最长相同前后缀的长度就是0了
                } else {
                    tmp[i] = 0;
                    i++;
                }
            }
        }
        return tmp;
    }
}
```


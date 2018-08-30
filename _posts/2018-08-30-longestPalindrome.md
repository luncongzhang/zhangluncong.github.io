---
layout: post
title:  "5. 最长回文子串"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为1000。

示例 1：

```
输入: "babad"
输出: "bab"
注意: "aba"也是一个有效答案。
```

示例 2：

```
输入: "cbbd"
输出: "bb"
```

解：这题很经典，我们使用Manacher算法（中文名：马拉车算法）来解决。

1.回文分为奇回文（aa）和偶回文（aba）,在代码中解决起来比较麻烦所以我们可以进行填充```#```使得所有回文变成奇数，如```#a#a#```和```#a#b#a#```,为了代码处理方便不越界，我们再在前面填充```$```最终变成```$#a#a#```和```$#a#b#a#```。

2.这里我们设s_new[i]为我们的填充后新字符串，如下图；再引入一个辅助数组p[i]表示对应i索引字符为中心的最长回文子串半径。

* 如p[1]表示s_new[1]也就是```#```为中心对应最长回文子串半径为1，就是最长回文子串为```#```,半径为1即```#```；
* p[2]表示s_new[2]也就是```a```为中心对应最长回文子串半径为2，就是最长回文子串为```#a#```,半径为```#a```；

* ...

* p[5]表示s_new[5]也就是```#```为中心对应最长回文子串半径为5，就是最长回文子串```#a#b#b#a#```,半径为```#a#b#```；
* ...

![](https://ws4.sinaimg.cn/large/0069RVTdgy1fus7066rxyj31ae074mx6.jpg)

3.设当前已知的最长回文子串中心为id,mx为最长右边界，i是我们要求的值p[i]的中心,我们可以求得i关于id的对称点j=2*id-i,如下图。当mx>i的时候有p[i]=Math.min(p[2 * id - i], mx - i),具体解释看代码里面注释；但mx<=i的时候我们直接设p[i]=1,然后不断探索最长回文子串的左右边界，然后更新mx和id的值。

![](https://ws1.sinaimg.cn/large/0069RVTdgy1fus708du6uj30ge05aq2q.jpg)

```
class Solution {
    public String longestPalindrome(String s) {
        if (s.length() <= 1) {
            return s;
        }
        // 预处理字符串，避免奇偶问题
        String str = preProcess(s);
        int id = 0;
        //mx 代表以 id 为中心的最长回文的右边界
        int mx = 0;
        //用来保存最长回文子串的中心
        int maxId = 0;
        //用来保存最长回文子串的半径
        int maxSpan = 0;
        //辅助数组p[i]代表对应字符串str中下标为i为中心的最长子串的半径
        int[] p = new int[str.length()];
        //跳过$符从#开始
        for (int i = 1; i < str.length(); i++) {
            //可能很多人不明白2 * id - i表示的是以id为中心最长子串i对应的另一个对标点，也就是
            //上图的j;如上图因为i，j是关于id的对称点，并且还是当前以id为中心最长子串的子集，所以
            //p[2 * id - i]的值也就是p[i]的值，但是因为mx > i，所以mx-i也是一个以i为中心的子串半径
            //i子串半径不能大于mx-i所以用一个min函数比较。
            p[i] = mx > i ? Math.min(p[2 * id - i], mx - i) : 1;
            //探索当前p[i]半径的边界
            while ((i + p[i]) < str.length() && str.charAt(i + p[i]) == str.charAt(i - p[i])) {
                p[i]++;
            }
            //如果右边界值大于mx，那要更新mx的值和id值
            if (i + p[i] > mx) {
                mx = p[i] + i;
                id = i;
            }
            //保存最新的最长子串半径和中点
            if (p[i] > maxSpan) {
                maxSpan = p[i];
                maxId = i;
            }
        }
        //去除占位符所以要除以2
        return s.substring((maxId - maxSpan) / 2, (maxSpan + maxId) / 2 - 1);
    }

    private String preProcess(String s) {
        // 如ABC,变为$#A#B#C#
        StringBuilder sb = new StringBuilder();
        sb.append("$");
        for (int i = 0; i < s.length(); i++) {
            sb.append("#");
            sb.append(s.charAt(i));
        }
        sb.append("#");
        return sb.toString();
    }
}
```


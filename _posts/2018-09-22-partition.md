---
layout: post
title:  "131. 分割回文串"
categories: 算法
tags: leetcode 回溯算法
---

* content
{:toc}

<!--more-->

给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

返回 s 所有可能的分割方案。

示例:

```
输入: "aab"
输出:
[
  ["aa","b"],
  ["a","a","b"]
]
```
解1：dfs。

```
class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        List<String> list = new ArrayList<>();
        helper(res, list, s, 0);
        return res;
    }

    private void helper(List<List<String>> result, List<String> list, String s, int start) {
        if (start == s.length()) {
            result.add(new ArrayList<>(list));
            return;
        }
        for (int i = start; i < s.length(); i++) {
            String sub = s.substring(start, i + 1);
            if (isPalin(sub)) {
                list.add(sub);
                helper(result, list, s, i + 1);
                list.remove(list.size() - 1);
            }
        }
    }

    private boolean isPalin(String s) {
        int start = 0;
        int end = s.length() - 1;
        while (start < end) {
            if (s.charAt(start) != s.charAt(end)) {
                return false;
            }
            start++;
            end--;
        }
        return true;
    }

}
```
解2：有难度，dp+dfs结合。

```
class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        List<Integer> list = new ArrayList<>();
        if (s == null || s.length() == 0) {
            return res;
        }
        int n = s.length();
        //dp[i][j]:表示i到j的子串是否是回文串。
        //状态转移方程：
        //isPalindrome[i][j] = isPalindrome[i+1][j-1] && s.charAt(i) == s.charAt(j)
        //自然如果一个串是回文串，那么首尾必须要相等，并且中间也是子串。
        //初始化，显然当i==j的时候都是回文串
        //当串只有两个字符且相等的时候也是回文串。
        boolean[][] dp = new boolean[n][n];
        //长度为1的子串
        for (int i = 0; i < n; i++) {
            dp[i][i] = true;
        }
        //长度为2的子串
        for (int i = 0; i < n - 1; i++) {
            dp[i][i + 1] = (s.charAt(i) == s.charAt(i + 1));
        }
        //长度3以上的子串,画一个矩阵图可以看出为什么i不能从0开始而要从n-3倒序
        for (int i = n - 3; i >= 0; i--) {
            for (int j = i + 2; j < n; j++) {
                dp[i][j] = dp[i + 1][j - 1] && s.charAt(i) == s.charAt(j);
            }
        }
        helper(dp, s, 0, res, list);
        return res;
    }

    private void helper(boolean[][] dp, String s, int startIndex, List<List<String>> res, List<Integer> list) {
        if (startIndex == s.length()) {
            addResult(s, res, list);
            return;
        }
        for (int i = startIndex; i < s.length(); i++) {
            if (!dp[startIndex][i]) {
                continue;
            }
            list.add(i);
            helper(dp, s, i + 1, res, list);
            list.remove(list.size() - 1);
        }
    }

    private void addResult(String s, List<List<String>> res, List<Integer> list) {
        List<String> result = new ArrayList<>();
        int startIndex = 0;
        for (int i = 0; i < list.size(); i++) {
            result.add(s.substring(startIndex, list.get(i) + 1));
            startIndex = list.get(i) + 1;
        }
        res.add(result);
    }
}
```
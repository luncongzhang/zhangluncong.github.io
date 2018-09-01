---
layout: post
title:  "93. 复原IP地址"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

示例:

```
输入: "25525511135"
输出: ["255.255.11.135", "255.255.111.35"]
```

解：

```
class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> list = new ArrayList<>();
        if (s.length() == 0) {
            return list;
        }
        restoreIpAddresses(s, 0, "", list, 0);
        return list;
    }

    private void restoreIpAddresses(String s, int start, String curr, List<String> list, int count) {
        if (count > 4) {
            return;
        }
        if (s.length() == start && count == 4) {
            list.add(curr.substring(0, curr.length() - 1));
            return;
        }

        // 1-digit from start
        if (start + 1 <= s.length()) {
            restoreIpAddresses(s, start + 1, curr + s.substring(start, start + 1) + ".", list, count + 1);
        }
        // 2-digits from start
        if (start + 2 <= s.length() && !s.substring(start, start + 2).startsWith("0")) {
            restoreIpAddresses(s, start + 2, curr + s.substring(start, start + 2) + ".", list, count + 1);
        }
        // 3-digits from start
        if (start + 3 <= s.length() && !s.substring(start, start + 3).startsWith("0") && Integer.parseInt(s.substring(start, start + 3)) <= 255) {
            restoreIpAddresses(s, start + 3, curr + s.substring(start, start + 3) + ".", list, count + 1);
        }
    }
}
```
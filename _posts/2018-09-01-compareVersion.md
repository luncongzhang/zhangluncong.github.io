---
layout: post
title:  "165. 比较版本号"
categories: 算法
tags: leetcode 字符串
---

* content
{:toc}

<!--more-->

比较两个版本号 version1 和 version2。
如果 version1 > version2 返回 1，如果 version1 < version2 返回 -1， 除此之外返回 0。

你可以假设版本字符串非空，并且只包含数字和 . 字符。

 . 字符不代表小数点，而是用于分隔数字序列。

例如，2.5 不是“两个半”，也不是“差一半到三”，而是第二版中的第五个小版本。

示例 1:

```
输入: version1 = "0.1", version2 = "1.1"
输出: -1
```

示例 2:

```
输入: version1 = "1.0.1", version2 = "1"
输出: 1
```

示例 3:

```
输入: version1 = "7.5.2.4", version2 = "7.5.3"
输出: -1
```

解：辣鸡题目。

```
class Solution {
    public int compareVersion(String version1, String version2) {
        if (!version1.contains(".") && !version2.contains(".")) {
            if (Integer.valueOf(version1) > Integer.valueOf(version2)) {
                return 1;
            } else if (Integer.valueOf(version1) < Integer.valueOf(version2)) {
                return -1;
            } else {
                return 0;
            }
        }
        String[] arr1 = version1.split("\\.", -1);
        String[] arr2 = version2.split("\\.", -1);
        int i = 0;
        int rtn = Integer.MIN_VALUE;
        while (i < arr1.length && i < arr2.length) {
            int tmp1 = Integer.valueOf(arr1[i]);
            int tmp2 = Integer.valueOf(arr2[i]);
            if (tmp1 > tmp2) {
                rtn = 1;
                break;
            } else if (tmp1 < tmp2) {
                rtn = -1;
                break;
            }
            i++;
        }
        //相等说明前几位全相等
        if (rtn == Integer.MIN_VALUE) {
            if (arr1.length == arr2.length) {
                return 0;
            } else if (arr1.length > arr2.length) {
                for (; i < arr1.length; i++) {
                    if (Integer.valueOf(arr1[i]) > 0) {
                        return 1;
                    }
                }
                return 0;
            } else {
                for (; i < arr2.length; i++) {
                    if (Integer.valueOf(arr2[i]) > 0) {
                        return -1;
                    }
                }
                return 0;
            }
        } else {
            return rtn;
        }
    }
}
```

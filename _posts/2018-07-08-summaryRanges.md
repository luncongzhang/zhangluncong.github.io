---
layout: post
title:  "228. 汇总区间"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个无重复元素的有序整数数组，返回数组区间范围的汇总。

示例 1:

```
输入: [0,1,2,4,5,7]
输出: ["0->2","4->5","7"]
解释: 0,1,2 可组成一个连续的区间; 4,5 可组成一个连续的区间。
```

示例 2:

```
输入: [0,2,3,4,6,8,9]
输出: ["0","2->4","6","8->9"]
解释: 2,3,4 可组成一个连续的区间; 8,9 可组成一个连续的区间。
```

解：

```
 public List<String> summaryRanges(int[] nums) {
        List<String> result = new LinkedList<>();
        for (int i = 0; i < nums.length; i++) {
            if (i + 1 >= nums.length) {
                StringBuilder sb = new StringBuilder();
                sb.append(nums[i]);
                result.add(sb.toString());
                break;
            }
            if (nums[i + 1] - nums[i] == 1) {
                StringBuilder sb = new StringBuilder();
                sb.append(nums[i] + "->");
                while (i < nums.length - 1) {
                    i++;
                    if (i + 1 >= nums.length) {
                        sb.append(nums[i]);
                        break;
                    }
                    if (nums[i + 1] - nums[i] != 1) {
                        sb.append(nums[i]);
                        break;
                    }
                }
                result.add(sb.toString());
            } else {
                StringBuilder sb = new StringBuilder();
                sb.append(nums[i]);
                result.add(sb.toString());
            }
        }
        return result;
    }
```
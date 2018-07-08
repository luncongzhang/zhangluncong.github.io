---
layout: post
title:  "229. 求众数 II"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}

<!--more-->

给定一个大小为 n 的数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。

说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1)。

示例 1:

```
输入: [3,2,3]
输出: [3]
```

示例 2:

```
输入: [1,1,1,3,3,2,2,2]
输出: [1,2]
```

解1：AC解，空间复杂度不满足，看解2摩尔投票法

```
 public List<Integer> majorityElement(int[] nums) {
        Set<Integer> result = new HashSet<>();
        HashMap<Integer, Integer> map = new HashMap();
        for (int i = 0; i < nums.length; i++) {
            if (!map.containsKey(nums[i])) {
                map.put(nums[i], 1);
                if (1 > nums.length / 3) {
                    result.add(nums[i]);
                }
            } else {
                int count = map.get(nums[i]) + 1;
                map.put(nums[i], count);
                if (count > nums.length / 3) {
                    result.add(nums[i]);
                }
            }
        }
        return new ArrayList<>(result);
    }
```

解2：任意一个数组出现次数大于n/3的众数最多有两个。
主要思想是互相抵消k为（n/k）中的k，抵消k个数。
[摩尔投票法](https://www.zhihu.com/question/49973163)

```
public List<Integer> majorityElement(int[] nums) {
         int div = nums.length / 3;
        List<Integer> result = new ArrayList<>();
        //候选人有2个
        int hxr[] = new int[2];
        //候选人投票计数器2个
        int count[] = new int[2];
        for (int i = 0; i < nums.length; i++) {
            if (count[0] == 0) {
                hxr[0] = nums[i];
                count[0] = 1;
            } else if (hxr[0] == nums[i]) {
                count[0] = count[0] + 1;
            } else if (count[1] == 0) {
                hxr[1] = nums[i];
                count[1] = 1;
            } else if (hxr[1] == nums[i]) {
                count[1] = count[1] + 1;
            } else {
                count[0] = count[0] - 1;
                count[1] = count[1] - 1;
                //防止hxr0和hxr1是重复元素
                if (count[0] == 0 && count[1] > 0) {
                    hxr[0] = hxr[1];
                    count[0] = count[1];
                    hxr[1] = 0;
                    count[1] = 0;
                }
            }
        }
        //计算真实的数量
        count[0] = 0;
        count[1] = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == hxr[0]) {
                count[0] = count[0] + 1;
            } else if (nums[i] == hxr[1]) {
                count[1] = count[1] + 1;
            }
        }
        if (count[0] > div) {
            result.add(hxr[0]);
        }
        if (count[1] > div) {
            result.add(hxr[1]);
        }
        return result;
    }
```
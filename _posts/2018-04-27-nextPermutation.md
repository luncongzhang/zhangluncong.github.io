---
layout: post
title:  "31. 下一个排列"
categories: 算法
tags: leetcode 数组
---

* content
{:toc}


实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须原地修改，只允许使用额外常数空间。

以下是一些例子，输入位于左侧列，其相应输出位于右侧列。

```
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
```
<!--more-->

解：解这题首先要知道什么是全排列？

**全排列：从n个不同元素中任取m（m≤n）个元素，按照一定的顺序排列起来，叫做从n个不同元素中取出m个元素的一个排列。当m=n时所有的排列情况叫全排列。公式：全排列数f(n)=n!(定义0!=1)。**

这里以A{a,b,c}为例，来说明全排列的生成方法，对于这个集合，其包含3个元素，所有的排列情况有3!=6种，对于每一种排列，其第一个元素有3种选择a,b,c，对于第一个元素为a的排列，其第二个元素有2种选择b,c；第一个元素为b的排列，第二个元素也有2种选择a，c，……，依次类推，我们可以将集合的全排列与一棵多叉树对应。如下图所示

![](http://hi.csdn.net/attachment/201112/15/0_1323938241foiZ.gif)

屁话太多，例如使a=1,b=2,c=3，那么abc的全排列如下：

1, 2, 3

1, 3, 2

2, 1, 3

2, 3, 1

3, 1, 2

3, 2, 1

解题思路：
这里我们以1　　2　　7　　4　　3　　1  →  1　　3　　1　　2　　4　　7为例，为什么127431的下一个更大排列是131247呢？其实我们可以看做求这几个数字组合中下一个比127431大的整数是什么？！计算步骤
- 首先从数组尾nums.length-1往前遍历到0，找到一个nums[i+]>nums[i]的标志位i
- 再从数组尾nums.length-1往前遍历到i，找到一个nums[j]>nums[i]的标志位j
- 交换下标i和j的数字
- 反转数组i+1~nums.length-1

1　　**2**　　7　　4　　3　　1

1　　**2**　　7　　4　　**3**　　1

1　　**3**　　7　　4　　**2**　　1

1　　3　　**1　　2　　4　　7**

```
    public void nextPermutation(int[] nums) {
        for(int i=nums.length-2;i>=0;i--){
            if(nums[i+1]>nums[i]){
                for(int j=nums.length-1;j>i;j--){
                    if(nums[j]>nums[i]){
                        swap(nums,i,j);
                        reverse(nums,i+1,nums.length-1);
                        return;
                    }
                }
            }
        }
        reverse(nums,0,nums.length-1);
    }
    private void swap(int[] nums,int left,int right){
        int tmp=nums[left];
        nums[left]=nums[right];
        nums[right]=tmp;
    }
    private void reverse(int[] nums,int left,int right){
        while(left<right){
            int tmp=nums[left];
            nums[left]=nums[right];
            nums[right]=tmp;
            left++;
            right--;
        }
    }
```
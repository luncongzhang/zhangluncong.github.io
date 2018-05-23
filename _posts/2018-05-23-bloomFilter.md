---
layout: post
title:  "缓存穿透防范-布隆过滤器"
categories: java
tags:  布隆过滤器 缓存穿透 海量数据去重
---

* content
{:toc}


# 什么是缓存穿透


我们在项目中使用缓存通常都是先检查缓存中是否存在，如果存在直接返回缓存内容，如果不存在就直接查询数据库然后再缓存查询结果返回。这个时候如果我们查询的某一个数据在缓存中一直不存在，就会造成每一次请求都查询DB，这样缓存就失去了意义，在流量大时，可能DB就挂掉了。

<!--more-->


# 什么是布隆过滤器

布隆过滤器就是引入了k(k>1)个相互独立的哈希函数，保证在给定的空间、误判率下，完成元素判重的过程。下图中是k=3时的布隆过滤器。


![](https://ws4.sinaimg.cn/large/006tKfTcgy1frlm22iofej315k0fygmk.jpg)


x,y,z经由哈希函数映射将各自在Bitmap中的3个位置置为1，当w出现时，仅当3个标志位都为1时，才表示w在集合中。图中所示的情况，布隆过滤器将判定w不在集合中。


# 谷歌封装的过滤器代码


```
import com.google.common.hash.BloomFilter;
import com.google.common.hash.Funnels;

...
BloomFilter<String> filter = BloomFilter.create(Funnels.stringFunnel(Charset.forName("UTF-8")), Integer.MAX_VALUE);
...

```


# 自定义实现的过滤器代码


```

import java.util.BitSet;

/**
 * 布隆过滤器-防止缓存穿透问题
 * Created by zhangluncong on 2018/5/23.
 */
public class SimpleBloomFilter {
    //布隆过滤器能存放的最大数据,2的二进制00000010左移29位，左移一位相当于乘与2
    //private static final int DEFAULT_SIZE = 2 << 29;
    //布隆过滤器能存放的最大数据,大概20多亿位
    private static final int DEFAULT_SIZE = Integer.MAX_VALUE;

    //产生随机数的种子，可产生多个不同的随机数产生器,这里要选取质数，能很好的降低错误
    private static final int[] seeds = new int[]{3, 5, 7, 11, 13, 31, 37, 61};
    //Java中的按位存储的思想，其算法的具体实现
    private BitSet bits = new BitSet(DEFAULT_SIZE);
    //根据随机数的种子，创建多个哈希函数
    private SimpleHash[] func = new SimpleHash[seeds.length];

    /**
     * 设置布隆过滤器所对应k个哈希函数
     */
    public SimpleBloomFilter() {
        for (int i = 0; i < seeds.length; i++) {
            func[i] = new SimpleHash(DEFAULT_SIZE, seeds[i]);
        }
    }

    /**
     * 内部类SimpleHash函数
     */
    public static class SimpleHash {
        private int cap;
        private int seed;

        /**
         * 默认构造器，哈希表长默认为DEFAULT_SIZE大小，此哈希函数的种子为seed
         */
        public SimpleHash(int cap, int seed) {
            this.cap = cap;
            this.seed = seed;
        }

        public int hash(String value) {
            int result = 0;
            int len = value.length();

            for (int i = 0; i < len; i++) {
                //将此URL用哈希函数产生一个值（使用到了集合中的每一个元素）
                result = seed * result + value.charAt(i);
            }

            //产生单个信息指纹
            return (cap - 1) & result;
        }
    }

    /**
     * bloom filter 添加值
     *
     * @param value
     */
    public void add(String value) {
        for (SimpleHash f : func) {
            bits.set(f.hash(value), true);
        }
    }

    /**
     * 是否存在
     */
    public boolean contains(String value) {
        if (value == null) {
            return false;
        }

        boolean ret = true;
        //根据此URL得到在布隆过滤器中的对应位，并判断其标志位（k个不同的哈希函数产生k种不同的映射）
        for (SimpleHash f : func) {
            ret = ret && bits.get(f.hash(value));
        }
        return ret;
    }

    public static void main(String[] args) {
        String value = "haha";

        long start = System.currentTimeMillis();
        SimpleBloomFilter filter = new SimpleBloomFilter();
        for (int i = 0; i < 100000000; i++) {
            filter.add(value + i);
        }
        System.out.println(filter.contains(value + "4"));
        System.out.println(filter.contains(value + "ads"));
        long end = System.currentTimeMillis();
        System.out.println("sub=" + (end - start));
    }
}

```

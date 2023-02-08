# Tester

To test our server can work correctly and handle numerous requests in a short time, we leverage the power of [k6](https://k6.io/docs/), which is a load testing tool developed from Grafana Labs.

## 1. Installation

Before testing, please install k6 tool with following steps [installation guide](https://k6.io/docs/get-started/installation/).

## 2. Run Tester

You can run k6 tool using the sample scripts.
- config.js
- script.js

```bash
k6 run ./script.js
```

## 3. Use `tc` to simulate network interruption

```bash
tc qdisc add dev eth1 root handle 1: prio priomap 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
tc qdisc add dev eth1 parent 1:2 handle 20: netem delay 3000ms
tc filter add dev eth1 parent 1:0 protocol ip u32 match ip sport 7000 0xffff flowid 1:2
```
// 指定端口34001上，延时5ms
tc qdisc add dev eth0 root handle 1: prio
tc qdisc add dev eth0 parent 1:3 handle 30: netem delay 5ms
tc filter add dev eth0 protocol ip parent 1:0 u32 match ip sport 34001 0xffff flowid 1:3
(https://wanghenshui.github.io/2017/08/12/tc.html)

https://blog.csdn.net/weixin_29207439/article/details/116630845(same command)



## References
1. [k6 tutorials](https://k6.io/docs/using-k6/http-requests/)
2. [k6 executor](https://k6.io/docs/using-k6/scenarios/executors/)
3. [tc: traffic control](https://man7.org/linux/man-pages/man8/tc.8.html)

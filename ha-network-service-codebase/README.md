# ha-network-service-codebase
codebase for ha network service

## Configuration
change `INVENTORY_URL`, `STORAGE_URL` -> [link](https://github.com/YuShuanHsieh/ha-network-service-codebase/blob/main/Deploy/Makefile#L1-L2)

change `upstream server ip` -> [link](https://github.com/YuShuanHsieh/ha-network-service-codebase/blob/main/LoadBalance/nginx.conf#L14)

## deploy business
```
cd deploy
make business
```

## deploy inventory
```
cd deploy
make inventory
```

## deploy storage
```
cd deploy
make storage
```

## deploy proxy
```
cd deploy
make proxy
```

編譯指令
g++ -std=c++11 inventory.cpp -o inventory -lboost_system -lboost_filesystem -L../boost/stage/lib -pthread

發request
curl -X 'POST' 'http://localhost:8200/api/material' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{ "a": 18,"b": 2,"c": 6, "d": 28 }'

回傳
{"material":362,"signature":"NTQ="}
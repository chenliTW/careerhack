�sĶ���O
g++ -std=c++11 inventory.cpp -o inventory -lboost_system -lboost_filesystem -L../boost/stage/lib -pthread

�orequest
curl -X 'POST' 'http://localhost:8200/api/material' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{ "a": 18,"b": 2,"c": 6, "d": 28 }'

�^��
{"material":362,"signature":"NTQ="}
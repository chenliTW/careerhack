compile command
g++ -std=c++11 inventory.cpp -o inventory -lboost_system -lboost_filesystem -L../boost/stage/lib -pthread

client request
curl -X 'POST' 'http://localhost:8200/api/material' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{ "a": 18,"b": 2,"c": 6, "d": 28 }'

server response
{"material":362,"signature":"NTQ="}
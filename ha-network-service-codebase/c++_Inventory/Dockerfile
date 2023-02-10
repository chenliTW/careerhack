FROM jc21/dpkg-debian:latest
WORKDIR /app
COPY check-readiness.sh .
COPY crow-v1.0+5.deb .
RUN sudo apt install libboost-dev libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev libboost-iostreams-dev -y
RUN sudo dpkg -i crow-v1.0+5.deb
COPY inventory.cpp .
RUN g++ -std=c++11 inventory.cpp -o inventory -lboost_system -lboost_filesystem -L../boost/stage/lib -pthread
CMD ["./inventory"]

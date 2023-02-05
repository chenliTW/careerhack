INVENTORY_URL=10.0.0.8
STORAGE_URL=10.0.0.11

tools:
	apt update && apt install docker.io docker-compose make -y

business:
	INVENTORY_URL=${INVENTORY_URL} STORAGE_URL=${STORAGE_URL} docker-compose  -f docker-compose-single.yml up --build -d business

inventory:
	docker-compose -f docker-compose-single.yml up -d --build inventory

storage:
	INVENTORY_URL=${INVENTORY_URL} STORAGE_URL=${STORAGE_URL} docker-compose -f docker-compose-single.yml up -d --build storage

proxy:
	docker-compose -f docker-compose-single.yml up -d proxy		

down:
	docker-compose down

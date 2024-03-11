CONTAINER_ID := $(shell docker ps -q --filter ancestor=phoqer)
ALL_CONTAINERS := $(shell docker ps -a -q --filter ancestor=phoqer)

up: clean build run

build:
	docker build --build-arg NEXT_PUBLIC_BACK_URL=$(shell grep NEXT_PUBLIC_BACK_URL .env | cut -d '=' -f2) \
                 -t phoqer .

run:
	docker run -p 3000:3000 -d phoqer

clean:
ifneq ($(CONTAINER_ID),)
	@echo "Stopping container: $(CONTAINER_ID)"
	@docker stop $(CONTAINER_ID)
else
	@echo "No running container found."
endif
ifneq ($(ALL_CONTAINERS),)
	@echo "Removing container: $(ALL_CONTAINERS)"
	@docker rm $(ALL_CONTAINERS)
else
	@echo "No old container found."
endif

stop:
ifneq ($(CONTAINER_ID),)
	@echo "Stopping container: $(CONTAINER_ID)"
	@docker stop $(CONTAINER_ID)
else
	@echo "No running container found."
endif

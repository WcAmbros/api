# Сервис api

## Описание
Демонстрационный сервис на базе Nestjs, для работы с БД используется sequelize

Состоит из:

- service api
- postgres
- adminer

Документация доступна по адресу `http://localhost:4000/api/api-docs`, 

Админка к БД - `http://localhost:8080`, 

- `posgtres` - Хост 
- `api` - Имя пользователя
- `password` - Пароль
- `api` - БД 

Если нужен доступ из локальной машины, то в качестве хоста указывается `localhost`

Например:
```shell
 psql "host=localhost port=5432 user=api password=password dbname=api"
```
## Docker-compose

Для запуска требуется [Docker](https://docs.docker.com/engine/install/)

```shell
docker-compose up
```

Чтобы удалить сервис

```shell
docker-compose rm -sf
```


## Документация по NestJs
https://docs.nestjs.com

## Документация по sequelize
https://sequelize.org/v7/


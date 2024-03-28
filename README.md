## Description
Framework:- [Nest](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Swagger Documentation

Local
http://localhost:3000/

Dev Site
https://trade-app-j28y.onrender.com/
Currently hosted in free hosting so it might take time to load


## Data Model Design

#### Stock Collection ####

```
{
  "_id": "unique stock identifier",
  "name": "stock name"
}
```

#### Trade Collection ####

```
{
  "stock": {"$ref": "stock"},
  "date": "trade date",
  "price": "trade price",
  "type": "trade type",
  "quantity": "trade quantity"
}
```

#### Portfolio Collection ####

```
{
  "stock": {"$ref": "stock", "$id": "stock_id"},
  "quantity": "portfolio quantity",
  "avgPrice": "average price per stock",
  "avgTotal": "average total cost"
}
```

In this MongoDB schema:

1. The `Stock` collection stores documents representing individual stocks.
2. The `Trade` collection stores documents representing individual trades. Instead of directly referencing the Stock collection by its _id, we're using MongoDB's manual references to establish a relationship.
3. The `Portfolio` collection stores documents representing portfolio entries. Similarly, we're using manual references to link portfolio entries to stocks.

## License

Nest is [MIT licensed](LICENSE).

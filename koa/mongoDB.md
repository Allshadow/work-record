#### 对比 mysql

| SQL                 | Mongo              |
| ------------------- | ------------------ |
| 表（Table）         | 集合（collection） |
| 行（Row）           | 文档（Document）   |
| 列（Col）           | 字段（Field）      |
| 主键（Primary Key） | 对象ID（ObjectId） |

#### 终端命令行

```
mongo
```

#### 操作数据库

1）创建数据库

```
use demo
```

2）查看数据库

```
show dbs
```

3）删除数据库

```
db.dropDatabase()
```

#### 集合操作

1）创建集合

```
db.createCollection(name)
```

2）查看集合

```
show collections
```

3）删除集合

```
db.collection.drop()
```

#### 文档操作

1）创建文档

```
db.collection.insertOne({}) //插入一条数据
db.collection.insertMany([]) // 插入多条数据
```

2）查看文档

```
db.collection.find({})
```

3）删除文档

```
db.collection.deleteOne()  // 删除一条
db.collection.deleteMany() // 删除多条
```

4）更新文档

```
db.collection.update({},{},false,true)
```

#### 条件操作

1）大于

```
$gt
```

2）小于

```
$lt
```

3）大于等于

```
$gte
```

4）小于等于

```
$lte
```


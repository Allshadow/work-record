#### 安装

```
npm install -g json-server
```

#### 创建 db.json

```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

#### 监听数据

```
json-server --watch db.json
```


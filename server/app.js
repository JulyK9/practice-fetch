const express = require('express')
const app = express()

const cors = require('cors') // cors 정책 해제를 위해 npm i cors 후 import

app.use(cors()) // cors 정책 해제 

// body-parser 를 위해 추가한 express 기능
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// 데이터
let id = 2;
const todoList = [
    {
        id: 1,
        text: '할일1',
        done: false,
    },
];

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })

// '/api/todo' 로 get 요청을 하면 
app.get('/api/todo', (req, res) => {
    res.json(todoList);
})

// todo list 추가 (post)
// 프론트쪽에서 body에다가 데이터를 넣어서 보낼 것임
// express 에서 바디에서 데이터를 꺼내쓰려면 body-parser 필요
app.post('/api/todo', (req, res) => {
    const { text, done } = req.body;
    // console.log('req.body: ', req.body);  // body 데이터 확인용
    todoList.push({
        id: id++,
        text,
        done,
    })
    return res.send('success')
})

app.listen(4000, () => {
    console.log("server start!");
});
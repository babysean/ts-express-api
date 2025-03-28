import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// JSON 형태의 요청 본문(body)를 파싱하기 위한 미들웨어
app.use(express.json());

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// 임시 데이터 저장소 (메모리)
let todos: Todo[] = [
  { id: 1, title: "TypeScript 배우기", completed: false },
  { id: 2, title: "Express 사용해보기", completed: false },
];

// 기본 라우트: 서버가 정상 동작하는지 확인
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeSrcipt with Express!');
});

// GET: 모든 할 일 조회
app.get("/api/todos", (req: Request, res: Response) => {
  res.json(todos);
});

// POST: 새 할 일 추가
app.post("/api/todos", (req: Request, res: Response) => {
  const { title } = req.body;
  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT: 할 일 완료 처리
app.put("/api/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  const updatedTodo = todos.find(todo => todo.id === id);
  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// DELETE: 할 일 삭제
app.delete("/api/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const beforeLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);
  if (todos.length < beforeLength) {
    res.json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
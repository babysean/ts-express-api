import express, { Request, Response } from 'express';
import todosRouter from './routes/todos';

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

// 기본 라우트
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeSrcipt with Express!');
});

// /api/todos 경로에 todos 라우터 사용
app.use('/api/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
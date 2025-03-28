import { Router, Request, Response } from "express";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// 임시 데이터 저장소
let todos: Todo[] = [
  { id: 1, title: "TypeScript 배우기", completed: false },
  { id: 2, title: "Express 사용해보기", completed: false },
];

const router = Router();

// GET: 모든 할 일 조회
router.get("/", (req: Request, res: Response) => {
  res.json(todos);
});

// POST: 새 할 일 추가
router.post("/", (req: Request, res: Response) => {
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
router.put("/:id", (req: Request, res: Response) => {
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
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const beforeLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);
  if (todos.length < beforeLength) {
    res.json({ message: "Todo deleted" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

export default router;
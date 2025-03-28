import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// JSON 형태의 요청 본문(body)를 파싱하기 위한 미들웨어
app.use(express.json());

// 기본 라우트: 서버가 정상 동작하는지 확인
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeSrcipt with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
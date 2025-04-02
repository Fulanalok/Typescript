// 1- iniciando o projeto
//console.log("Express + TS");

// 2 - init express
import express, { NextFunction, Request, Response } from "express";

const app = express();

// 3 - Rota com POST
app.use(express.json());

// 11 - middleware para todas as rotas
function showPath(req: Request, res: Response, next: NextFunction) {
  console.log(req.path);
  next();
}

app.use(showPath);

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello Express!");
});

// 3 - Rota com POST
app.post("/api/product", (req: Request, res: Response) => {
  console.log(req.body);
  return res.send("Produto adicionado");
});

// 4 - rota para todos os verbos
app.all("/api/product/check", (req: Request, res: Response) => {
  // req.method = VERBO HTTP

  if (req.method === "POST") {
    return res.send("Inseriu algum registro");
  } else if (req.method === "GET") {
    return res.send("Leu algum registro");
  } else {
    return res.send("Não podemos fazer essa operação");
  }
});

// 5 - interfaces do express
app.get("/api/interfaces", (req: Request, res: Response) => {
  return res.send("Utilizando as interfaces");
});

// 6 - enviando json
app.get("/api/json", (req: Request, res: Response) => {
  return res.json({
    name: "PC",
    price: 3000.0,
    types: ["Gamer", "Casual"],
  });
});

// Middleware para capturar erros de JSON inválido
app.use((err: any, req: Request, res: Response, next: Function) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "JSON inválido na requisição" });
  }
  next();
});

//7 - router parameters
app.get("/api/product/:id", (req: Request, res: Response) => {
  console.log(req.params);

  const id = req.params.id;

  if (id === "1") {
    const product = {
      id: 1,
      name: "Mouse",
      price: 30,
    };

    return res.json(product);
  } else {
    return res.send("Produto nao encontrado");
  }
});

// 8 - rotas complexas
app.get("/api/product/:id/review/:reviewId", (req: Request, res: Response) => {
  console.log(req.params);

  const productId = req.params.id;
  const reviewId = req.params.reviewId;

  return res.send(`acessando a review ${reviewId} do produto ${productId}`);
});

// 9 - router handler
function getUser(req: Request, res: Response) {
  console.log(`Resgatando o usuario com id: ${req.params.id}`);

  return res.send("O usuario foi encontrado");
}

app.get("/api/user/:id", getUser);

// 10 - middleware
function checkUser(req: Request, res: Response, next: NextFunction) {
  if (req.params.id === "1") {
    console.log("pode seguir");
  } else {
    console.log("Acesso restrito");
  }
}
app.get("/api/user/:id/access", (req: Request, res: Response) => {
  return res.json({ msg: "Bem-vindo a area administrativa" });
});

// 12 - req e res com generics
app.get(
  "/api/user/:id/details/:name",
  (
    req: Request<{ id: string; name: string }>,
    res: Response<{ status: boolean }>
  ) => {
    console.log(`ID: ${req.params.id}`);
    console.log(`Name: ${req.params.name}`);

    return res.json({ status: true });
  }
);

// 13 - tratando erros
app.get("/api/error", (req: Request, res: Response) => {
  try {
    // logica
    throw new Error("Algo deu errado");
  } catch (e: any) {
    res.status(500).json({ msg: e.message });
  }
});

app.listen(3000, () => {
  console.log("Aplicação com TS + Express funcionando");
});

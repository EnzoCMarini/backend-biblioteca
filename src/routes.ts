import { Router } from "express";
import type { Request, Response } from "express";
import AlunoController from "./controller/AlunoController.js";
import EmprestimoController from "./controller/EmprestimoController.js";
import LivroController from "./controller/LivroController.js";

const router = Router();

router.get("/api/", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!"});
});

router.get("/api/aluno", AlunoController.todos);
router.post("/api/aluno", AlunoController.novo);
router.get("/api/aluno/:idAluno", AlunoController.aluno);

/*router.get("/api/livro", LivroController.todos);
router.post("/api/livro", LivroController.novo);
router.get("/api/livro/:idLivro", LivroController.livro);

router.get("/api/emprestimo", EmprestimoController.todos);
router.post("/api/emprestimo", EmprestimoController.novo);
router.get("/api/emprestimo/:idEmprestimo", EmprestimoController.emprestimo);
*/

export { router };
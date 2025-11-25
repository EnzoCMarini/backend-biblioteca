import Livro from "../model/Livro.js";
import type { Request, Response } from "express";

class LivroController extends Livro {
    
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaLivros: Array<Livro> | null = await Livro.listarLivros();

            return res.status(200).json(listaLivros);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de livros" });
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosLivro = req.body;

            const respostaModelo = await Livro.cadastrarLivro(dadosRecebidosLivro);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Livro cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar livro." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o livro" });
        }
    }
}

export default LivroController;
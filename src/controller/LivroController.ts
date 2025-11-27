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

    static async livro(req: Request, res: Response): Promise<Response> {
        try {
            const idLivro: number = parseInt(req.params.idLivro as string);

            if (isNaN(idLivro) || idLivro <= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }

            const respostaModelo = await Livro.listarLivro(idLivro);

            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum livro encontrado com o ID fornecido." });
            }

            return res.status(200).json(respostaModelo);
        } catch (error) {
            console.error(`Erro ao acesso o modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível recuperar o livro." });
        }
    }
}

export default LivroController;
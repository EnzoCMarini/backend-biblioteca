import Emprestimo from "../model/Emprestimo.js";
import type { Request, Response } from "express";

class EmprestimoController extends Emprestimo {

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaEmprestimos: Array<Emprestimo> | null = await Emprestimo.listarEmprestimos();

            return res.status(200).json(listaEmprestimos);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de emprestimos" });
        }
    }

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosEmprestimo = req.body;

            const respostaModelo = await Emprestimo.cadastrarEmprestimo(dadosRecebidosEmprestimo);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Emprestimo cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar emprestimo." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o emprestimo" });
        }
    }

    static async emprestimo(req: Request, res: Response): Promise<Response> {
        try {
            const idEmprestimo: number = parseInt(req.params.idEmprestimo as string);

            if (isNaN(idEmprestimo) || idEmprestimo <= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }

            const respostaModelo = await Emprestimo.listarEmprestimo(idEmprestimo);

            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum emprestimo encontrado com o ID fornecido." });
            }

            return res.status(200).json(respostaModelo);
        } catch (error) {
            console.error(`Erro ao acesso o modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível recuperar o emprestimo." });
        }
    }
}

export default EmprestimoController;
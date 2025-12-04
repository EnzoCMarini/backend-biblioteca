import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Emprestimo {

    private idEmprestimo: number = 0;
    private idAluno: number = 0;
    private idLivro: number = 0;
    private data_Emprestimo: Date;
    private data_Devolucao: Date;
    private status_Emprestimo: string;

    constructor(
        _idAluno: number,
        _idLivro: number,
        _data_Emprestimo: Date,
        _data_Devolucao: Date,
        _status_Emprestimo: string
    ) {
        this.idAluno = _idAluno;
        this.idLivro = _idLivro;
        this.data_Emprestimo = _data_Emprestimo;
        this.data_Devolucao = _data_Devolucao;
        this.status_Emprestimo = _status_Emprestimo;
    }

    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    public getIdAluno(): number {
        return this.idAluno;
    }

    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    public getIdLivro(): number {
        return this.idLivro;
    }

    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    public getData_Emprestimo(): Date {
        return this.data_Emprestimo;
    }

    public setData_Emprestimo(data_Emprestimo: Date): void {
        this.data_Emprestimo = data_Emprestimo;
    }

    public getData_Devolucao(): Date {
        return this.data_Devolucao;
    }

    public setData_Devolucao(data_Devolucao: Date): void {
        this.data_Devolucao = data_Devolucao;
    }

    public getStatus_Emprestimo(): string {
        return this.status_Emprestimo;
    }

    public setStatus_Emprestimo(status_Emprestimo: string): void {
        this.status_Emprestimo = status_Emprestimo;
    }

    static async listarEmprestimos(): Promise<Array<Emprestimo> | null> {
        try {
            let listaDeEmprestimos: Array<Emprestimo> = [];

            const querySelectEmprestimo = `SELECT * FROM Emprestimo;`;

            const respostaBD = await database.query(querySelectEmprestimo);

            respostaBD.rows.forEach((emprestimoBD: any) => {
                const novoEmprestimo: Emprestimo = new Emprestimo(
                    emprestimoBD.id_aluno,
                    emprestimoBD.id_livro,
                    emprestimoBD.data_emprestimo,
                    emprestimoBD.data_devolucao,
                    emprestimoBD.status_emprestimo
                );

                novoEmprestimo.setIdEmprestimo(emprestimoBD.id_emprestimo);

                listaDeEmprestimos.push(novoEmprestimo);
            });

            return listaDeEmprestimos;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return null;
        }
    }

    static async cadastrarEmprestimo(emprestimo: EmprestimoDTO): Promise<boolean> {
        try {
            const queryInsertEmprestimo = `INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
                                            VALUES
                                            ($1, $2, $3, $4, $5)
                                            RETURNING id_livro;`;

            const respostaBD = await database.query(queryInsertEmprestimo, [
                emprestimo.idAluno,
                emprestimo.idLivro,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
                emprestimo.statusEmprestimo
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(`Emprestimo cadastrado com sucesso. ID: ${respostaBD.rows[0].id_emprestimo}`);

                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return false;
        }
    }

    static async listarEmprestimo(idEmprestimo: number): Promise<Emprestimo | null> {
        try {
            const querySelectEmprestimo = `SELECT * FROM Emprestimo WHERE id_emprestimo=$1;`;

            const respostaBD = await database.query(querySelectEmprestimo, [idEmprestimo]);

            if (respostaBD.rowCount != 0) {
                const emprestimo: Emprestimo = new Emprestimo(
                    respostaBD.rows[0].id_aluno,
                    respostaBD.rows[0].id_livro,
                    respostaBD.rows[0].data_emprestimo,
                    respostaBD.rows[0].data_devolucao,
                    respostaBD.rows[0].status_emprestimo
                );
                emprestimo.setIdEmprestimo(respostaBD.rows[0].id_emprestimo);

                return emprestimo;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar cliente no banco de dados. ${error}`);
            return null;
        }
    }
}

export default Emprestimo;
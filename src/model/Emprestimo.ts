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
        _data_Emprestimo: Date,
        _data_Devolucao: Date,
        _status_Emprestimo: string
    ) {
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
}

export default Emprestimo;
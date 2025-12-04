import type { AlunoDTO } from "../interface/AlunoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Aluno {

    private idAluno: number = 0;
    private ra: string;
    private nome: string;
    private sobrenome: string;
    private data_nascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string;

    constructor(
        _ra: string,
        _nome: string,
        _sobrenome: string,
        _data_nascimento: Date,
        _endereco: string,
        _email: string,
        _celular: string
    ) {
        this.ra = _ra;
        this.nome = _nome;
        this.sobrenome = _sobrenome;
        this.data_nascimento = _data_nascimento;
        this.endereco = _endereco;
        this.email = _email;
        this.celular = _celular;
    }

    public getIdAluno(): number {
        return this.idAluno;
    }

    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    public getRa(): string {
        return this.ra;
    }

    public setRa(ra: string): void {
        this.ra = ra;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getSobrenome(): string {
        return this.sobrenome;
    }

    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    public getData_Nascimento(): Date {
        return this.data_nascimento;
    }

    public setData_Nascimento(data_nascimento: Date): void {
        this.data_nascimento = data_nascimento;
    }


    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getCelular(): string {
        return this.celular;
    }

    public setCelular(celular: string): void {
        this.celular = celular;
    }

    static async listarAlunos(): Promise<Array<Aluno> | null> {
        try {
            let listaDeAlunos: Array<Aluno> = [];

            const querySelectAlunos = `SELECT * FROM Aluno;`;

            const respostaBD = await database.query(querySelectAlunos);

            respostaBD.rows.forEach((alunoBD) => {
                const novoAluno: Aluno = new Aluno(
                    alunoBD.ra,
                    alunoBD.nome,
                    alunoBD.sobrenome,
                    alunoBD.data_nascimento,
                    alunoBD.endereco,
                    alunoBD.email,
                    alunoBD.celular
                );

                novoAluno.setIdAluno(alunoBD.id_aluno);

                listaDeAlunos.push(novoAluno);
            });

            return listaDeAlunos;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return null;
        }
    }

    static async cadastrarAluno(aluno: AlunoDTO): Promise<boolean> {
        try {
            const queryInsertAluno = `INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
                                    VALUES
                                    ($1, $2, $3, $4, $5, $6)
                                    RETURNING id_aluno;`;

            const respostaBD = await database.query(queryInsertAluno, [
                aluno.nome.toUpperCase(),
                aluno.sobrenome,
                aluno.dataNascimento,
                aluno.endereco,
                aluno.email,
                aluno.celular
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(`Aluno cadastrado com sucesso. ID: ${respostaBD.rows[0].id_aluno}`);

                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return false;
        }
    }

    static async listarAluno(idAluno: number): Promise<Aluno | null> {
        try {
            const querySelectAluno = `SELECT * FROM Aluno WHERE id_aluno=$1;`;

            const respostaBD = await database.query(querySelectAluno, [idAluno]);

            if (respostaBD.rowCount != 0) {
                const aluno: Aluno = new Aluno(
                    respostaBD.rows[0].ra,
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].sobrenome,
                    respostaBD.rows[0].data_nascimento,
                    respostaBD.rows[0].endereco,
                    respostaBD.rows[0].email,
                    respostaBD.rows[0].celular
                );
                aluno.setIdAluno(respostaBD.rows[0].id_aluno);

                return aluno;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar cliente no banco de dados. ${error}`);
            return null;
        }
    }
}

export default Aluno;
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Aluno {

    private idAluno: number = 0;
    private ra: string;
    private nome: string;
    private sobrenome: string;
    private data_Nascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string;

    constructor(
        _ra: string,
        _nome: string,
        _sobrenome: string,
        _data_Nascimento: Date,
        _endereco: string,
        _email: string,
        _celular: string
    ) {
        this.ra = _ra;
        this.nome = _nome;
        this.sobrenome = _sobrenome;
        this.data_Nascimento = _data_Nascimento;
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
        return this.data_Nascimento;
    }

    public setData_Nascimento(data_Nascimento: Date): void {
        this.data_Nascimento = data_Nascimento;
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

            const querySelectAluno = `SELECT * FROM Aluno;`;

            const respostaBD = await database.query(querySelectAluno);

            respostaBD.rows.forEach((alunoBD: any) => {
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
}

export default Aluno;
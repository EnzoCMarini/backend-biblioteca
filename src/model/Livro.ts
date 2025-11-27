import type { LivroDTO } from "../interface/LivroDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Livro {

    private idLivro: number = 0;
    private titulo: string;
    private autor: string;
    private editora: string;
    private ano_Publicacao: string;
    private isbn: string;
    private quant_Total: number;
    private quant_Disponivel: number;
    private valor_Aquisicao: number;
    private status_Livro_Emprestado: string;

    constructor(
        _titulo: string,
        _autor: string,
        _editora: string,
        _ano_Publicacao: string,
        _isbn: string,
        _quant_Total: number,
        _quant_Disponivel: number,
        _valor_Aquisicao: number,
        _status_livro_Emprestado: string
    ) {
        this.titulo = _titulo;
        this.autor = _autor;
        this.editora = _editora;
        this.ano_Publicacao = _ano_Publicacao;
        this.isbn = _isbn;
        this.quant_Total = _quant_Total;
        this.quant_Disponivel = _quant_Disponivel;
        this.valor_Aquisicao = _valor_Aquisicao;
        this.status_Livro_Emprestado = _status_livro_Emprestado;
    }

    public getIdLivro(): number {
        return this.idLivro;
    }

    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    public getAutor(): string {
        return this.autor;
    }

    public setAutor(autor: string): void {
        this.autor = autor;
    }

    public getEditora(): string {
        return this.editora;
    }

    public setEditora(editora: string): void {
        this.editora = editora;
    }

    public getAno_Publicacao(): string {
        return this.ano_Publicacao;
    }

    public setAno_Publicacao(ano_Publicacao: string): void {
        this.ano_Publicacao = ano_Publicacao;
    }

    public getIsbn(): string {
        return this.isbn;
    }

    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    public getQuant_Total(): number {
        return this.quant_Total;
    }

    public setQuant_Total(quant_Total: number): void {
        this.quant_Total = quant_Total;
    }

    public getQuant_Disponivel(): number {
        return this.quant_Disponivel;
    }

    public setQuant_Disponivel(quant_Disponivel: number): void {
        this.quant_Disponivel = quant_Disponivel;
    }

    public getValor_Aquisicao(): number {
        return this.valor_Aquisicao;
    }

    public setValor_Aquisicao(valor_Aquisicao: number): void {
        this.valor_Aquisicao = valor_Aquisicao;
    }

    public getStatus_Livro_Emprestado(): string {
        return this.status_Livro_Emprestado;
    }

    public setStatus_Livro_Emprestado(status_Livro_Emprestado: string): void {
        this.status_Livro_Emprestado = status_Livro_Emprestado;
    }

    static async listarLivros(): Promise<Array<Livro> | null> {
        try {
            let listaDeLivros: Array<Livro> = [];

            const querySelectLivro = `SELECT * FROM Livro;`;

            const respostaBD = await database.query(querySelectLivro);

            respostaBD.rows.forEach((livroBD: any) => {
                const novoLivro: Livro = new Livro(
                    livroBD.titulo,
                    livroBD.autor,
                    livroBD.editora,
                    livroBD.ano_Publicacao,
                    livroBD.isbn,
                    livroBD.quant_Total,
                    livroBD.quant_Disponivel,
                    livroBD.valor_Aquisicao,
                    livroBD.status_Livro_Emprestado
                );

                novoLivro.setIdLivro(livroBD.id_livro);

                listaDeLivros.push(novoLivro);
            });

            return listaDeLivros;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return null;
        }
    }

    static async cadastrarLivro(livro: LivroDTO): Promise<boolean> {
        try {
            const queryInsertLivro = `INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
                                        VALUES
                                        ($1, $2, $3, $4, $5, $6, %7, %8, %9);
                                        RETURNING id_livro;`;

            const respostaBD = await database.query(queryInsertLivro, [
                livro.titulo,
                livro.autor,
                livro.editora,
                livro.anoPublicacao,
                livro.isbn,
                livro.quantTotal,
                livro.quantDisponivel,
                livro.valorAquisicao,
                livro.statusLivroEmprestado
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(`Livro cadastrado com sucesso. ID: ${respostaBD.rows[0].id_livro}`);

                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            return false;
        }
    }

    static async listarLivro(idLivro: number): Promise<Livro | null> {
        try {
            const querySelectLivro = `SELECT * FROM Livro WHERE id_livro=$1;`;

            const respostaBD = await database.query(querySelectLivro, [idLivro]);

            if (respostaBD.rowCount != 0) {
                const livro: Livro = new Livro(
                    respostaBD.rows[0].titulo,
                    respostaBD.rows[0].autor,
                    respostaBD.rows[0].editora,
                    respostaBD.rows[0].ano_Publicacao,
                    respostaBD.rows[0].isbn,
                    respostaBD.rows[0].quant_Total,
                    respostaBD.rows[0].quant_Disponivel,
                    respostaBD.rows[0].valor_Aquisicao,
                    respostaBD.rows[0].status_Livro_Emprestado
                );
                livro.setIdLivro(respostaBD.rows[0].id_livro);

                return livro;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar cliente no banco de dados. ${error}`);
            return null;
        }
    }
}

export default Livro;
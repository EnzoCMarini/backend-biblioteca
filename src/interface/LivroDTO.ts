export interface LivroDTO{
    idLivro?: number,
    titulo: string,
    autor: string,
    editora: string,
    ano_Publicacao: string,
    isbn: string,
    quant_Total: number,
    quant_Disponivel: number,
    valor_Aquisicao: number,
    status_Livro_Emprestado: string,
    situacao?: boolean
}
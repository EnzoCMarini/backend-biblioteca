export interface EmprestimoDTO {
    idEmprestimo: number,
    idAluno: number,
    idLivro: number,
    data_Emprestimo: Date,
    data_Devolucao: Date,
    status_Emprestimo: string,
    situacao?: boolean
}
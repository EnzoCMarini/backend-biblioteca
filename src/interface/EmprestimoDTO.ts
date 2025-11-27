export interface EmprestimoDTO {
    idEmprestimo: number,
    idAluno: number,
    idLivro: number,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    statusEmprestimo: string,
    situacao?: boolean
}
export interface AlunoDTO {
    idAluno?: number,
    ra: string,
    nome: string,
    sobrenome: string,
    data_Nascimentos: Date,
    endereco: string,
    email: string,
    celular: string,
    situacao?: boolean
}
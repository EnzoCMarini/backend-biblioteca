-- CREATE ALUNO - TRIGGER - FUNCTION

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

-- cria o RA
CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Emil', 'Sinclair', '2004-08-26', 'Rua Marreta, 406', 'emil.sinclair@ncorp.com', '22987654321'),
('Heathcliff', 'Burton', '2000-11-24', 'Rua Vento, 203', 'heathcliff@wildhunt.com', '16912345678'),
('Heinrich', 'Faust', '1997-12-08', 'Rua Mefistófeles, 999', 'faust@tragedia.com', '31996781234'),
('Ryoshu', 'Yoshihide', '2000-11-12', 'Rua Inferno, 12', 'ryoshu@katana.com', '47991234567'),
('Vergillius', 'Compan', '1995-03-21', 'Rua Comédia, 666', 'vergil@limbo.com', '55998765432'),
('Gregor', 'Samsa', '1998-04-23', 'Rua Inseto, 3000', 'gregor@gcorp.com', '61994567890'),
('Dong', 'Baek', '2002-10-01', 'Rua Ideal, 276', 'dongbaek@bush.com', '71990123456'),
('Outis', 'Calipso', '2001-06-14', 'Rua Grego, 2029', 'outis@odisseia.com', '80993216789'),
('Hong', 'Lu', '2003-02-17', 'Rua Qing, 1700', 'luhong@samurai.com', '85989876543'),
('Rodion', 'Raskólnikov', '1999-09-30', 'Rua Lázaro, 6747', 'rodion@aposta.com', '91997654321');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Morro dos Ventos Uivantes', 'Emily Brontë', 'Thomas Cautley Newby', '1847', '978-0141439556', 10, 10, 160.00, 'Disponível'),
('Crime e Castigo', 'Fiódor Dostoiévski', 'Europa-América', '1866', '978-8573266467', 4, 4, 85.00, 'Disponível'),
('Odisseia', 'Homero', 'Odysseus Editora', '800', '978-6555521580', 3, 3, 40.00, 'Disponível'),
('Demian', 'Hermann Hesse', 'Fischer Verlag', '1989', '978-8501020291', 8, 8, 85.00, 'Disponível'),
('O Sonho da Câmara Vermelha', 'Cao Xueqin', 'Cheng Weiyuan', '1791', '979-8338934180', 7, 7, 80.00, 'Disponível'),
('Divina Comédia', 'Dante Alighieri', 'Editora 34', '1321', '978-8573261202', 9, 9, 95.00, 'Disponível'),
('A Metamorfose', 'Franz Kafka', 'Kurt Wolff Verlag', '1915', '978-8571646858', 5, 5, 45.00, 'Disponível'),
('As Asas', 'Yi Sang', 'I-AHN CREATIVE', '1936', '978-8988095508', 7, 7, 250.00, 'Disponível'),
('Tela do Inferno', 'Ryūnosuke Akutagawa', 'Publicação Iwanami Shoten', '1918', '978-0241573693', 4, 4, 140.00, 'Disponível'),
('Fausto', 'Johann Wolfgang von Goethe', 'Editora 34', '1808', '978-8573263732', 3, 3, 105.00, 'Disponível');

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(11, 14, '2025-06-02', '2025-06-16', 'Em andamento'),
(12, 11, '2025-06-03', '2025-06-17', 'Em andamento'),
(13, 20, '2025-06-04', '2025-06-18', 'Em andamento'),
(14, 19, '2025-06-05', '2025-06-19', 'Em andamento'),
(15, 16, '2025-06-06', '2025-06-20', 'Em andamento'),
(16, 17, '2025-06-07', '2025-06-21', 'Em andamento'),
(17, 18, '2025-06-08', '2025-06-22', 'Em andamento'),
(18, 13, '2025-06-09', '2025-06-23', 'Em andamento'),
(19, 15, '2025-06-10', '2025-06-24', 'Em andamento'),
(20, 12, '2025-06-11', '2025-06-25', 'Em andamento');

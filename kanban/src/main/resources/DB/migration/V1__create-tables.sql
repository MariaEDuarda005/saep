CREATE TABLE user (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE task (
    id_task INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    descricao VARCHAR(255) NOT NULL,
    setor VARCHAR(255) NOT NULL,
    prioridade ENUM('BAIXA', 'MEDIA', 'ALTA') NOT NULL,
    data_cadastro DATE NOT NULL,
    status ENUM('AFAZER', 'FAZENDO', 'PRONTO') NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id_user)
);

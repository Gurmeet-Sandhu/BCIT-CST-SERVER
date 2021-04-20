DROP TABLE IF EXISTS student_options;
DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS admins;

CREATE TABLE admins(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE student(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    student_no VARCHAR(255) NOT NULL,
    bcit_email VARCHAR(255) NOT NULL,
    student_set CHAR(1) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE options(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    selection VARCHAR(255) NOT NULL
);

CREATE TABLE student_options(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    student_id INTEGER NOT NULL,
    option_id INTEGER NOT NULL,
    `priority` VARCHAR(255) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE RESTRICT,
    FOREIGN KEY (option_id) REFERENCES options(id) ON DELETE RESTRICT
);

INSERT INTO options(selection) VALUES
("Web & Mobile"),
("AI & Machine"),
("Programming Paradigms"),
("Technical Programming"),
("Cloud Computing (DTC)"),
("Predictive Analytics (DTC)"),
("Defer");

DROP TABLE IF EXISTS student_info;

CREATE TABLE student_info(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    student_no VARCHAR(255) NOT NULL,
    bcit_email VARCHAR(255) NOT NULL,
    student_set CHAR(1) NOT NULL,
    first_choice VARCHAR(255) NOT NULL,
    second_choice VARCHAR(255) NOT NULL,
    third_choice VARCHAR(255) NOT NULL,
    fourth_choice VARCHAR(255) NOT NULL,
    fifth_choice VARCHAR(255) NOT NULL,
    sixth_choice VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
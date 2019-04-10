<?php

class Database {
    private $host ='localhost';
    private $dbname;
    private $charset = 'utf8';
    private $username;
    private $password;
    private $conn; //Connection

    //Соединение с БД
    public function connect() {
        try {
            $this->conn = new PDO('mysql: host=' . $this->host . '; dbname=' . $this->dbname .
                '; charset: ' . $this->charset, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'Ошибка соединения: ' . $e->getMessage();
        }

        return $this->conn;
    }
}
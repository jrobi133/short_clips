DROP DATABASE IF EXISTS short_clips;

CREATE DATABASE short_clips;

USE short_clips;

-- create the table for User

CREATE TABLE
    IF NOT EXISTS `User` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `username` varchar(255) NOT NULL,
        `email` varchar(255) NOT NULL,
        `password` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 AUTO_INCREMENT = 1;
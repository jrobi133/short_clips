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

-- create the table for Video

CREATE TABLE
    IF NOT EXISTS `Video` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `description` varchar(255) NOT NULL,
        `url` varchar(255) NOT NULL,
        `user_id` int(11) NOT NULL,
        ''
        PRIMARY KEY (`id`),
        FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 AUTO_INCREMENT = 1;
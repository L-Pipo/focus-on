SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `days`;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS pomodoro;
DROP TABLE IF EXISTS users;

SET foreign_key_checks = 1;

CREATE TABLE `days` (
	`date` DATE NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `tasks` (
	`title` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`id` INT NOT NULL AUTO_INCREMENT,
	`day_id` INT NOT NULL,
	`completed` BOOLEAN NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `pomodoro` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`day_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `days` ADD CONSTRAINT `day_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk0` FOREIGN KEY (`day_id`) REFERENCES `days`(`id`);

ALTER TABLE `tasks` ADD CONSTRAINT `tasks_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `pomodoro` ADD CONSTRAINT `pomodoro_fk0` FOREIGN KEY (`day_id`) REFERENCES `days`(`id`);

ALTER TABLE `pomodoro` ADD CONSTRAINT `pomodoro_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

-- When adding Sample Data it is important to respect contstraints and relations
-- Order of sample data matters

-- SAMPLE DATA

INSERT INTO users (username, password, email)
	VALUES
	('user1', 'pass1', 'user1@dev.com'),
	('user2', 'pass2', 'user2@dev.com'),
	('user3', 'pass3', 'user3@dev.com');

INSERT INTO days (date, user_id)
    VALUES ("27.10.2022", 1), ("28.10.2022", 2), ("29.10.2022", 2), ("30.10.2022", 2), ("31.10.2022", 2);

INSERT INTO tasks (title, description, completed, day_id, user_id)
    VALUES ("Learn React", "Go through slides and try to write simple application", true, 1, 1), ("Do challenge on Codewars", "Solve Kata", false, 2, 1), 
	("Start to read JS for Beginners", "Try to understand chapter 1 and 2", false, 1, 1), ("Do something else", "Just do it...", true, 3, 2), ("Do another thing", "Do this thing", true, 4, 2),
	("Do another thing", "Do this thing", true, 5, 2), ("Do another thing", "Do this thing", false, 5, 2), ("Do another thing", "Do this thing", false, 5, 2) ;

INSERT INTO pomodoro (day_id, user_id)
	VALUES (1, 1), (1, 1), (2, 2), (3, 2), (3, 2), (3, 2), (4, 2), (5, 2), (5, 2), (5, 2), (5, 2);




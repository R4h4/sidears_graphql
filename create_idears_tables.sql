CREATE TABLE `sidears`.`idears` (
  `idea_id` VARCHAR(50) NOT NULL,
  `idea` MEDIUMTEXT NOT NULL,
  `created_at` DATETIME NULL,
  `img_link` VARCHAR(255) NULL,
  `upvote_count` INT NULL,
  `user_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idea_id`));

CREATE TABLE `sidears`.`tags` (
  `tag_id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NULL,
  PRIMARY KEY (`tag_id`));

CREATE TABLE `sidears`.`idea-tags` (
  `idea_id` VARCHAR(50) NOT NULL,
  `tag_id` VARCHAR(50) NULL,
  PRIMARY KEY (`idea_id`),
  INDEX `fk_tag_idx` (`tag_id` ASC),
  CONSTRAINT `fk_idea`
    FOREIGN KEY (`idea_id`)
    REFERENCES `sidears`.`idears` (`idea_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `sidears`.`tags` (`tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


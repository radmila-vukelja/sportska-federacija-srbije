INSERT INTO `role`(`id`, `type`) VALUES (1, 'ROLE_ADMIN');
INSERT INTO `role`(`id`, `type`) VALUES (2, 'ROLE_USER');
INSERT INTO `user`(`id`, `last_name`,`name`, `password`, `user_name`, `email`, `role_id`) VALUES (1, 'admin', 'admin', 'admin', 'admin', 'admin@admin.com', 1);
--INSERT INTO `user_role`(`user_id`,`role_id`)VALUES(1, 1);

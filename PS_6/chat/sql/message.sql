CREATE TABLE `message` (
  `id` int(10) NOT NULL,
  `text` text CHARACTER SET utf8mb4 NOT NULL,
  `time` bigint(13) NOT NULL,
  `user` varchar(32) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `message`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;


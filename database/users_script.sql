LOAD DATA LOCAL INFILE "/home/billys/Documents/Winter2021-22/Softeng/TL21-32/data/users.csv" INTO TABLE softeng21.User
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(username, password, userIdentity)
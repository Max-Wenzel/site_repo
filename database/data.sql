create table if not exists course (
cid int(4) not null auto_increment,
id int(4) not null,
name varchar(40) not null,
professor varchar(30) not null,
primary key (cid),
foreign key (id) REFERENCES login(id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

create table if not exists login (
type int(1) not null,
id int(4) not null auto_increment,
username varchar(30) not null,
password varchar(30) not null,
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


create table if not exists students (
id int(4) not null,
name varchar(40) not null,
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

create table if not exists assisstants (
id int(4) not null,
cid int(4),
name varchar(30) not null,
primary key (id),
foreign key (cid) REFERENCES course(cid)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

create table if not exists schedule (
id int(4) not null auto_increment,
Monday varchar(20) not null,
Tuesday varchar(20) not null,
Wednesday varchar(20) not null,
Thursday varchar(20) not null,
Friday varchar(20) not null,
Mlocation varchar(20) not null,
Tlocation varchar(20) not null,
Wlocation varchar(20) not null,
THlocation varchar(20) not null,
Flocation varchar(20) not null,
primary key (id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

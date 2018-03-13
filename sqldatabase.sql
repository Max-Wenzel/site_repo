create table if not exists course (
cid int(4) not null auto_increment,
name varchar(40) not null,
professor varchar(30) not null,
primary key (cid)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=8;

create table if not exists login (
type int(1) not null,
username varchar(30) not null,
password varchar(30) not null,
primary key (type)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=8;


create table if not exists students (
sid int(4) not null auto_increment,
cid int(4) not null,
type int(1) not null,
name varchar(40) not null,
Professor varchar(30) not null,
primary key (sid),
foreign key (cid) REFERENCES course(cid),
foreign key (type) REFERENCES Login(type)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=8;

create table if not exists assisstants (
tid int(4) not null auto_increment,
type int(1) not null,
name varchar(30) not null,
Password varchar(30) not null,
primary key (tid),
foreign key (type) REFERENCES Login(type)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=8;

create table if not exists schedule (
tid int(4) not null auto_increment,
Monday varchar(20) not null,
Tuesday varchar(20) not null,
Wednesday varchar(20) not null,
Thursday varchar(20) not null,
Friday varchar(20) not null,
primary key (tid)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=8;
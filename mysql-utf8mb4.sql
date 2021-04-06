CREATE TABLE sogo_acl (
	c_folder_id int(11)      NOT NULL,
	c_object    varchar(255) NOT NULL,
	c_uid       varchar(255) NOT NULL,
	c_role      varchar(80)  NOT NULL,
	KEY sogo_acl_c_folder_id_idx (c_folder_id),
	KEY sogo_acl_c_uid_idx (c_uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

CREATE TABLE sogo_alarms_folder (
	c_path          varchar(255) NOT NULL,
	c_name          varchar(255) NOT NULL,
	c_uid           varchar(255) NOT NULL,
	c_recurrence_id int(11)      DEFAULT NULL,
	c_alarm_number  int(11)      NOT NULL,
	c_alarm_date    int(11)      NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

CREATE TABLE sogo_cache_folder (
	c_uid          varchar(255) NOT NULL,
	c_path         varchar(255) NOT NULL,
	c_parent_path  varchar(255) DEFAULT NULL,
	c_type         tinyint(3)   unsigned NOT NULL,
	c_creationdate int(11)      NOT NULL,
	c_lastmodified int(11)      NOT NULL,
	c_version      int(11)      NOT NULL DEFAULT '0',
	c_deleted      tinyint(4)   NOT NULL DEFAULT '0',
	c_content      longtext,
	PRIMARY KEY (c_uid,c_path)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

CREATE TABLE sogo_folder_info (
	c_folder_id      bigint(20)    unsigned NOT NULL AUTO_INCREMENT,
	c_path           varchar(255)  NOT NULL,
	c_path1          varchar(255)  NOT NULL,
	c_path2          varchar(255)  DEFAULT NULL,
	c_path3          varchar(255)  DEFAULT NULL,
	c_path4          varchar(255)  DEFAULT NULL,
	c_foldername     varchar(255)  NOT NULL,
	c_location       varchar(2048) DEFAULT NULL,
	c_quick_location varchar(2048) DEFAULT NULL,
	c_acl_location   varchar(2048) DEFAULT NULL,
	c_folder_type    varchar(255)  NOT NULL,
	PRIMARY KEY (c_path),
	UNIQUE KEY c_folder_id (c_folder_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

CREATE TABLE sogo_quick_appointment (
	c_folder_id      int(11)       NOT NULL,
	c_name           varchar(255)  NOT NULL,
	c_uid            varchar(255)  NOT NULL,
	c_startdate      int(11)       DEFAULT NULL,
	c_enddate        int(11)       DEFAULT NULL,
	c_cycleenddate   int(11)       DEFAULT NULL,
	c_title          varchar(1000) NOT NULL,
	c_participants   text,
	c_isallday       int(11)       DEFAULT NULL,
	c_iscycle        int(11)       DEFAULT NULL,
	c_cycleinfo      text,
	c_classification int(11)       NOT NULL,
	c_isopaque       int(11)       NOT NULL,
	c_status         int(11)       NOT NULL,
	c_priority       int(11)       DEFAULT NULL,
	c_location       varchar(255)  DEFAULT NULL,
	c_orgmail        varchar(255)  DEFAULT NULL,
	c_partmails      text,
	c_partstates     text,
	c_category       varchar(255)  DEFAULT NULL,
	c_sequence       int(11)       DEFAULT NULL,
	c_component      varchar(10)   NOT NULL,
	c_nextalarm      int(11)       DEFAULT NULL,
	c_description    text,
	PRIMARY KEY (c_folder_id,c_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

CREATE TABLE sogo_quick_contact (
	c_folder_id       int(11)      NOT NULL,
	c_name            varchar(255) NOT NULL,
	c_givenname       varchar(255) DEFAULT NULL,
	c_cn              varchar(255) DEFAULT NULL,
	c_sn              varchar(255) DEFAULT NULL,
	c_screenname      varchar(255) DEFAULT NULL,
	c_l               varchar(255) DEFAULT NULL,
	c_mail            text         DEFAULT NULL,
	c_o               varchar(255) DEFAULT NULL,
	c_ou              varchar(255) DEFAULT NULL,
	c_telephonenumber varchar(255) DEFAULT NULL,
	c_categories      varchar(255) DEFAULT NULL,
	c_component       varchar(10)  NOT NULL,
	c_hascertificate  int(11)      DEFAULT 0,
	PRIMARY KEY (c_folder_id,c_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

CREATE TABLE sogo_sessions_folder (
	c_id           varchar(255) NOT NULL,
	c_value        varchar(255) NOT NULL,
	c_creationdate int(11)      NOT NULL,
	c_lastseen     int(11)      NOT NULL,
	PRIMARY KEY (c_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

CREATE TABLE sogo_store (
	c_folder_id    int(11)      NOT NULL,
	c_name         varchar(255) NOT NULL DEFAULT '',
	c_content      mediumtext   NOT NULL,
	c_creationdate int(11)      NOT NULL,
	c_lastmodified int(11)      NOT NULL,
	c_version      int(11)      NOT NULL,
	c_deleted      int(11)      DEFAULT NULL,
	PRIMARY KEY (c_folder_id,c_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

CREATE TABLE sogo_user_profile (
	c_uid      varchar(255) NOT NULL,
	c_defaults longtext,
	c_settings longtext,
	PRIMARY KEY (c_uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;


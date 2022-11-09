BEGIN TRANSACTION;

DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS invitation;
DROP TABLE IF EXISTS users;

DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

CREATE TABLE invitation (
  invitation_id serial NOT NULL,
  host_id int NOT NULL,
  city varchar(100) NOT NULL,
  restaurant varchar(100),
  meeting_date timestamptz NOT NULL,
  decision_date timestamptz NOT NULL,
    CONSTRAINT PK_invitation PRIMARY KEY (invitation_id),
	CONSTRAINT FK_invitation_host_id FOREIGN KEY(host_id) REFERENCES users(user_id)
);

CREATE TABLE votes (
  vote_id serial NOT NULL,
  restaurant varchar(100),
  thumbs_up int DEFAULT 0,
  thumbs_down int DEFAULT 0,
  invitation_id int NOT NULL,
	CONSTRAINT PK_votes PRIMARY KEY (vote_id),
	CONSTRAINT FK_votes_invitation_id FOREIGN KEY(invitation_id) REFERENCES invitation(invitation_id)
);

CREATE TABLE guests (
  guest_id serial NOT NULL,
  name varchar(30) NOT NULL,
  email varchar(100),
  vote_id int NOT NULL,
  invitation_id int NOT NULL,
  CONSTRAINT PK_guests PRIMARY KEY (guest_id),
  CONSTRAINT FK_guests_vote_id FOREIGN KEY (vote_id) REFERENCES votes(vote_id),
  CONSTRAINT FK_guests_invitation_id FOREIGN KEY (invitation_id) REFERENCES invitation (invitation_id)
);

COMMIT TRANSACTION;
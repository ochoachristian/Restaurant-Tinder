BEGIN TRANSACTION;

DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS invitation;
DROP TABLE IF EXISTS users;

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
  host_id serial NOT NULL,
  city varchar NOT NULL,
  appointment timestamp NOT NULL,
  decisionDate timestamp NOT NULL,
  numberOfGuest int DEFAULT 0,
  CONSTRAINT PK_invitation PRIMARY KEY (invitation_id),
	CONSTRAINT FK_invitation_id FOREIGN KEY(host_id) REFERENCES users(user_id)
);

CREATE TABLE event (
  eventId int NOT NULL,
  restaurant varchar NOT NULL,
  thumbsUP int DEFAULT 0,
  thumbsDown int DEFAULT 0,
  decisionDate timestamp NOT NULL,
  invitationId int NOT NULL,
	CONSTRAINT PK_event PRIMARY KEY (eventId),
	CONSTRAINT FK_eventId FOREIGN KEY(eventId) REFERENCES invitation(invitation_id)
);

CREATE TABLE guests (
  guestId int NOT NULL,
  name varchar NOT NULL,
  email varchar,
  CONSTRAINT PK_guest PRIMARY KEY (guestId)
);

COMMIT TRANSACTION;
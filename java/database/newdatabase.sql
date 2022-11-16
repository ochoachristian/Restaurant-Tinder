DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS invitation;
DROP TABLE IF EXISTS saved_restaurants;


CREATE TABLE saved_restaurants (
  restaurant_id serial NOT NULL,
  image varchar(255),
  name varchar(100) NOT NULL,
  url varchar(200) NOT NULL,
  address varchar(100) NOT NULL,
  phone_number varchar(20),
  user_id int NOT NULL,
  CONSTRAINT PK_saved_restaurants PRIMARY KEY (restaurant_id),
  CONSTRAINT FK_saved_restaurants_user_id FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE invitation (
  invitation_id serial NOT NULL,
  host_id int NOT NULL,
  city varchar(100) NOT NULL,
  restaurant_id int DEFAULT NULL,
  meeting_date timestamptz NOT NULL,
  decision_date timestamptz NOT NULL,
  CONSTRAINT PK_invitation PRIMARY KEY (invitation_id),
  CONSTRAINT FK_invitation_host_id FOREIGN KEY(host_id) REFERENCES users(user_id),
  CONSTRAINT FK_invitation_restaurant_id FOREIGN KEY(restaurant_id) REFERENCES saved_restaurants(restaurant_id)
);

CREATE TABLE votes (
  vote_id serial NOT NULL,
  restaurant_id int NOT NULL,
  thumbs_up int DEFAULT 0,
  thumbs_down int DEFAULT 0,
  invitation_id int NOT NULL,
  CONSTRAINT PK_votes PRIMARY KEY (vote_id),
  CONSTRAINT FK_votes_invitation_id FOREIGN KEY(invitation_id) REFERENCES invitation(invitation_id),
  CONSTRAINT FK_votes_restaurant_id FOREIGN KEY(restaurant_id) REFERENCES saved_restaurants(restaurant_id)
);

CREATE TABLE guests (
  guest_id serial NOT NULL,
  name varchar(50) NOT NULL,
  email varchar(100),
  vote_id int NOT NULL,
  invitation_id int NOT NULL,
  CONSTRAINT PK_guests PRIMARY KEY (guest_id),
  CONSTRAINT FK_guests_vote_id FOREIGN KEY (vote_id) REFERENCES votes(vote_id),
  CONSTRAINT FK_guests_invitation_id FOREIGN KEY (invitation_id) REFERENCES invitation (invitation_id)
);
-- Active: 1759323704886@@127.0.0.1@5432@sirojiddin
CREATE TYPE tournament_status AS ENUM('upcoming', 'active', 'finished');

CREATE TABLE tournaments(
    id SERIAL PRIMARY KEY,
    tournament_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status tournament_status NOT NULL
);

ALTER TABLE tournaments
ADD COLUMN created_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();


INSERT INTO tournaments (tournament_name, start_date, end_date, status) VALUES
('Dubai Open', '2025-10-10', '2025-11-01', 'upcoming'),
('Tashkent Cup', '2025-09-01', '2025-09-30', 'finished');


CREATE TABLE tournament_groups(
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    tournament_id INT REFERENCES tournaments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE tournament_groups
ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

INSERT INTO tournament_groups (group_name, tournament_id) VALUES
('Group A', 1),
('Group B', 2);
CREATE TABLE football_clubs(
    id SERIAL PRIMARY KEY,
    club_name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    founded_year INT
);
ALTER TABLE football_clubs
ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

INSERT INTO football_clubs (club_name, city, country, founded_year) VALUES
('Real Madrid', 'Madrid', 'Spain', 1902),
('FC Barcelona', 'Barcelona', 'Spain', 1899);

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(100),
    club_id INT REFERENCES football_clubs(id) ON DELETE CASCADE,
    group_id INT REFERENCES tournament_groups(id) ON DELETE CASCADE,
    coach_name VARCHAR(100)
);

ALTER TABLE teams
ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

INSERT INTO teams (team_name, club_id, group_id, coach_name) VALUES
('Real Madrid First Team', 1, 1, 'Carlo Ancelotti'),
('Barcelona Main Squad', 2, 1, 'Xavi Hernandez');

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    position VARCHAR(50) NOT NULL,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    jersey_number INT
);

ALTER TABLE players
ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
INSERT INTO players (full_name, date_of_birth, position, team_id, jersey_number) VALUES
('Karim Benzema', '1987-12-19', 'Forward', 1, 9),
('Pedri Gonzalez', '2002-11-25', 'Midfielder', 2, 8);

CREATE TABLE match_fixtures(
    id SERIAL PRIMARY KEY,
    match_date TIMESTAMP NOT NULL,
    venue VARCHAR(100),
    home_team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    away_team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    home_score INT,
    away_score INT,
    tournament_id INT REFERENCES tournaments(id) ON DELETE CASCADE,
    match_status VARCHAR(20)
);
ALTER TABLE match_fixtures
ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();

INSERT INTO match_fixtures (match_date, venue, home_team_id, away_team_id, home_score, away_score, tournament_id, match_status)
VALUES
('2025-10-05 20:00', 'Bernabeu', 1, 2, 3, 1, 1, 'finished');
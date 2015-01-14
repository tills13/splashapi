--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: photo_ids; Type: SEQUENCE; Schema: public; Owner: tills13
--

CREATE SEQUENCE photo_ids
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photo_ids OWNER TO tills13;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: photos; Type: TABLE; Schema: public; Owner: tills13; Tablespace: 
--

CREATE TABLE photos (
    photo_id integer NOT NULL,
    photo_url text,
    photo_author text,
    photo_author_url text,
    photo_height integer,
    photo_width integer,
    photo_average_color text
);


ALTER TABLE public.photos OWNER TO tills13;

--
-- Name: photos_pkey; Type: CONSTRAINT; Schema: public; Owner: tills13; Tablespace: 
--

ALTER TABLE ONLY photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (photo_id);


--
-- Name: unique_url; Type: CONSTRAINT; Schema: public; Owner: tills13; Tablespace: 
--

ALTER TABLE ONLY photos
    ADD CONSTRAINT unique_url UNIQUE (photo_url);


--
-- Name: public; Type: ACL; Schema: -; Owner: tills13
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM tills13;
GRANT ALL ON SCHEMA public TO tills13;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: photos; Type: ACL; Schema: public; Owner: tills13
--

REVOKE ALL ON TABLE photos FROM PUBLIC;
REVOKE ALL ON TABLE photos FROM tills13;
GRANT ALL ON TABLE photos TO tills13;
GRANT ALL ON TABLE photos TO _www;


--
-- PostgreSQL database dump complete
--


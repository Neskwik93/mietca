--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12
-- Dumped by pg_dump version 10.12

-- Started on 2020-05-26 11:24:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2825 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 16441)
-- Name: backoffice; Type: TABLE; Schema: public; Owner: neskwik
--

CREATE TABLE public.backoffice (
    id integer NOT NULL,
    tusaispotsais text NOT NULL
);


ALTER TABLE public.backoffice OWNER TO neskwik;

--
-- TOC entry 197 (class 1259 OID 16447)
-- Name: backoffice_id_seq; Type: SEQUENCE; Schema: public; Owner: neskwik
--

CREATE SEQUENCE public.backoffice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.backoffice_id_seq OWNER TO neskwik;

--
-- TOC entry 2826 (class 0 OID 0)
-- Dependencies: 197
-- Name: backoffice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neskwik
--

ALTER SEQUENCE public.backoffice_id_seq OWNED BY public.backoffice.id;


--
-- TOC entry 198 (class 1259 OID 16449)
-- Name: backoffice_tusaispotsais_seq; Type: SEQUENCE; Schema: public; Owner: neskwik
--

CREATE SEQUENCE public.backoffice_tusaispotsais_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.backoffice_tusaispotsais_seq OWNER TO neskwik;

--
-- TOC entry 2827 (class 0 OID 0)
-- Dependencies: 198
-- Name: backoffice_tusaispotsais_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neskwik
--

ALTER SEQUENCE public.backoffice_tusaispotsais_seq OWNED BY public.backoffice.tusaispotsais;

INSERT INTO public.backoffice VALUES(1, 'aigrikOuiii');

--
-- TOC entry 199 (class 1259 OID 16451)
-- Name: coup; Type: TABLE; Schema: public; Owner: neskwik
--

CREATE TABLE public.coup (
    id integer NOT NULL,
    value text,
    user_id integer,
    "time" text
);


ALTER TABLE public.coup OWNER TO neskwik;

--
-- TOC entry 200 (class 1259 OID 16457)
-- Name: coup_id_seq; Type: SEQUENCE; Schema: public; Owner: neskwik
--

CREATE SEQUENCE public.coup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coup_id_seq OWNER TO neskwik;

--
-- TOC entry 2828 (class 0 OID 0)
-- Dependencies: 200
-- Name: coup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neskwik
--

ALTER SEQUENCE public.coup_id_seq OWNED BY public.coup.id;


--
-- TOC entry 201 (class 1259 OID 16459)
-- Name: users; Type: TABLE; Schema: public; Owner: neskwik
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    age integer,
    genre text,
    proffession text,
    niv_etude text,
    frequence text,
    joueur_pro text,
    jeu_pro text,
    structure text,
    jeux text,
    materiel text
);


ALTER TABLE public.users OWNER TO neskwik;

--
-- TOC entry 202 (class 1259 OID 16465)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neskwik
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO neskwik;

--
-- TOC entry 2829 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neskwik
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2687 (class 2604 OID 16467)
-- Name: backoffice id; Type: DEFAULT; Schema: public; Owner: neskwik
--

ALTER TABLE ONLY public.backoffice ALTER COLUMN id SET DEFAULT nextval('public.backoffice_id_seq'::regclass);


--
-- TOC entry 2688 (class 2604 OID 16468)
-- Name: coup id; Type: DEFAULT; Schema: public; Owner: neskwik
--

ALTER TABLE ONLY public.coup ALTER COLUMN id SET DEFAULT nextval('public.coup_id_seq'::regclass);


--
-- TOC entry 2689 (class 2604 OID 16469)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neskwik
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2691 (class 2606 OID 16471)
-- Name: backoffice backoffice_pkey; Type: CONSTRAINT; Schema: public; Owner: neskwik
--

ALTER TABLE ONLY public.backoffice
    ADD CONSTRAINT backoffice_pkey PRIMARY KEY (id);


--
-- TOC entry 2693 (class 2606 OID 16473)
-- Name: coup coup_pkey; Type: CONSTRAINT; Schema: public; Owner: neskwik
--

ALTER TABLE ONLY public.coup
    ADD CONSTRAINT coup_pkey PRIMARY KEY (id);


--
-- TOC entry 2695 (class 2606 OID 16475)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neskwik
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2824 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO neskwik;


-- Completed on 2020-05-26 11:24:40

--
-- PostgreSQL database dump complete
--


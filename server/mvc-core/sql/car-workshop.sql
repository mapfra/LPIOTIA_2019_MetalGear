--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 12.0

-- Started on 2019-12-17 22:17:15 CET

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

SET default_tablespace = '';

--
-- TOC entry 197 (class 1259 OID 16387)
-- Name: orders; Type: TABLE; Schema: public; Owner: jmbruneau
--

-- CREATE TABLE "mvc-core".orders (
CREATE TABLE public.orders (
    id bigint NOT NULL,
    lastname character varying NOT NULL,
    firstname character varying NOT NULL,
    email character varying NOT NULL,
    brend character varying,
    model character varying,
    gearbox character varying,
    color character varying,
    options json,
    return_price numeric(9,0),
    total_price numeric(9,0),
    date time with time zone DEFAULT now()
);


ALTER TABLE public.orders OWNER TO jmbruneau;

--
-- TOC entry 196 (class 1259 OID 16385)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: jmbruneau
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE;


ALTER TABLE public.orders_id_seq OWNER TO jmbruneau;

--
-- TOC entry 3187 (class 0 OID 0)
-- Dependencies: 196
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jmbruneau
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 3055 (class 2604 OID 16390)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: jmbruneau
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3181 (class 0 OID 16387)
-- Dependencies: 197
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: jmbruneau
--

COPY public.orders (id, lastname, firstname, email, brend, model, gearbox, color, options, return_price, total_price, date) FROM stdin;
2	f80X08Sh5UH0uO6rIJAF7w==$n2a/ZVwBpg==	f80X08Sh5UH0uO6rIJAF7w==$l1GLRTQNmr3ENyA=	f80X08Sh5UH0uO6rIJAF7w==$t1GLRTQtmr3ENyDKXl8jLa0MEFdhJbqqUVdWR3huyQ==	Renault	Laguna	automatic	nacreous	{"reversing_radar":"reversing_radar","xenon_lighthouse":"xenon_lighthouse","rain_sensor":"rain_sensor","air_conditioner":"air_conditioner"}	900	23590	08:54:12.984416+01
4	8iG2U067Hffn0xgM9q77PQ==$75EXfHLCnA==	8iG2U067Hffn0xgM9q77PQ==$56YjXBrOoPmnfGI=	8iG2U067Hffn0xgM9q77PQ==$x6YjXBruoPmnfGK3KiuFS7nkxz8DtG/g/Vpim5typA==	Renault	Laguna	automatic	nacreous	{"reversing_radar":"reversing_radar","xenon_lighthouse":"xenon_lighthouse","speed_regulator":"speed_regulator","rain_sensor":"rain_sensor","air_conditioner":"air_conditioner"}	1000	23790	13:17:25.02445+01
3	qxZ9ARWphDkJZjsI3Ev5Gw==$gs74SRTIqw==	qxZ9ARWphDkJZjsI3Ev5Gw==$ivnMaXzElwIe2fU=	qxZ9ARWphDkJZjsI3Ev5Gw==$qvnMaXzklwIe2fVaZFa/13PS8KSP2g7PskK2JoYOyA==	Renault	Laguna	automatic	nacreous	{"reversing_radar":"reversing_radar","xenon_lighthouse":"xenon_lighthouse","rain_sensor":"rain_sensor","air_conditioner":"air_conditioner"}	1000	23490	12:50:58.783844+01
5	FeqXfzlYbDJSaC7DUkYzaA==$P1Vx3JjBew==	FeqXfzlYbDJSaC7DUkYzaA==$N2JF/PDNR0/007U=	FeqXfzlYbDJSaC7DUkYzaA==$F2JF/PDtR0/007VLFrX9GY7J9LelYbG/GgUTXbITmA==	Renault	Laguna	automatic	nacreous	{"reversing_radar":"reversing_radar","xenon_lighthouse":"xenon_lighthouse","speed_regulator":"speed_regulator","rain_sensor":"rain_sensor","air_conditioner":"air_conditioner"}	1000	23790	13:17:37.779754+01
10	4eKEUINBz39KKrvGyq0yYA==$iyFnIAJQ5A==	4eKEUINBz39KKrvGyq0yYA==$gxZTAGpc2PEItt0=	4eKEUINBz39KKrvGyq0yYA==$oxZTAGp82PEItt3ZqAtLQTh9IAkcpGUpBrom2+kFtg==	Renault	Megane	automatic	nacreous	{"reversing_radar":"reversing_radar","xenon_lighthouse":"xenon_lighthouse","speed_regulator":"speed_regulator","rain_sensor":"rain_sensor","air_conditioner":"air_conditioner"}	1000	20790	23:11:10.115255+01
14	apbYc9GFctAHZe8JYLKxwQ==$efBdT1qrnw==	apbYc9GFctAHZe8JYLKxwQ==$ccdpbzKno/tAbmo=	apbYc9GFctAHZe8JYLKxwQ==$UcdpbzKHo/tAbmpRTxCEf1b3IeuJ2XBMbyLW8AQGEQ==	Renault	Twingo	robotic	metallic	{"reversing_radar":"reversing_radar","air_conditioner":"air_conditioner"}	799	11991	21:03:39.413612+01
15	c3BaDWDQ3nRoeDCfWgo5Wg==$ruCRpyBhvw==	c3BaDWDQ3nRoeDCfWgo5Wg==$ptelh0htg+8Seuo=	c3BaDWDQ3nRoeDCfWgo5Wg==$htelh0hNg+8SeuqMskAy8MQhJno580ZhSfFzPWX3rA==	Renault	Twingo	robotic	metallic	{"reversing_radar":"reversing_radar","air_conditioner":"air_conditioner"}	799	11991	21:06:48.823278+01
13	07blOYC03hGSVIq73JAdWw==$lw9dv2lg0Q==	07blOYC03hGSVIq73JAdWw==$nzhpnwFs7eKQDP8=	07blOYC03hGSVIq73JAdWw==$vzhpnwFM7eKQDP/SSVlkQ5GQFDBT3OsmLULCQa9EpQ==	Renault	Twingo	robotic	metallic	{"reversing_radar":"reversing_radar","air_conditioner":"air_conditioner"}	799	11991	21:02:00.467684+01
16	3BcgQUfQDjilnm7rUVCykg==$x5WHWmbVtQ==	3BcgQUfQDjilnm7rUVCykg==$z6ihcVP8	3BcgQUfQDjilnm7rUVCykg==$76Kzeg75iRg9HifPG9svFHNMtsYqRcmBfpXUouYp1g==	Peugeot	407	automatic	nacreous	{"reversing_radar":"reversing_radar","speed_regulator":"speed_regulator","air_conditioner":"air_conditioner"}	899	23891	22:08:30.179823+01
17	FvWxDM38yJdqinZAZCNAhQ==$d/g2O8/9Xw==	FvWxDM38yJdqinZAZCNAhQ==$f88CG6fxY0idVwc=	FvWxDM38yJdqinZAZCNAhQ==$X88CG6fRY0idVwcOkjAZS8Vzks9UeMrYrr/fopT/Nw==	Renault	Clio	manual	metallic	{"reversing_radar":"reversing_radar","air_conditioner":"air_conditioner"}	1999	12791	23:02:34.128091+01
18	Mo3zStoxG2c5dlq9tPCPnA==$K/PX5pez9Q==	Mo3zStoxG2c5dlq9tPCPnA==$I8Tjxv+/yRy5HeU=	Mo3zStoxG2c5dlq9tPCPnA==$A8Tjxv+fyRy5HeWPbVloG3+iNkvd6Fk1E+c6uloq1A==	Renault	Clio	robotic	nacreous	{"reversing_radar":"reversing_radar","speed_regulator":"speed_regulator","air_conditioner":"air_conditioner"}	1000	15290	23:55:21.690115+01
19	WkHprJfSMBG5VXjqZ9EEqA==$qbKsrEfOcA==	WkHprJfSMBG5VXjqZ9EEqA==$oYWYjC/CTKrdyEw=	WkHprJfSMBG5VXjqZ9EEqA==$gYWYjC/iTKrdyEyEMlGKrZ65SP/fQqBqGtCnWnwyYg==	Peugeot	407	robotic	standard	{"reversing_radar":"reversing_radar","speed_regulator":"speed_regulator","air_conditioner":"air_conditioner"}	899	22691	00:14:13.138291+01
6	8eULE6EDAcYPtj7T/8x7hw==$J7JbwtXmyA==	8eULE6EDAcYPtj7T/8x7hw==$L4Vv4r3q9Krbjt4=	8eULE6EDAcYPtj7T/8x7hw==$D4Vv4r3K9Krbjt6syt7mfeFnRuwBj3eJgqiJ0cn+6A==	Renault	Laguna	automatic	nacreous	null	999	23791	17:30:24.344376+01
20	cHjN03XApHRm4I1S/s9nXA==$gtl9c3Hs7w==	cHjN03XApHRm4I1S/s9nXA==$iu5JUxng058maL0=	cHjN03XApHRm4I1S/s9nXA==$qu5JUxnA058maL29Uv/KpG9wprh/uf4/NcTXReaLfA==	Renault	Laguna	robotic	nacreous	{"xenon_lighthouse":"xenon_lighthouse","air_conditioner":"air_conditioner"}	1999	21441	01:30:31.726953+01
12	aHQWPWeNDkdw8OwhmGpd9g==$3CnLd7/WKA==	aHQWPWeNDkdw8OwhmGpd9g==$1B7/V9faFMpJVJU=	aHQWPWeNDkdw8OwhmGpd9g==$9B7/V9f6FMpJVJWNs5BfiURIOxYFjGrlTrKIzKShkA==	Renault	Twingo	robotic	metallic	{"reversing_radar":"reversing_radar","air_conditioner":"air_conditioner"}	799	11991	20:59:25.10123+01
\.


--
-- TOC entry 3188 (class 0 OID 0)
-- Dependencies: 196
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jmbruneau
--

SELECT pg_catalog.setval('public.orders_id_seq', 20, true);


--
-- TOC entry 3058 (class 2606 OID 16392)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: jmbruneau
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


-- Completed on 2019-12-17 22:17:16 CET

--
-- PostgreSQL database dump complete
--


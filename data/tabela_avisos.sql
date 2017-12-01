
CREATE TABLE public.avisos
(
    area character varying(100) COLLATE pg_catalog."default" NOT NULL,
    numero character varying(50) COLLATE pg_catalog."default" NOT NULL,
    titulo character varying(100) COLLATE pg_catalog."default" NOT NULL,
    texto character varying(250) COLLATE pg_catalog."default" NOT NULL,
    validade character varying(100) COLLATE pg_catalog."default" NOT NULL,
    ativo boolean NOT NULL,
    id_aviso integer NOT NULL DEFAULT nextval('aviso_id_config_seq'::regclass),
    geom geometry(Polygon,4326) NOT NULL,
    complemento character varying COLLATE pg_catalog."default",
    emissao character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT avisos_pkey PRIMARY KEY (id_aviso)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.avisos
    OWNER to postgres;
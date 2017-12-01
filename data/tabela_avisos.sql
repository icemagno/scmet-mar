CREATE SEQUENCE public.aviso_id_config_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;


CREATE TABLE public.avisos
(
    area character varying(100) NOT NULL,
    numero character varying(50)  NOT NULL,
    titulo character varying(100) NOT NULL,
    texto character varying(250)  NOT NULL,
    validade character varying(100)  NOT NULL,
    ativo boolean NOT NULL,
    id_aviso integer NOT NULL DEFAULT nextval('aviso_id_config_seq'::regclass),
    geom geometry(Polygon,4326) NOT NULL,
    complemento character varying ,
    emissao character varying(100) NOT NULL,
    CONSTRAINT avisos_pkey PRIMARY KEY (id_aviso)
)

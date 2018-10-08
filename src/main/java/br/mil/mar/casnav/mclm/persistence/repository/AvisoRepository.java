package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.Aviso;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class AvisoRepository extends BasicRepository  {

	public AvisoRepository() throws DatabaseConnectException {
		super();
	}
	
	
	public List<Aviso> getList() throws Exception {
		DaoFactory<Aviso> df = new DaoFactory<Aviso>();
		IDao<Aviso> fm = df.getDao(this.session, Aviso.class);		
		return fm.getList( "select id_aviso,area,numero,titulo,texto,validade,ativo,complemento,emissao from avisos where ativo = true" );
	}	

	
	
}

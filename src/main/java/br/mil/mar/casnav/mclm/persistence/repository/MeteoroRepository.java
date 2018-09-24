package br.mil.mar.casnav.mclm.persistence.repository;

import java.util.List;

import br.mil.mar.casnav.mclm.persistence.entity.Meteoro;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.exceptions.InsertException;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.infra.DaoFactory;
import br.mil.mar.casnav.mclm.persistence.infra.IDao;

public class MeteoroRepository extends BasicRepository  {

	public MeteoroRepository() throws DatabaseConnectException {
		super();
	}
	
	
	public Meteoro insertMeteoro(Meteoro met) throws InsertException {
		DaoFactory<Meteoro> df = new DaoFactory<Meteoro>();
		IDao<Meteoro> fm = df.getDao(this.session, Meteoro.class);
		
		try {
			fm.insertDO(met);
			commit();
		} catch (InsertException e) {
			//e.printStackTrace();
			rollBack();
			closeSession();
			throw e;
		}
		closeSession();
		return met;
	}	
	
	public Meteoro getActiveMeteoro() throws Exception {
		DaoFactory<Meteoro> df = new DaoFactory<Meteoro>();
		IDao<Meteoro> fm = df.getDao(this.session, Meteoro.class);		
		
		List<Meteoro> meteoros = fm.getList( "select * from meteoro where ativo = true limit 1" );
		if ( meteoros.size() > 0 ) {
			return meteoros.get(0);
		}			

		throw new NotFoundException("");
	}	
	
}

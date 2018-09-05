package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.entity.Meteoro;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.repository.MeteoroRepository;

public class MeteoroService {
	private MeteoroRepository repo;
	
	public MeteoroService() throws DatabaseConnectException  {
		this.repo = new MeteoroRepository();
	}
	
	
	public void generate() {
		
	}

	public Meteoro getActiveMeteoro() throws Exception {
		return repo.getActiveMeteoro();
	}
	
	
    public String getActiveMeteoroAsJson() throws Exception {
        String sql = "SELECT row_to_json( fc )::text As meteoro FROM ( select * from meteoro where ativo = true limit 1 ) as fc";
    	
    	String result = "";

    	Configurator cfg = Configurator.getInstance();
		String connectionString = "jdbc:postgresql://" + cfg.getDatabaseAddr() +
				":" + cfg.getDatabasePort() + "/" + cfg.getDatabaseName();
		GenericService gs = new GenericService( connectionString, cfg.getUserName(), cfg.getPassword()  );
    	
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("meteoro");
		}    	
		return result;
    }	
	
}

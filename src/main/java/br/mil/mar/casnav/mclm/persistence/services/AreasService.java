package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;

public class AreasService {


    private String mountSql( String parameters, String sourceView ) {
        String sql = "SELECT cast (row_to_json( fc ) as text) As featurecollection from (" +
            "SELECT 'FeatureCollection' As type, array_to_json( array_agg(t) ) as features FROM " +
            "(select  row_to_json((SELECT l FROM (SELECT "+parameters+") As l)) As properties, 'Feature' As type, cast(ST_AsGeoJSON(geom) as json) " +
            "as geometry from "+sourceView+") as t ) as fc";
        return sql;    
    }	
	
    
    
    public String getAreasAvisoMauTempo() throws Exception {
    	Configurator cfg = Configurator.getInstance();
    	String sql = mountSql("id,nome", "areas_maritimas_previsao_tempo");
    	String result = "";
    	
		String connectionString = "jdbc:postgresql://" + cfg.getDatabaseAddr() +
				":" + cfg.getDatabasePort() + "/" + cfg.getDatabaseName();
		GenericService gs = new GenericService( connectionString, cfg.getUserName(), cfg.getPassword()  );
		
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("featurecollection");
		}    	
    	
		return result;
    }
    
    public String getAreasAvisoRadio() throws Exception {
    	Configurator cfg = Configurator.getInstance();
    	String sql = mountSql("id,nome,name,ordem", "areas_maritimas_aviso_radio");
    	String result = "";
    	
		String connectionString = "jdbc:postgresql://" + cfg.getDatabaseAddr() +
				":" + cfg.getDatabasePort() + "/" + cfg.getDatabaseName();
		GenericService gs = new GenericService( connectionString, cfg.getUserName(), cfg.getPassword()  );
		
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		
		if ( utes.size() > 0 ) {
			UserTableEntity ute = utes.get(0);
			result = ute.getData("featurecollection");
		}    	
    	
		return result;
    }
	
}

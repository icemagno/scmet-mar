package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;
import br.mil.mar.casnav.mclm.persistence.entity.Aviso;
import br.mil.mar.casnav.mclm.persistence.entity.Meteoro;
import br.mil.mar.casnav.mclm.persistence.exceptions.DatabaseConnectException;
import br.mil.mar.casnav.mclm.persistence.repository.MeteoroRepository;

public class MeteoroService {
	private MeteoroRepository repo;
	
	public MeteoroService() throws DatabaseConnectException  {
		this.repo = new MeteoroRepository();
	}
	
	public void generate() throws Exception {
		Meteoro met = getActiveMeteoro();
		
		System.out.println( met.getTexto() );
		
		System.out.println("Parte Um : ");
		for ( Aviso aviso : met.getParteUm() ) {
			System.out.println( "  > " + aviso.getTitulo() );
		}		
		
	}

	public Meteoro getActiveMeteoro() throws Exception {
		return repo.getActiveMeteoro();
	}
	
	public Meteoro createNewMeteoro( String texto ) throws Exception {
		Meteoro met = new Meteoro( texto );
		return repo.insertMeteoro(met);
	}
	
    public String getActiveMeteoroAsJson() throws Exception {
    	
    	try {
    		@SuppressWarnings("unused")
			Meteoro met = getActiveMeteoro();
    	} catch ( Exception e ) {
    		createNewMeteoro("METEOROMARINHA REFERENTE ANALISE DE XXXX HMG - XX/XX/XXXX");
    	}
    	
        String sql = "select row_to_json(meteoromarinha) as meteoro " + 
        		"from( " + 
        		"  select met.id_meteoro, met.arquivo, met.ativo, met.texto, " + 
        		"  (select json_agg(avisos) " + 
        		"  from ( " + 
        		"    select numero,titulo,validade,texto,complemento,emissao from avisos where ativo = true order by numero" + 
        		"  ) avisos " + 
        		") as parte1 " + 
        		"from meteoro as met where met.ativo = true ) meteoromarinha";
    	
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

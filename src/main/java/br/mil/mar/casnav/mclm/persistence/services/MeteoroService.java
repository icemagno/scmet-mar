package br.mil.mar.casnav.mclm.persistence.services;

import java.util.List;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.PDFCreator;
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
	
	public Meteoro getActiveMeteoro() throws Exception {
		return repo.getActiveMeteoro();
	}
	
	public Meteoro createNewMeteoro( String texto ) throws Exception {
		Meteoro met = new Meteoro( texto );
		met.setRascunho( false );
		met.setAtivo( true );
		met.setAa(" ");
		met.setAb(" ");
		met.setAc(" ");
		met.setAd(" ");
		met.setAe(" ");
		met.setAf(" ");
		met.setAg(" ");
		met.setAh(" ");
		met.setAso(" ");
		met.setAno(" ");
		met.setE25e30(" ");
		met.setN25(" ");
		met.setS30l30(" ");
		met.setS30o30(" ");
		met.setDataAnaliseP2("[EDITE]");
		met.setTextoAnaliseP2("[EDITE]");
		met.setValidadePrevisaoP3("[EDITE]");
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
        		"  select met.*, " + 
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

	public void addUpdateP3(String area, String texto) throws Exception {
		String sql = "update meteoro set " + area + " = '" + texto +  "' where ativo = true";

    	Configurator cfg = Configurator.getInstance();
		String connectionString = "jdbc:postgresql://" + cfg.getDatabaseAddr() +
				":" + cfg.getDatabasePort() + "/" + cfg.getDatabaseName();
		GenericService gs = new GenericService( connectionString, cfg.getUserName(), cfg.getPassword()  );
		
		gs.execute( sql );		
		
	}

	public String exportToPDF() throws Exception {
		PDFCreator pdf = new PDFCreator();
		Meteoro met = getActiveMeteoro();
		AvisoService as = new AvisoService();
		List<Aviso> avisos = as.getList();
		return pdf.gerarPDF( met, avisos );
	}

	public void updateMeteoro(String meteoroTexto, String dataAnaliseP2, String validadePrevisaoP3, String textoAnaliseP2 ) throws Exception {
		String sql = "update meteoro set texto = '" + meteoroTexto +  "', texto_analise_p2 = '"+textoAnaliseP2+"',  data_analise_p2 = '"+dataAnaliseP2+"', validade_previsao_p3 = '"+validadePrevisaoP3+"' where ativo = true";

    	Configurator cfg = Configurator.getInstance();
		String connectionString = "jdbc:postgresql://" + cfg.getDatabaseAddr() +
				":" + cfg.getDatabasePort() + "/" + cfg.getDatabaseName();
		GenericService gs = new GenericService( connectionString, cfg.getUserName(), cfg.getPassword()  );
		
		gs.execute( sql );		
		
	}

	public void novoMeteoro() throws Exception {
		String pdf = exportToPDF();
		Meteoro met = getActiveMeteoro();
		
		String sql = "update meteoro set ativo = false, arquivo = '"+pdf+"' where ativo = true";

    	Configurator cfg = Configurator.getInstance();
		String connectionString = "jdbc:postgresql://" + cfg.getDatabaseAddr() +
				":" + cfg.getDatabasePort() + "/" + cfg.getDatabaseName();
		GenericService gs = new GenericService( connectionString, cfg.getUserName(), cfg.getPassword()  );
		
		gs.execute( sql );			
		
		
		createNewMeteoro( "[EDITE]" ); 
		
	}	
	
    
}

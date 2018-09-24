package br.mil.mar.casnav.mclm.persistence.services;

import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.rometools.rome.feed.synd.SyndContent;
import com.rometools.rome.feed.synd.SyndContentImpl;
import com.rometools.rome.feed.synd.SyndEntry;
import com.rometools.rome.feed.synd.SyndEntryImpl;
import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.feed.synd.SyndFeedImpl;
import com.rometools.rome.io.SyndFeedOutput;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.UserTableEntity;

public class AvisoService {

	/*
    private String mountSql( String parameters, String sourceView ) {
        String sql = "SELECT cast (row_to_json( fc ) as text) As featurecollection from (" +
            "SELECT 'FeatureCollection' As type, array_to_json( array_agg(t) ) as features FROM " +
            "(select  row_to_json((SELECT l FROM (SELECT "+parameters+") As l)) As properties, 'Feature' As type, cast(ST_AsGeoJSON(geom) as json) " +
            "as geometry from "+sourceView+") as t ) as fc";
        return sql;    
    }
    */	
	
	
	
    public String getAvisosMauTempoVigentes() throws Exception {
        String sql = "SELECT cast (row_to_json( fc ) as text) As featurecollection from (" +
                "SELECT 'FeatureCollection' As type, array_to_json( array_agg(t) ) as features FROM " +
                "(select  row_to_json((SELECT l FROM (SELECT area,numero,emissao,complemento,titulo,texto,validade,ativo,id_aviso) As l)) As properties, 'Feature' As type, cast(ST_AsGeoJSON(geom) as json) " +
                "as geometry from avisos as avv where avv.ativo = true) as t ) as fc";
    	
    	String result = "";

    	Configurator cfg = Configurator.getInstance();
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

    private String generateData( UserTableEntity ute ) {
    	String result = "";
		String area = ute.getData("area");
		String numero = ute.getData("numero");
		//String titulo = ute.getData("titulo");
		String texto = ute.getData("texto");
		String validade = ute.getData("validade");
		String complemento = ute.getData("complemento");
		String emissao = ute.getData("emissao");

		result = result + "ÁREA " + area + "<br>";
		result = result + "<br>";
		result = result + "AVISO NR " + numero + "<br>";
		//result = result + titulo + "<br>";
		result = result + emissao + "<br>";
		result = result + texto + "<br>";
		result = result + validade + "<br>";
		if( !complemento.equals("") ) {
			result = result + complemento + "<br>";
		}
		return result;
    }
    
    public String getAvisosMauTempoVigentesRSS() throws Exception {
    	String sql = "select area,numero,titulo,texto,emissao,complemento,validade,ativo,id_aviso from avisos where ativo = true";

    	Configurator cfg = Configurator.getInstance();
		String connectionString = "jdbc:postgresql://" + cfg.getDatabaseAddr() +
				":" + cfg.getDatabasePort() + "/" + cfg.getDatabaseName();
		GenericService gs = new GenericService( connectionString, cfg.getUserName(), cfg.getPassword()  );
    	

		
        SyndFeed feed = new SyndFeedImpl();
        feed.setFeedType("rss_2.0");

        feed.setTitle("DIRETORIA DE HIDROGRAFIA E NAVEGAÇÃO | CENTRO DE HIDROGRAFIA DA MARINHA");
        feed.setLink("https://www.mar.mil.br/dhn/chm/meteo/");
        feed.setDescription("Serviço Meteorológico Marinho");

		List<SyndEntry> entries = new ArrayList<SyndEntry>();
        SyndEntry entry;
        SyndContent description;
		
    	
		List<UserTableEntity> utes = gs.genericFetchList( sql );
		if ( utes.size() > 0 ) {
			for ( UserTableEntity ute : utes ) {
				String htmlData = generateData( ute );
				String titulo = ute.getData("titulo");
				
                entry = new SyndEntryImpl();
                entry.setTitle( titulo);
                //entry.setLink("http://wiki.java.net/bin/view/Javawsxml/Rome03");
                entry.setPublishedDate(  Calendar.getInstance().getTime() );
                description = new SyndContentImpl();
                description.setType("text/html");
                description.setValue( htmlData );
                entry.setDescription(description);
                entries.add(entry);			
			}
		}
		
		feed.setEntries(entries);
		
        Writer writer = new StringWriter();
        SyndFeedOutput output = new SyndFeedOutput();
        output.output(feed,writer);
        
        String res = writer.toString();
        writer.close();
				
		return res;
    }

    
    public void insertAviso(String id, String numero, String titulo, String texto, String validade, String complemento, String geometria, String emissao ) throws Exception {
    	// Geometria:
    	// {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon",
    		// "coordinates":[[[-36.33135797475781,-18.2353515625],[-34.74932672475781,-21.4873046875],[-27.014951724757807,-21.2236328125],
    		// 		[-27.454404849757807,-15.3349609375],[-36.33135797475781,-18.2353515625]]]},"properties":null}]}

    	JSONObject featureCollection = new JSONObject( geometria );
    	JSONArray features = featureCollection.getJSONArray("features");
    	JSONObject areaAviso = features.getJSONObject(0);
    	
    	JSONObject properties = new JSONObject();
    	
    	properties.put("id", id);
    	properties.put("numero", numero);
    	properties.put("titulo", titulo);
    	properties.put("texto", texto);
    	properties.put("validade", validade);
    	properties.put("complemento", complemento);
    	properties.put("emissao", emissao);
    	areaAviso.put("properties", properties);
    	
    	JSONObject coordinates = areaAviso.getJSONObject("geometry"); 
    	// "crs":{"type":"name","properties":{"name":"EPSG:4326"}}
    	
    	JSONObject crs = new JSONObject();
    	crs.put("type","name");
    	crs.put("properties", new JSONObject("{\"name\":\"EPSG:4326\"}") );
    	coordinates.put("crs", crs);
    	
    	String toPGGeometry = "ST_GeomFromGeoJSON('"+coordinates+"')";
    	String sql = "insert into avisos (emissao,complemento,area,numero,titulo,texto,validade,ativo,geom) values ('"+emissao+"','"+complemento+"','"+id+"','"+numero+"','"+titulo+"','"+texto+"','"+validade+"',true,"+toPGGeometry+")";

    	Configurator cfg = Configurator.getInstance();
		String connectionString = "jdbc:postgresql://" + cfg.getDatabaseAddr() +
				":" + cfg.getDatabasePort() + "/" + cfg.getDatabaseName();
		GenericService gs = new GenericService( connectionString, cfg.getUserName(), cfg.getPassword()  );
		
		gs.execute( sql );
    	
    }

	public void updateAviso(int avisoId_I, String id, String numero, String titulo, String texto, String validade, String complemento, String geometria, String emissao, String ativo) throws Exception {
    	
		if ( ativo == null || ( !ativo.equals("true") ) ) ativo = "false";
		
		String sql = "update avisos set emissao = '" + emissao+  "', "
    			+ "complemento = '" + complemento + "', "
    			+ "area = '" + id + "', "
    			+ "numero = '" + numero + "', "
    			+ "texto = '" + texto + "', "
    			+ "validade = '" + validade + "', "
    			+ "ativo = " + ativo +  " where id_aviso = " + avisoId_I;

    	Configurator cfg = Configurator.getInstance();
		String connectionString = "jdbc:postgresql://" + cfg.getDatabaseAddr() +
				":" + cfg.getDatabasePort() + "/" + cfg.getDatabaseName();
		GenericService gs = new GenericService( connectionString, cfg.getUserName(), cfg.getPassword()  );
		
		gs.execute( sql );
		
	}
	
}

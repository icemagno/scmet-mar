package br.mil.mar.casnav.mclm;

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.commons.io.FileUtils;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.PathFinder;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.infra.ConnFactory;
import br.mil.mar.casnav.mclm.persistence.services.ConfigService;


@WebListener
public class Startup implements ServletContextListener {
	//private ScheduledExecutorService scheduler;
	
	@Override
    public void contextInitialized(ServletContextEvent event) {
    	ServletContext context = event.getServletContext();
    	String path = context.getRealPath("/");
    	System.setProperty("rootPath", path );

    	try {
       
    		
    		String imagesPath = PathFinder.getInstance().getPath() + "/tempmaps/";
    		FileUtils.deleteDirectory( new File(imagesPath) );
    		
    		//ScheduledExecutorService  scheduler = Executors.newSingleThreadScheduledExecutor();
    		//Cron cron = new Cron();
    		//scheduler.scheduleAtFixedRate( cron , 0, 1, TimeUnit.MINUTES);
    		
    		
    		String configFile = path + "WEB-INF/classes/config.xml";
			Configurator config = Configurator.getInstance( configFile );
			config.loadMainConfig();
			
			String user = config.getUserName();
			String passwd = config.getPassword();
			String database = config.getDatabaseName();
			String port = config.getDatabasePort();
			String databaseAddr = config.getDatabaseAddr();
			
    		ConnFactory.setCredentials(user, passwd, database, port, databaseAddr );
    		
    		try {
	    		ConfigService cs = new ConfigService();
				Config cfg = cs.getConfig();  
				Configurator.getInstance().updateConfiguration( cfg );
    		} catch ( NotFoundException e ) {
    			System.out.println("Nenhum registro encontrado na tabela de configuração.");
    		}
    		

    		
		} catch (Exception e) { 
			e.printStackTrace(); 
		}
        
        
	}
	
	@Override
    public void contextDestroyed(ServletContextEvent event) {
		System.out.println("Desligando SCMET.");
		/*
		try {
			scheduler.shutdownNow();
		} catch ( Exception e ) {
			
		}
		*/
    }
}

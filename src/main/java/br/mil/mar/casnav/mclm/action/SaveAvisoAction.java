package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.ConfigService;

@Action(value="saveAviso", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class SaveAvisoAction extends BasicActionClass {
	
	public String execute(){
		
		try { 
			
			String result = "{ \"success\": true, \"msg\": \"Operação efetuada com sucesso.\" }";
			
			try {
				HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
				boolean useProxy = Boolean.valueOf( request.getParameter("useProxy") );
				boolean externalLayersToLocalServer = Boolean.valueOf( request.getParameter("externalLayersToLocalServer") );
				String nonProxyHosts = request.getParameter("nonProxyHosts");
				String externalWorkspaceName = request.getParameter("externalWorkspaceName");

				String mapBackgroudColor = request.getParameter("mapBackgroudColor");
				boolean scanDictAtStartup = Boolean.valueOf( request.getParameter("scanDictAtStartup") );
				/*
				Config config = new Config(idConfig, geoserverUrl, baseLayer, useProxy, externalLayersToLocalServer, externalWorkspaceName, 
							proxyHost, nonProxyHosts, proxyUser, proxyPassword, proxyPort, geoserverUser, 
							geoserverPassword, mapZoom, queryFactorRadius, mapCenter, shapeFileTargetPath, 
							routingServer, routingUser, routingPassword, routingPort, routingDatabase,	
							apoloServer, distanceFromRoute, symbolServerURL, servicosCptecUrl, mapBackgroudColor,scanDictAtStartup);	
				*/
				
				ConfigService cs = new ConfigService();
				//cs.updateConfig(config);
				
			} catch ( Exception e ) {
				result = "{ \"error\": true, \"msg\": \"" + e.getMessage() + ".\" }";
				e.printStackTrace();
			}
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	
}

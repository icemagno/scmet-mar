package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.MeteoroService;

@Action(value="updateMeteoro", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class UpdateMeteoroAction extends BasicActionClass {
	
	public String execute(){
		
		try { 
			
			String result = "{ \"success\": true, \"msg\": \"Operação efetuada com sucesso.\" }";
			
			try {
				HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
				String meteoroTexto = request.getParameter("meteoroTexto");
				String dataAnaliseP2 = request.getParameter("dataAnaliseP2");
				String validadePrevisaoP3 = request.getParameter("validadePrevisaoP3");
				String textoAnaliseP2 = request.getParameter("textoAnaliseP2");
				
				

				MeteoroService ms = new MeteoroService();
				ms.updateMeteoro( meteoroTexto, dataAnaliseP2, validadePrevisaoP3, textoAnaliseP2 );
				
				
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

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

@Action(value="saveP3", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) },
		interceptorRefs= { @InterceptorRef("seguranca")	 }
)   

@ParentPackage("default")
public class SaveP3Action extends BasicActionClass {
	
	public String execute(){
		
		try { 
			
			String result = "{ \"success\": true, \"msg\": \"Operação efetuada com sucesso.\" }";
			
			try {
				HttpServletRequest request = (HttpServletRequest)ActionContext.getContext().get(StrutsStatics.HTTP_REQUEST);
				
				String area = request.getParameter("area");
				String texto = request.getParameter("texto");

				MeteoroService meteoro = new MeteoroService();
				meteoro.addUpdateP3( area, texto );
				
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

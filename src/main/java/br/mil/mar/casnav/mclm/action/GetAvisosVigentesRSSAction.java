package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.AvisoService;



@Action(value="rss", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetAvisosVigentesRSSAction {
	
	public String execute(){

		try { 

			AvisoService as = new AvisoService();
			String resposta = as.getAvisosMauTempoVigentesRSS();
				
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.setContentType("application/xml");
			response.getWriter().write(resposta);  
		} catch (Exception ex) {
			//
		}
		return "ok";
	}

	
}

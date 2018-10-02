package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.InterceptorRef;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.AvisoService;

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
				
				String id = request.getParameter("id");
				String numero = request.getParameter("numero");
				String titulo = request.getParameter("titulo");
				String texto = request.getParameter("texto");
				String validade = request.getParameter("validade");
				String complemento = request.getParameter("complemento");
				String geometria = request.getParameter("geometria");
				String emissao = request.getParameter("emissao");
				String avisoId = request.getParameter("avisoId");
				String ativo = request.getParameter("ativo");

				System.out.println( avisoId );
				AvisoService as = new AvisoService();

				if ( !avisoId.trim().equals("") ) {
					int avisoId_I = Integer.valueOf( avisoId );
					System.out.println("Atualizando.... ");
					as.updateAviso(avisoId_I, id, numero, titulo, texto, validade, complemento, geometria,emissao, ativo);
				}
				
				try {
					@SuppressWarnings("unused")
					int avisoId_I = Integer.valueOf( avisoId );
				} catch ( Exception e ) {
					System.out.println("Inserindo.... ");
					as.insertAviso(id, numero, titulo, texto, validade, complemento, geometria,emissao);
				}
				
				
				
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
